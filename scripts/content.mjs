#!/usr/bin/env node
/**
 * The inventory of the content tree and the helpers of the built output.
 *
 * Every article and every page of the site is a Markdown file under
 * `content/post` and `content/about`. This module reads that tree into an
 * inventory: the route each file is served at and the images it uses. The
 * inventory is computed from the working tree, the way the build reads it, so
 * the checks of the built site read the corpus of the build they check.
 *
 * The rest of the module reads an output: a page, a feed, a sitemap. A check
 * joins the two, which is what `verifyBuiltOutput` does: every article of the
 * inventory has a page, every reference of every document resolves to a file
 * of the output, and every route the old site served is still answered.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

import { legacyFeedRoutes } from './legacy-feed-routes.mjs';
import { readLegacyRedirects } from './legacy-redirects.mjs';

const POST_ROOT = 'content/post';
const PAGE_ROOT = 'content/about';

/** The directories of the content tree, relative to the root of the repository. */
const CONTENT_DIRECTORIES = [POST_ROOT, PAGE_ROOT];

/** The directory the built site is written to. */
const OUTPUT_DIRECTORY = 'dist';

/** Front matter delimiters understood by Hugo and by Astro. */
const DELIMITERS = ['+++', '---'];

/**
 * Split a Markdown file into its front matter and its body.
 *
 * The body is returned byte-for-byte: the site publishes the words of an
 * article as they were written, so the checks that read a body read the
 * untouched remainder.
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

/** The slug a post is served at: explicit front matter first, the path second. */
export function deriveSlug(sourcePath, fields = {}) {
  const explicit = typeof fields.slug === 'string' ? fields.slug.trim() : '';
  if (explicit) return explicit;

  return sourcePath.startsWith(`${POST_ROOT}/`)
    ? postPath(sourcePath)
    : contentPath(sourcePath);
}

/**
 * The public route a content file is served at. Posts are routed by their
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
 * Only images count as assets: they are what a page bundle carries, and they
 * are what the built site has to resolve. A Markdown link to another page is a
 * route reference, not an asset, and a bare hostname such as `www.jd.com` is
 * neither.
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

/** The inventory entry of a content file. */
function buildEntry(sourcePath, fields, body) {
  const slug = deriveSlug(sourcePath, fields);

  return {
    source: sourcePath,
    collection: sourcePath.startsWith(`${POST_ROOT}/`) ? 'post' : 'page',
    slug,
    route: deriveRoute(sourcePath, slug),
    assets: collectLocalAssetRefs(sourcePath, fields, body),
  };
}

/** The Markdown files of the content tree, sorted by their path. */
function contentSources(rootDir) {
  const found = [];

  const walk = (directory) => {
    const absolute = path.join(rootDir, directory);

    if (!existsSync(absolute)) return;

    for (const entry of readdirSync(absolute, { withFileTypes: true })) {
      const sourcePath = `${directory}/${entry.name}`;

      if (entry.isDirectory()) {
        walk(sourcePath);
        continue;
      }

      if (/\.mdx?$/.test(entry.name)) found.push(sourcePath);
    }
  };

  for (const directory of CONTENT_DIRECTORIES) {
    walk(directory);
  }

  return found.sort();
}

/**
 * The inventory of the content tree: every article and every page of the
 * build, with the route it is served at and the images it uses.
 *
 * A draft is a file the build leaves out, so it is left out here as well: the
 * inventory describes the site the build publishes, not the files on disk.
 */
export function contentManifest(rootDir) {
  const entries = [];

  for (const sourcePath of contentSources(rootDir)) {
    const raw = readFileSync(path.join(rootDir, sourcePath), 'utf8');
    const { frontMatter, body } = splitFrontMatter(raw);
    const fields = parseFrontMatterFields(frontMatter);

    if (fields.draft === 'true') continue;

    entries.push(buildEntry(sourcePath, fields, body));
  }

  return { version: 1, entries };
}

/**
 * The entities of XML, decoded.
 *
 * A feed holds the body of an article as HTML, escaped into the text of an
 * element, so the references of that body are only readable once the entities
 * are decoded. The ampersand is decoded last, so an ampersand that was
 * escaped twice stays escaped once.
 */
export function decodeXmlEntities(text) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&amp;/g, '&');
}

/**
 * The absolute URLs a document names in the text of an element.
 *
 * A feed names the route of an item in the text of its `link` and `guid`
 * elements, a sitemap names the routes it serves in the text of its `loc`
 * elements. The links of an article body are left out: they may name a page of
 * another site, and the audit is about the routes of this site.
 */
export function collectAbsoluteReferences(text) {
  const found = new Set();

  for (const match of text.matchAll(
    /<(?:loc|link|guid)\b[^>]*>([^<]+)<\/(?:loc|link|guid)>/g,
  )) {
    const value = match[1].trim();

    if (/^https?:\/\//.test(value)) found.add(value);
  }

  return [...found];
}

/**
 * The local references of a built page.
 *
 * A reference is local when it starts at the root of the site: the absolute
 * URLs of the network, the fragments of the page and the protocol relative
 * URLs are not.
 */
export function collectLocalReferences(html) {
  const found = new Set();

  for (const match of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
    const value = match[1];

    if (!value.startsWith('/') || value.startsWith('//')) continue;

    found.add(value);
  }

  return [...found];
}

/**
 * The path of a local reference inside the site, without the base path.
 *
 * The base path is the directory the site is served from: `/` on the root
 * hosts, `/blog/` on the project site of GitHub Pages. A reference that does
 * not start with it points outside of the site.
 */
export function localPath(reference, base) {
  if (base === '/') return reference;

  const prefix = base.endsWith('/') ? base : `${base}/`;

  if (reference === prefix.slice(0, -1)) return '/';
  if (!reference.startsWith(prefix)) return null;

  return `/${reference.slice(prefix.length)}`;
}

/** The base path without its trailing slash, so it can be prefixed to a path. */
function basePrefix(base) {
  return base === '/' ? '' : base.replace(/\/+$/, '');
}

/**
 * The file of the output that serves a local path, or null when it is not there.
 *
 * A path that names a directory is served by the index of that directory, a
 * path that names a file is served by that file.
 */
export function outputFileFor(outputDir, localPath) {
  const clean = localPath.split('#')[0].split('?')[0];
  const relative = clean.replace(/^\/+/, '').replace(/\/+$/, '');

  if (relative.split('/').includes('..')) return null;

  if (relative) {
    const direct = path.join(outputDir, relative);
    if (existsSync(direct) && statSync(direct).isFile()) return direct;
  }

  const index = path.join(outputDir, relative, 'index.html');

  return existsSync(index) ? index : null;
}

/** The pages of the built output, with the route each of them is served at. */
export function listBuiltPages(outputDir) {
  const pages = [];

  const walk = (directory, prefix) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const full = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        walk(full, `${prefix}${entry.name}/`);
        continue;
      }

      if (entry.name === 'index.html')
        pages.push({ route: prefix, file: full });
    }
  };

  walk(outputDir, '/');

  return pages;
}

/**
 * Every document of the built output: the pages and the feeds.
 *
 * A feed and a sitemap are documents of the site as well: they name the routes
 * of the site and hold the references of the articles, so they are audited
 * like the pages are.
 */
export function listBuiltDocuments(outputDir) {
  const documents = [];

  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const full = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        walk(full);
        continue;
      }

      if (entry.name.endsWith('.html') || entry.name.endsWith('.xml')) {
        documents.push({
          file: full,
          kind: entry.name.endsWith('.xml') ? 'xml' : 'html',
        });
      }
    }
  };

  walk(outputDir);

  return documents;
}

/**
 * The canonical URL of the built site.
 *
 * The URL of the site is the URL of its home page, and its path is the
 * directory the site is served from.
 */
export function detectSiteUrl(outputDir) {
  const home = path.join(outputDir, 'index.html');
  if (!existsSync(home)) return null;

  const match = /<link rel="canonical" href="([^"]+)"/.exec(
    readFileSync(home, 'utf8'),
  );

  return match ? match[1] : null;
}

/**
 * The base path the site was built with, read from the canonical URL of its home page.
 *
 * The canonical URL of the home page is the URL of the site, so its path is
 * the directory the site is served from.
 */
export function detectBase(outputDir) {
  const canonical = detectSiteUrl(outputDir);
  if (!canonical) return '/';

  try {
    return new URL(canonical).pathname;
  } catch {
    return '/';
  }
}

/**
 * The path of a URL of the site, or null when the URL names another site.
 *
 * The path of a route of the site carries the base path of the build, so it is
 * the reference the pages of the output are checked with.
 */
function routeOfSite(reference, origin) {
  if (!origin) return null;

  let url;
  try {
    url = new URL(reference);
  } catch {
    return null;
  }

  if (url.origin !== origin) return null;

  try {
    return decodeURIComponent(url.pathname);
  } catch {
    return url.pathname;
  }
}

/**
 * Check the built output of the site against the inventory.
 *
 * The inventory says which routes the articles are served at and which images
 * they use; the output says which files the site is made of. This check joins
 * the two: every route of the inventory has a page, every local reference of
 * every page and of every feed resolves to a file of the output, every image of
 * an article is rendered by the page of that article, and every route and feed
 * the old site served is still answered.
 */
export function verifyBuiltOutput(inventory, rootDir, options = {}) {
  const { base = '/', output = OUTPUT_DIRECTORY } = options;
  const outputDir = path.join(rootDir, output);
  const problems = [];

  if (!existsSync(outputDir)) {
    problems.push({
      code: 'no-built-output',
      detail: `the site is not built: the directory ${output} does not exist`,
    });

    return {
      ok: false,
      problems,
      stats: { pages: 0, documents: 0, feeds: 0, base },
    };
  }

  const pages = listBuiltPages(outputDir);
  const documents = listBuiltDocuments(outputDir);
  const routes = new Map();
  const sources = new Map();

  const siteUrl = detectSiteUrl(outputDir);
  let siteOrigin = null;

  if (siteUrl) {
    try {
      siteOrigin = new URL(siteUrl).origin;
    } catch {
      siteOrigin = null;
    }
  }

  /**
   * Audit one reference of a document of the output.
   *
   * @param {string} reference The path of the reference, with its base path.
   * @param {string} name The name of the document, for the report.
   * @param {string} label The reference as it is written, for the report.
   */
  const auditReference = (reference, name, label = reference) => {
    const local = localPath(reference, base);

    if (local === null) {
      problems.push({
        code: 'link-outside-base',
        document: name,
        detail: `the reference ${label} points outside of the base path ${base}`,
      });
      return;
    }

    const prefix = basePrefix(base);

    if (prefix && local.startsWith(`${prefix}/`)) {
      problems.push({
        code: 'doubled-base',
        document: name,
        detail: `the reference ${label} uses the base path ${prefix} twice`,
      });
      return;
    }

    if (!outputFileFor(outputDir, local)) {
      problems.push({
        code: 'broken-link',
        document: name,
        detail: `the reference ${label} points at nothing`,
      });
    }
  };

  for (const page of pages) {
    if (routes.has(page.route)) {
      problems.push({
        code: 'duplicate-route',
        route: page.route,
        detail: `the route ${page.route} is built more than once`,
      });
    }

    routes.set(page.route, page.file);
  }

  for (const entry of inventory.entries) {
    const previous = sources.get(entry.route);

    if (previous) {
      problems.push({
        code: 'duplicate-route',
        route: entry.route,
        source: entry.source,
        detail: `the route ${entry.route} is claimed by ${previous} and by ${entry.source}`,
      });
    }

    sources.set(entry.route, entry.source);

    if (!routes.has(entry.route)) {
      problems.push({
        code: 'missing-page',
        route: entry.route,
        source: entry.source,
        detail: `no page was built for ${entry.route}`,
      });
    }
  }

  const posts = inventory.entries.filter(
    (entry) => entry.collection === 'post',
  ).length;

  // The routes of the old site are pages of the output as well, but they hold
  // no article: they send the reader to the route that holds the articles.
  const redirectRoutes = new Set(Object.keys(readLegacyRedirects(rootDir)));
  const builtPosts = pages.filter(
    (page) =>
      page.route.startsWith('/post/') && !redirectRoutes.has(page.route),
  ).length;

  if (posts !== builtPosts) {
    problems.push({
      code: 'post-count-mismatch',
      detail: `the content tree holds ${posts} articles, the output holds ${builtPosts}`,
    });
  }

  for (const route of redirectRoutes) {
    if (routes.has(route)) continue;

    problems.push({
      code: 'missing-alias',
      route,
      detail: `the old route ${route} is not served`,
    });
  }

  // The old site served a feed of its articles and of the terms of every
  // taxonomy. The feeds of the routes that name no term are the same in every
  // build of the site, so they are checked against the routes of the old site.
  for (const route of legacyFeedRoutes(rootDir)) {
    if (existsSync(path.join(outputDir, route.replace(/^\//, '')))) continue;

    problems.push({
      code: 'missing-feed',
      route,
      detail: `the feed of the old site is not served at ${route}`,
    });
  }

  // The feed of a term is served next to the page of the term, so every page
  // of a taxonomy has a feed of the articles it holds.
  for (const page of pages) {
    if (!/^\/(tags|categories)\/[^/]+\/$/.test(page.route)) continue;

    const route = `${page.route}index.xml`;

    if (existsSync(path.join(outputDir, route.replace(/^\//, '')))) continue;

    problems.push({
      code: 'missing-feed',
      route,
      detail: `the page of the term ${page.route} has no feed`,
    });
  }

  for (const document of documents) {
    const raw = readFileSync(document.file, 'utf8');
    const name = path
      .relative(rootDir, document.file)
      .split(path.sep)
      .join('/');
    const text = document.kind === 'xml' ? decodeXmlEntities(raw) : raw;

    for (const reference of collectLocalReferences(text)) {
      auditReference(reference, name);
    }

    if (document.kind !== 'xml') continue;

    for (const reference of collectAbsoluteReferences(text)) {
      const route = routeOfSite(reference, siteOrigin);

      if (route === null) continue;

      auditReference(route, name, reference);
    }
  }

  for (const entry of inventory.entries) {
    if (entry.assets.length === 0) continue;

    const page = routes.get(entry.route);
    if (!page) continue;

    const references = collectLocalReferences(readFileSync(page, 'utf8'));

    for (const asset of entry.assets) {
      const name = path.posix.basename(asset, path.posix.extname(asset));
      const rendered = references.some((reference) => {
        const local = localPath(reference, base);
        if (local === null) return false;

        const file = path.posix.basename(local.split('#')[0]);

        return file === name || file.startsWith(`${name}.`);
      });

      if (!rendered) {
        problems.push({
          code: 'missing-built-asset',
          route: entry.route,
          source: entry.source,
          detail: `the page of ${entry.route} does not render the image ${asset}`,
        });
      }
    }
  }

  return {
    ok: problems.length === 0,
    problems,
    stats: {
      pages: pages.length,
      documents: documents.length,
      feeds: documents.filter((document) => document.kind === 'xml').length,
      base,
    },
  };
}
