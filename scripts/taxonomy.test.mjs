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

import { contentManifest, splitFrontMatter } from './content.mjs';
import { expandLegacyFeeds } from './legacy-feed-routes.mjs';

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

/** The content the site publishes: every article and page that is no draft. */
const inventory = contentManifest(REPO_ROOT);
const postEntries = inventory.entries.filter(
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

/**
 * The terms of an article the site relates it to other articles by: its
 * keywords and its tags.
 *
 * @param {object} post An article of the corpus.
 * @returns {Set<string>} The terms of the article, each of them once.
 */
function relatedTerms(post) {
  return new Set(
    [...(post.keywords ?? []), ...(post.tags ?? [])].map((term) =>
      String(term).trim(),
    ),
  );
}

/**
 * Whether two articles have a term in common.
 *
 * The block of related articles holds the articles about the same subjects, so
 * an article that shares no keyword and no tag with the article belongs to no
 * block of it.
 *
 * @param {object} post An article of the corpus.
 * @param {object} other Another article of the corpus.
 * @returns {boolean} Whether the two share a term.
 */
function sharesTerm(post, other) {
  const theirs = relatedTerms(other);

  for (const term of relatedTerms(post)) {
    if (theirs.has(term)) return true;
  }

  return false;
}

/**
 * The text of the feed, with the entities of XML decoded.
 *
 * @param {string} text The text of an element of the feed.
 * @returns {string} The text, as a reader of the feed reads it.
 */
function decodeXml(text) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&amp;/g, '&');
}

/**
 * The body of an article, as the page of the article renders it.
 *
 * The body of a post sits in the region of the content of the post. The region
 * is read by counting the tags that open and the tags that close it, so a body
 * that holds a block of HTML of its own does not end the region too early.
 *
 * @param {string} html The page of the post.
 * @returns {string | null} The body, or nothing when the page has no region.
 */
function articleOf(html) {
  const open = '<div class="post-content">';
  const start = html.indexOf(open);

  if (start < 0) return null;

  let index = start + open.length;
  let depth = 1;

  while (depth > 0) {
    const nextOpen = html.indexOf('<div', index);
    const nextClose = html.indexOf('</div>', index);

    if (nextClose < 0) return null;

    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth += 1;
      index = nextOpen + '<div'.length;
      continue;
    }

    depth -= 1;
    index = nextClose + '</div>'.length;
  }

  return html.slice(start + open.length, index - '</div>'.length);
}

/**
 * The markup of a document, with its whitespace collapsed.
 *
 * Two renderings of the same body differ in the whitespace they carry, so the
 * whitespace is collapsed before two of them are compared.
 *
 * @param {string} markup The markup of a document.
 * @returns {string} The markup, without the whitespace that carries no meaning.
 */
function compact(markup) {
  return markup.replace(/\s+/g, ' ').trim();
}

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

/**
 * The terms of a taxonomy, in the order the pages of the site list them: the
 * terms with the most articles first, the terms with the same number of
 * articles by name.
 *
 * @param {object[]} terms The terms of the taxonomy.
 * @returns {object[]} The terms, in the order of the pages.
 */
function sortedTerms(terms) {
  return [...terms].sort(
    (a, b) =>
      b.posts.length - a.posts.length || a.name.localeCompare(b.name, 'en'),
  );
}

/**
 * The feeds the old Hugo site served, with the terms of the articles filled in.
 */
const legacyFeeds = expandLegacyFeeds(REPO_ROOT, {
  tags: sortedTerms(tagTerms).map((term) => term.slug),
  categories: sortedTerms(categoryTerms).map((term) => term.slug),
});

/**
 * The articles a feed holds, in the order the feed holds them.
 *
 * @param {object} feed The feed of the baseline.
 * @returns {string[]} The URLs of the articles of the feed.
 */
function expectedItems(feed) {
  if (feed.kind === 'terms') {
    const terms =
      feed.taxonomy === 'tags'
        ? sortedTerms(tagTerms)
        : sortedTerms(categoryTerms);

    return terms.map((term) => `${SITE}/${feed.taxonomy}/${term.slug}/`);
  }

  const members = feed.term
    ? (feed.taxonomy === 'tags' ? tagTerms : categoryTerms).find(
        (term) => term.slug === feed.term,
      ).posts
    : posts;

  return [...members]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date) ||
        a.slug.localeCompare(b.slug, 'en'),
    )
    .map((post) => `${SITE}/post/${post.slug}/`);
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

/**
 * The articles the page of an article shows as belonging to it.
 *
 * The block is an `aside` that holds the articles, so the articles are read
 * from it.
 *
 * @param {string} html The page of an article.
 * @returns {string[]} The slugs of the articles, in the order they appear.
 */
function relatedOf(html) {
  const block =
    html.match(
      /<aside\b[^>]*class="[^"]*\brelated-content\b[^"]*"[\s\S]*?<\/aside>/,
    )?.[0] ?? '';

  return linkedPosts(block);
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

  it('shows the articles that belong to an article', () => {
    const bySlug = new Map(posts.map((post) => [post.slug, post]));
    let withRelated = 0;

    for (const post of posts) {
      const html = readPage(`/post/${post.slug}/`);
      const related = relatedOf(html);

      assert.ok(
        related.length <= 5,
        `the page of ${post.slug} shows ${related.length} related articles`,
      );
      assert.equal(
        new Set(related).size,
        related.length,
        `the page of ${post.slug} shows the same article twice`,
      );

      for (const slug of related) {
        assert.notEqual(
          slug,
          post.slug,
          `the page of ${post.slug} relates the article to itself`,
        );

        const other = bySlug.get(slug);

        assert.ok(
          other,
          `the page of ${post.slug} relates it to ${slug}, which is no article of the site`,
        );
        assert.ok(
          new Date(other.date) <= new Date(post.date),
          `the page of ${post.slug} relates it to the later article ${slug}`,
        );
        assert.ok(
          sharesTerm(post, other),
          `the page of ${post.slug} relates it to ${slug}, which shares no term`,
        );
      }

      if (related.length === 0) continue;

      withRelated += 1;
      assert.ok(
        headingTexts(html).includes('Related content'),
        `the page of ${post.slug} has no block of related articles`,
      );
    }

    assert.ok(withRelated > 0, 'no page shows related articles');
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

  it('publishes the whole of every post in the feed', () => {
    const xml = readFileSync(path.join(DIST_DIR, 'rss.xml'), 'utf8');
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(
      (match) => match[1],
    );

    for (const post of posts) {
      const item = items.find((entry) =>
        entry.includes(`<link>${SITE}/post/${post.slug}/</link>`),
      );

      assert.ok(item, `the feed has no item for ${post.slug}`);

      const description = decodeXml(
        /<description>([\s\S]*?)<\/description>/.exec(item)?.[1] ?? '',
      );
      const article = articleOf(readPage(`/post/${post.slug}/`));

      assert.ok(article, `the page of ${post.slug} has no body`);

      assert.ok(
        description.length > String(post.description ?? '').length,
        `the item of ${post.slug} holds no more than its summary`,
      );

      assert.equal(
        compact(description),
        compact(article),
        `the item of ${post.slug} holds no more than its summary`,
      );
    }
  });

  it('serves a feed at every route the old site served a feed at', () => {
    for (const feed of legacyFeeds) {
      const file = path.join(DIST_DIR, feed.route.replace(/^\//, ''));

      assert.ok(existsSync(file), `no feed was built at ${feed.route}`);

      const xml = readFileSync(file, 'utf8');
      assert.match(xml, /<rss\b/, `the feed at ${feed.route} is not a feed`);

      const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(
        (match) => match[1],
      );
      const links = items.map(
        (item) => /<link>([^<]*)<\/link>/.exec(item)?.[1] ?? '',
      );

      assert.deepEqual(
        links,
        expectedItems(feed),
        `the feed at ${feed.route} holds the wrong articles`,
      );
    }
  });

  it('points the pages of the taxonomies at their feeds', () => {
    for (const feed of legacyFeeds) {
      if (!feed.advertised) continue;

      const html = readPage(feed.page);

      assert.ok(
        html.includes(`href="${feed.route}"`),
        `the page ${feed.page} does not point at the feed ${feed.route}`,
      );
    }
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
