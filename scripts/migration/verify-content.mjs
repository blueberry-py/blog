#!/usr/bin/env node
/**
 * Content and URL inventory for the Hugo -> Astro migration.
 *
 * The inventory is the contract between the migration and the site that
 * replaces it: every tracked Markdown file under `content/post` and
 * `content/about` is recorded with the route Hugo served it at, a hash of its
 * Markdown body, and the local assets it references. `verify-content.mjs`
 * re-checks that contract, so a lost post, a rewritten body or a missing
 * image fails loudly instead of silently disappearing from the new site.
 *
 * Usage:
 *   node scripts/migration/verify-content.mjs            verify against the manifest
 *   node scripts/migration/verify-content.mjs --generate  rewrite the manifest
 */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(
  fileURLToPath(new URL('../..', import.meta.url)),
);
const MANIFEST_PATH = 'scripts/migration/legacy-routes.json';

const POST_ROOT = 'content/post';
const PAGE_ROOT = 'content/about';

/** Front matter delimiters understood by Hugo and by Astro. */
const DELIMITERS = ['+++', '---'];

/**
 * Split a Markdown file into its front matter and its body.
 *
 * The body is returned byte-for-byte: the migration must not rewrite article
 * text, so hashing and verification work on the untouched remainder.
 */
export function splitFrontMatter(raw) {
  const text = raw.replace(/^\uFEFF/, '');
  const lines = text.split('\n');
  const opening = lines[0].trim();
  const delimiter = DELIMITERS.includes(opening) ? opening : null;

  if (!delimiter) {
    return { frontMatter: '', body: text, delimiter: null };
  }

  let closing = -1;
  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index].trim() === delimiter) {
      closing = index;
      break;
    }
  }

  if (closing === -1) {
    return { frontMatter: '', body: text, delimiter: null, unterminated: true };
  }

  return {
    frontMatter: lines
      .slice(1, closing)
      .map((line) => line.replace(/\r$/, ''))
      .join('\n'),
    body: lines.slice(closing + 1).join('\n'),
    delimiter,
  };
}

/**
 * Read the scalar fields of a front matter block without pulling in a TOML or
 * YAML parser: this module has to run on a bare checkout, before the project
 * dependencies exist.
 */
export function parseFrontMatterFields(frontMatter) {
  const fields = {};

  for (const rawLine of frontMatter.split('\n')) {
    const line = rawLine.replace(/\r$/, '');
    const match = line.match(/^\s*([A-Za-z0-9_-]+)\s*[:=]\s*(.+?)\s*$/);
    if (!match) continue;

    const key = match[1];
    let value = match[2];

    if (
      value.length > 1 &&
      ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'")))
    ) {
      value = value.slice(1, -1);
    }

    fields[key] = value;
  }

  return fields;
}

/** The path of a content file relative to `content/`, with the extension and the bundle index removed. */
function contentPath(sourcePath) {
  let slug = sourcePath.replace(/^content\//, '').replace(/\.mdx?$/, '');

  if (slug.endsWith('/index')) return slug.slice(0, -'/index'.length);

  return slug;
}

/** The path of a post relative to `content/post/`, with the extension and the bundle index removed. */
function postPath(sourcePath) {
  let slug = sourcePath.replace(/^content\/post\//, '').replace(/\.mdx?$/, '');

  if (slug.endsWith('/index')) return slug.slice(0, -'/index'.length);

  return slug;
}

/** The slug Hugo served a post at: explicit front matter first, the path second. */
export function deriveSlug(sourcePath, fields = {}) {
  const explicit = typeof fields.slug === 'string' ? fields.slug.trim() : '';
  if (explicit) return explicit;

  return sourcePath.startsWith(`${POST_ROOT}/`)
    ? postPath(sourcePath)
    : contentPath(sourcePath);
}

/**
 * The public route Hugo served a content file at. Posts are routed by their
 * slug; pages are routed by their path, because that is what Hugo does.
 */
export function deriveRoute(sourcePath, slug) {
  if (sourcePath.startsWith(`${POST_ROOT}/`)) {
    return `/post/${slug}/`;
  }

  return `/${contentPath(sourcePath)}/`;
}

/** A link target is a local asset only when it points at a file in this repository. */
function isLocalTarget(target) {
  if (!target) return false;
  if (target.startsWith('#')) return false;
  if (target.startsWith('//')) return false;
  if (target.startsWith('/')) return false;
  if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(target)) return false;

  return true;
}

/**
 * Collect the repository-relative paths of the local assets a content file
 * references, in document order, followed by the ones named by its front
 * matter.
 *
 * Only images count as assets: they are what a Hugo page bundle carries, and
 * they are what the built site has to resolve. A Markdown link to another
 * page is a route reference, not an asset, and a bare hostname such as
 * `www.jd.com` is neither.
 */
export function collectLocalAssetRefs(sourcePath, fields = {}, body = '') {
  const directory = path.posix.dirname(sourcePath);
  const refs = [];
  const seen = new Set();

  const add = (target) => {
    if (!isLocalTarget(target)) return;

    const resolved = path.posix.normalize(path.posix.join(directory, target));
    if (seen.has(resolved)) return;

    seen.add(resolved);
    refs.push(resolved);
  };

  const imagePattern = /!\[[^\]]*\]\(\s*(<[^>]*>|[^)\s]+)/g;
  for (const match of body.matchAll(imagePattern)) {
    add(match[1].replace(/^<|>$/g, ''));
  }

  if (typeof fields.image === 'string') add(fields.image);
  for (const image of Array.isArray(fields.images) ? fields.images : []) {
    add(image);
  }

  return refs;
}

/**
 * A stable hash of a Markdown body.
 *
 * The line endings are normalized first: git stores the blobs with LF endings
 * and checks them out with CRLF on Windows, so the hash has to describe the
 * article text rather than the checkout of the machine that generated it.
 */
export function hashBody(body) {
  const normalized = body.replace(/\r\n/g, '\n');

  return `sha256:${createHash('sha256').update(normalized, 'utf8').digest('hex')}`;
}

/** Build the inventory entry of a single content file. */
export function buildEntry(rootDir, sourcePath) {
  const raw = readFileSync(path.join(rootDir, sourcePath), 'utf8');
  const { frontMatter, body } = splitFrontMatter(raw);
  const fields = parseFrontMatterFields(frontMatter);
  const slug = deriveSlug(sourcePath, fields);

  return {
    source: sourcePath,
    collection: sourcePath.startsWith(`${POST_ROOT}/`) ? 'post' : 'page',
    slug,
    route: deriveRoute(sourcePath, slug),
    bodyHash: hashBody(body),
    assets: collectLocalAssetRefs(sourcePath, fields, body),
  };
}

/** Build a complete inventory from an explicit list of content files. */
export function buildManifest(rootDir, sourcePaths) {
  const entries = [...sourcePaths]
    .sort()
    .map((sourcePath) => buildEntry(rootDir, sourcePath));

  return { version: 1, entries };
}

/**
 * The Markdown files the migration owns: the tracked files under the post and
 * page roots. Untracked files belong to the user and are reconciled
 * separately, so they are deliberately not part of the inventory.
 */
export function listTrackedContentFiles(rootDir = REPO_ROOT) {
  const output = execFileSync('git', ['ls-files', '--', POST_ROOT, PAGE_ROOT], {
    cwd: rootDir,
    encoding: 'utf8',
  });

  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.endsWith('.md'));
}

/** Check a manifest against the content tree it describes. */
export function verifyManifest(manifest, rootDir) {
  const problems = [];
  const routes = new Map();

  for (const entry of manifest.entries) {
    const absolute = path.join(rootDir, entry.source);

    if (!existsSync(absolute)) {
      problems.push({
        code: 'missing-source',
        source: entry.source,
        detail: 'the tracked Markdown file no longer exists',
      });
      continue;
    }

    const raw = readFileSync(absolute, 'utf8');
    const { frontMatter, body } = splitFrontMatter(raw);
    const fields = parseFrontMatterFields(frontMatter);

    const currentHash = hashBody(body);
    if (currentHash !== entry.bodyHash) {
      problems.push({
        code: 'body-changed',
        source: entry.source,
        detail: `body hash ${entry.bodyHash} no longer matches ${currentHash}`,
      });
    }

    const route = deriveRoute(entry.source, deriveSlug(entry.source, fields));
    if (route !== entry.route) {
      problems.push({
        code: 'route-changed',
        source: entry.source,
        detail: `route ${entry.route} no longer matches ${route}`,
      });
    }

    const previous = routes.get(route);
    if (previous) {
      problems.push({
        code: 'duplicate-route',
        source: entry.source,
        detail: `route ${route} is already served by ${previous}`,
      });
    } else {
      routes.set(route, entry.source);
    }

    for (const asset of entry.assets) {
      if (!existsSync(path.join(rootDir, asset))) {
        problems.push({
          code: 'missing-asset',
          source: entry.source,
          detail: `referenced asset ${asset} does not exist`,
        });
      }
    }
  }

  return { ok: problems.length === 0, problems };
}

/** Read the committed manifest. */
export function readManifest(rootDir = REPO_ROOT) {
  return JSON.parse(readFileSync(path.join(rootDir, MANIFEST_PATH), 'utf8'));
}

function main(argv) {
  const rootDir = REPO_ROOT;

  if (argv.includes('--generate')) {
    const sourcePaths = listTrackedContentFiles(rootDir);
    const manifest = buildManifest(rootDir, sourcePaths);
    writeFileSync(
      path.join(rootDir, MANIFEST_PATH),
      `${JSON.stringify(manifest, null, 2)}\n`,
      'utf8',
    );
    console.log(`wrote ${MANIFEST_PATH}: ${manifest.entries.length} entries`);
    return 0;
  }

  const manifest = readManifest(rootDir);
  const result = verifyManifest(manifest, rootDir);

  if (result.ok) {
    console.log(
      `content inventory OK: ${manifest.entries.length} entries verified`,
    );
    return 0;
  }

  for (const problem of result.problems) {
    console.error(`${problem.code}: ${problem.source}: ${problem.detail}`);
  }
  console.error(`${result.problems.length} content problem(s) found`);

  return 1;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  process.exit(main(process.argv.slice(2)));
}
