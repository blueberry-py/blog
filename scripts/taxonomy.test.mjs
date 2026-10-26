#!/usr/bin/env node
/**
 * Checks for the taxonomies, the feeds and the social metadata of the built
 * site.
 *
 * Hugo served a page for every tag and every category, a feed of the posts and
 * a sitemap of the routes, and it described every post with the metadata social
 * networks read. These checks build the site and read the result, so a
 * taxonomy that lists the wrong posts, a feed that points at the wrong URL or a
 * post that no social network can describe fails here.
 *
 * Usage: node --test scripts/taxonomy.test.mjs
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import YAML from 'yaml';

import { readManifest, splitFrontMatter } from './migration/verify-content.mjs';

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

/** The front matter of a content file, as the site sees it. */
function readSource(entry) {
  const raw = readFileSync(path.join(REPO_ROOT, entry.source), 'utf8');
  const { frontMatter, body } = splitFrontMatter(raw);

  return { fields: YAML.parse(frontMatter) ?? {}, body };
}

/** The posts of the corpus, with the front matter the site reads. */
const posts = postEntries.map((entry) => {
  const { fields } = readSource(entry);

  return { ...entry, ...fields };
});

/** The file Astro writes for a route, e.g. `/tags/rust/` -> `dist/tags/rust/index.html`. */
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

/** The slug Hugo served a term at: the name in lower case. */
function termSlug(name) {
  return String(name).trim().toLowerCase();
}

/**
 * The name Hugo showed a term with.
 *
 * Hugo titled a term with the spelling the posts used, and used the lower case
 * spelling when the posts used both spellings: `AI` and `ai` became `Ai`, a
 * term that only ever appeared as `GPT` stayed `GPT`.
 */
function termName(names) {
  const spellings = [...new Set(names)].sort();
  const lower = spellings.find((name) => name === name.toLowerCase());
  const chosen = lower ?? spellings[0];

  return chosen.charAt(0).toUpperCase() + chosen.slice(1);
}

/** The terms of the corpus, per taxonomy, with the posts that carry them. */
function collectTerms(field) {
  const spellings = new Map();
  const members = new Map();

  for (const post of posts) {
    for (const value of post[field] ?? []) {
      const slug = termSlug(value);

      if (!spellings.has(slug)) spellings.set(slug, []);
      spellings.get(slug).push(String(value));

      if (!members.has(slug)) members.set(slug, []);
      members.get(slug).push(post);
    }
  }

  return [...spellings.entries()].map(([slug, names]) => ({
    slug,
    name: termName(names),
    posts: members.get(slug),
  }));
}

const tagTerms = collectTerms('tags');
const categoryTerms = collectTerms('categories');

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

/** The heading texts of a page. */
function headingTexts(html) {
  return [...html.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/g)].map(
    (match) => textContent(match[1]),
  );
}

/** The links of a page, in the order they appear. */
function links(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map(
    (match) => match[1],
  );
}

/** The slugs of the posts a page links to, in the order they appear. */
function linkedPosts(html) {
  return links(html)
    .map((href) => /^\/post\/([^/]+)\/$/.exec(href)?.[1])
    .filter((slug) => slug !== undefined);
}

/** The escaping a text gets when it is written into a page. */
function unescapeHtml(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

/** The content of a meta tag of a page. */
function metaContent(html, attribute, value) {
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${value}"\\s+content="([^"]*)"`,
  );

  return unescapeHtml(pattern.exec(html)?.[1] ?? '');
}

/** The names the old Hugo site gave to the terms it served. */
const LEGACY_TERM_NAMES = {
  'tags/ai': 'Ai',
  'tags/gpt': 'GPT',
  'tags/ide': 'IDE',
  'tags/llama': 'Llama',
  'tags/llm': 'Llm',
  'tags/linux': 'Linux',
  'tags/python': 'Python',
  'tags/2023': '2023',
  'categories/ai': 'AI',
  'categories/llm': 'Llm',
  'categories/python': 'Python',
};

describe('the taxonomies of the built site', () => {
  before(() => {
    buildSite();
  });

  it('serves a page for every tag and every category', () => {
    assert.ok(existsSync(pageFile('/tags/')), 'no index of the tags was built');
    assert.ok(
      existsSync(pageFile('/categories/')),
      'no index of the categories was built',
    );

    for (const term of tagTerms) {
      assert.ok(
        existsSync(pageFile(`/tags/${term.slug}/`)),
        `no page was built for the tag ${term.name}`,
      );
    }

    for (const term of categoryTerms) {
      assert.ok(
        existsSync(pageFile(`/categories/${term.slug}/`)),
        `no page was built for the category ${term.name}`,
      );
    }
  });

  it('names every term the way Hugo named it', () => {
    for (const [route, name] of Object.entries(LEGACY_TERM_NAMES)) {
      const html = readPage(`/${route}/`);

      assert.ok(
        headingTexts(html).includes(name),
        `/${route}/ is not titled ${name}`,
      );
    }

    for (const term of [...tagTerms, ...categoryTerms]) {
      const route = term.slug;
      const html = readPage(
        tagTerms.includes(term) ? `/tags/${route}/` : `/categories/${route}/`,
      );

      assert.ok(
        headingTexts(html).includes(term.name),
        `the term ${term.name} is not shown with its own name`,
      );
    }
  });

  it('lists only the posts of a term on its page', () => {
    for (const term of tagTerms) {
      const html = readPage(`/tags/${term.slug}/`);
      const expected = term.posts.map((post) => post.slug).sort();
      const listed = linkedPosts(html).sort();

      assert.deepEqual(
        listed,
        expected,
        `the page of the tag ${term.name} lists the wrong posts`,
      );
    }

    for (const term of categoryTerms) {
      const html = readPage(`/categories/${term.slug}/`);
      const expected = term.posts.map((post) => post.slug).sort();
      const listed = linkedPosts(html).sort();

      assert.deepEqual(
        listed,
        expected,
        `the page of the category ${term.name} lists the wrong posts`,
      );
    }
  });

  it('links every taxonomy page from the homepage', () => {
    const html = readPage('/');
    const linked = links(html);

    assert.ok(linked.includes('/tags/'), 'the homepage does not link the tags');
    assert.ok(
      linked.includes('/categories/'),
      'the homepage does not link the categories',
    );

    const tagIndex = links(readPage('/tags/'));

    for (const term of tagTerms) {
      assert.ok(
        tagIndex.includes(`/tags/${term.slug}/`),
        `the index of the tags does not link the tag ${term.name}`,
      );
    }

    const categoryIndex = links(readPage('/categories/'));

    for (const term of categoryTerms) {
      assert.ok(
        categoryIndex.includes(`/categories/${term.slug}/`),
        `the index of the categories does not link the category ${term.name}`,
      );
    }
  });

  it('orders the archive from the newest post to the oldest', () => {
    const html = readPage('/archives/');
    const expected = [...posts]
      .sort(
        (a, b) =>
          new Date(b.date) - new Date(a.date) ||
          a.slug.localeCompare(b.slug, 'en'),
      )
      .map((post) => post.slug);

    assert.deepEqual(
      linkedPosts(html),
      expected,
      'the archive does not list the posts from the newest to the oldest',
    );
  });

  it('publishes the posts in the feed', () => {
    const feed = path.join(DIST_DIR, 'rss.xml');
    assert.ok(existsSync(feed), 'no feed was built at /rss.xml');

    const xml = readFileSync(feed, 'utf8');
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(
      (match) => match[1],
    );

    assert.equal(
      items.length,
      posts.length,
      'the feed does not hold every post',
    );

    for (const post of posts) {
      const item = items.find((entry) =>
        entry.includes(`<link>${SITE}/post/${post.slug}/</link>`),
      );

      assert.ok(item, `the feed has no item for ${post.slug}`);

      const pubDate = /<pubDate>([^<]*)<\/pubDate>/.exec(item)?.[1];
      assert.ok(
        pubDate &&
          new Date(pubDate).getTime() === new Date(post.date).getTime(),
        `the item of ${post.slug} carries the wrong date`,
      );
    }

    assert.ok(
      existsSync(path.join(DIST_DIR, 'index.xml')),
      'the feed is not served at the /index.xml the old site used',
    );
  });

  it('lists the routes of the site in the sitemap', () => {
    const index = path.join(DIST_DIR, 'sitemap-index.xml');
    assert.ok(
      existsSync(index),
      'no sitemap index was built (the old site served /sitemap.xml)',
    );

    const indexXml = readFileSync(index, 'utf8');
    const sitemap = /<loc>([^<]*sitemap-[^<]*)<\/loc>/.exec(indexXml)?.[1];
    assert.ok(sitemap, 'the sitemap index names no sitemap');

    const file = path.join(
      DIST_DIR,
      sitemap.replace(/^https?:\/\/[^/]+\//, '').replace(/^.*\//, ''),
    );
    const xml = readFileSync(file, 'utf8');

    for (const post of posts) {
      assert.ok(
        xml.includes(`<loc>${SITE}/post/${post.slug}/</loc>`),
        `the sitemap does not list ${post.slug}`,
      );
    }

    assert.ok(
      xml.includes(`<loc>${SITE}/tags/</loc>`),
      'the sitemap does not list the tags',
    );
    assert.ok(
      xml.includes(`<loc>${SITE}/categories/</loc>`),
      'the sitemap does not list the categories',
    );
  });

  it('describes every post for social networks', () => {
    for (const post of posts) {
      const html = readPage(`/post/${post.slug}/`);

      assert.equal(
        metaContent(html, 'property', 'og:title'),
        post.title,
        `the post ${post.slug} has no og:title`,
      );
      assert.equal(
        metaContent(html, 'property', 'og:description'),
        post.description,
        `the post ${post.slug} has no og:description`,
      );
      assert.equal(
        metaContent(html, 'property', 'og:url'),
        `${SITE}/post/${post.slug}/`,
        `the post ${post.slug} has no og:url`,
      );
      assert.equal(
        metaContent(html, 'property', 'og:site_name'),
        'BlueberryPy',
        `the post ${post.slug} has no og:site_name`,
      );
      assert.equal(
        metaContent(html, 'property', 'og:type'),
        'article',
        `the post ${post.slug} is not described as an article`,
      );
      assert.equal(
        metaContent(html, 'property', 'article:published_time'),
        post.date,
        `the post ${post.slug} has no publication date`,
      );
      assert.equal(
        metaContent(html, 'property', 'article:modified_time'),
        post.date,
        `the post ${post.slug} has no modification date`,
      );
      assert.equal(
        metaContent(html, 'name', 'twitter:site'),
        '@linzeyang',
        `the post ${post.slug} has no twitter:site`,
      );
      assert.equal(
        metaContent(html, 'name', 'twitter:creator'),
        '@linzeyang',
        `the post ${post.slug} has no twitter:creator`,
      );

      for (const tag of post.tags ?? []) {
        assert.ok(
          html.includes(`<meta property="article:tag" content="${tag}">`),
          `the post ${post.slug} does not carry the tag ${tag}`,
        );
      }

      const cover = post.image;
      const ogImage = metaContent(html, 'property', 'og:image');

      if (cover) {
        assert.ok(ogImage, `the post ${post.slug} has a cover but no og:image`);
        assert.ok(
          ogImage.startsWith(SITE),
          `the og:image of ${post.slug} is not an absolute URL`,
        );
        assert.equal(
          metaContent(html, 'name', 'twitter:card'),
          'summary',
          `the post ${post.slug} has a cover but no twitter:card`,
        );
        assert.ok(
          metaContent(html, 'name', 'twitter:image'),
          `the post ${post.slug} has a cover but no twitter:image`,
        );
      } else {
        assert.equal(
          ogImage,
          '',
          `the post ${post.slug} has no cover but an og:image`,
        );
        assert.equal(
          metaContent(html, 'name', 'twitter:image'),
          '',
          `the post ${post.slug} has no cover but a twitter:image`,
        );
      }
    }
  });

  it('shows the license of an article and the footer of the site', () => {
    for (const post of posts) {
      const html = readPage(`/post/${post.slug}/`);

      assert.ok(
        textContent(html).includes('Licensed under CC BY-NC-SA 4.0'),
        `the post ${post.slug} does not name its license`,
      );
    }

    const footer = textContent(readPage('/'));
    assert.ok(
      footer.includes(`© 2024 - ${new Date().getFullYear()} BlueberryPy`),
      'the footer does not show the years the site has been running',
    );
  });
});
