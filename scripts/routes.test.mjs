#!/usr/bin/env node
/**
 * Route and render checks for the built site.
 *
 * Hugo served every post at `/post/{slug}/` with its title, date, body and
 * images. These checks build the site and read the result, so a page that
 * renders but renders the wrong thing fails here instead of reaching a
 * reader.
 *
 * Usage: node --test scripts/routes.test.mjs
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  parseFrontMatterFields,
  readManifest,
  splitFrontMatter,
} from './migration/verify-content.mjs';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const DIST_DIR = path.join(REPO_ROOT, 'dist');
const ASTRO_BIN = path.join(
  REPO_ROOT,
  'node_modules',
  'astro',
  'bin',
  'astro.mjs',
);

/** The canonical URL of the build the checks read. */
const SITE = 'https://blueberrypy.netlify.app';

const manifest = readManifest(REPO_ROOT);
const postEntries = manifest.entries.filter(
  (entry) => entry.collection === 'post',
);
const pageEntries = manifest.entries.filter(
  (entry) => entry.collection === 'page',
);

/** Build the site once: every check below reads the output of this build. */
function buildSite() {
  try {
    execFileSync(process.execPath, [ASTRO_BIN, 'build'], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      env: {
        ...process.env,
        ASTRO_TELEMETRY_DISABLED: '1',
        SITE_URL: SITE,
        BASE_PATH: '/',
      },
    });
  } catch (error) {
    const output = [error.stdout, error.stderr].filter(Boolean).join('\n');
    throw new Error(`the site did not build:\n${output}`, { cause: error });
  }
}

/** The front matter and the body of a content file, as the site sees them. */
function readSource(entry) {
  const raw = readFileSync(path.join(REPO_ROOT, entry.source), 'utf8');
  const { frontMatter, body } = splitFrontMatter(raw);

  return { fields: parseFrontMatterFields(frontMatter), body };
}

/** The file Astro writes for a route, e.g. `/post/a-post/` -> `dist/post/a-post/index.html`. */
function pageFile(route) {
  const relative = route.replace(/^\/+/, '').replace(/\/+$/, '');

  return path.join(DIST_DIR, relative, 'index.html');
}

function readPage(route) {
  const file = pageFile(route);
  assert.ok(
    existsSync(file),
    `no page was built for ${route} (expected ${file})`,
  );

  return readFileSync(file, 'utf8');
}

/** The visible text of an HTML document, without tags and without repeated spaces. */
function textContent(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/** The escaping a text gets when it is written into a page. */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;');
}

/** The first prose paragraph of a Markdown body, without Markdown syntax. */
function proseFragment(body) {
  const paragraphs = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^\s*---[\s\S]*?---\s*$/m, ' ')
    .split(/\n\s*\n/);

  for (const paragraph of paragraphs) {
    const text = paragraph
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/^\s*#{1,6}\s+/gm, ' ')
      .replace(/\s+#+\s*$/gm, ' ')
      .replace(/[*_`>]/g, ' ')
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/\s+/g, ' ')
      .trim();

    if (text.length < 40) continue;
    if (/^[-*\d]/.test(text)) continue;

    return text.slice(0, 60);
  }

  return '';
}

/** The `src` of every image a page renders. */
function imageSources(html) {
  return [...html.matchAll(/<img\b[^>]*\bsrc="([^"]*)"/g)].map(
    (match) => match[1],
  );
}

/** The heading ids a page defines. */
function headingIds(html) {
  return [...html.matchAll(/<h[1-6]\b[^>]*\bid="([^"]*)"/g)].map(
    (match) => match[1],
  );
}

/** The fragment links of the table of contents of a page. */
function tocFragments(html) {
  const toc = html.match(
    /<nav\b[^>]*class="[^"]*\btoc\b[^"]*"[\s\S]*?<\/nav>/i,
  );

  if (!toc) return [];

  return [...toc[0].matchAll(/href="#([^"]*)"/g)].map((match) => match[1]);
}

describe('the built site', () => {
  before(() => {
    buildSite();
  });

  it('serves one page per content route', () => {
    for (const entry of manifest.entries) {
      const { fields } = readSource(entry);
      if (fields.draft === 'true') continue;

      assert.ok(
        existsSync(pageFile(entry.route)),
        `${entry.source} has no page at ${entry.route}`,
      );
    }
  });

  it('serves no page outside the content routes', () => {
    const built = readdirSync(path.join(DIST_DIR, 'post'), {
      withFileTypes: true,
    })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();

    const expected = postEntries
      .filter((entry) => readSource(entry).fields.draft !== 'true')
      .map((entry) => entry.slug)
      .sort();

    assert.deepEqual(built, expected);
  });

  it('serves a 404 page', () => {
    const file = path.join(DIST_DIR, '404.html');
    assert.ok(existsSync(file), 'no 404.html was built');

    const html = readFileSync(file, 'utf8');
    assert.match(html, /<h1[\s>]/, 'the 404 page has no heading');
  });

  it('renders the title of every post', () => {
    for (const entry of postEntries) {
      const { fields } = readSource(entry);
      const html = readPage(entry.route);
      const title = fields.title;

      assert.ok(
        html.includes(`<title>${escapeHtml(title)}</title>`),
        `${entry.route} does not have the title ${title}`,
      );

      const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(
        (match) => textContent(match[1]),
      );
      assert.ok(
        headings.some((heading) => heading.includes(title)),
        `${entry.route} does not show the title ${title} as a heading`,
      );
    }
  });

  it('renders the date of every post in Asia/Shanghai', () => {
    for (const entry of postEntries) {
      const { fields } = readSource(entry);
      const html = readPage(entry.route);

      assert.ok(
        html.includes(`datetime="${fields.date}"`),
        `${entry.route} does not carry the publication date ${fields.date}`,
      );
      assert.ok(
        html.includes('CST'),
        `${entry.route} does not show the date in Asia/Shanghai`,
      );
    }
  });

  it('renders the body of every post', () => {
    for (const entry of [...postEntries, ...pageEntries]) {
      const { body } = readSource(entry);
      const fragment = proseFragment(body);
      if (!fragment) continue;

      const text = textContent(readPage(entry.route));
      assert.ok(
        text.includes(fragment),
        `${entry.route} does not contain the text "${fragment}"`,
      );
    }
  });

  it('renders every local image of a post', () => {
    for (const entry of [...postEntries, ...pageEntries]) {
      const html = readPage(entry.route);
      const sources = imageSources(html);

      for (const asset of entry.assets) {
        const name = path.basename(asset, path.extname(asset));
        assert.ok(
          sources.some((source) => source.includes(`${name}.`)),
          `${entry.route} does not render the image ${asset}`,
        );
      }
    }
  });

  it('resolves every local image to a built file', () => {
    for (const entry of [...postEntries, ...pageEntries]) {
      const html = readPage(entry.route);

      for (const source of imageSources(html)) {
        if (/^[a-z]+:\/\//i.test(source)) continue;

        const file = source.startsWith('/')
          ? path.join(DIST_DIR, source.replace(/^\/+/, ''))
          : path.join(path.dirname(pageFile(entry.route)), source);

        assert.ok(
          existsSync(file),
          `${entry.route} points at the missing ${source}`,
        );
      }
    }
  });

  it('links the table of contents to existing headings', () => {
    let withToc = 0;

    for (const entry of postEntries) {
      const html = readPage(entry.route);
      const fragments = tocFragments(html);

      for (const fragment of fragments) {
        assert.ok(
          headingIds(html).includes(fragment),
          `${entry.route} links to the missing heading #${fragment}`,
        );
      }

      const ids = headingIds(html);
      assert.equal(
        new Set(ids).size,
        ids.length,
        `${entry.route} has duplicate heading ids`,
      );

      if (fragments.length > 0) withToc += 1;
    }

    assert.ok(withToc > 0, 'no post has a table of contents');
  });
});
