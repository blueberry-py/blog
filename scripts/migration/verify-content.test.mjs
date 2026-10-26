import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

/**
 * The verifier module is created in the same task as these tests, so it is
 * imported lazily: before the implementation exists every test fails with a
 * "cannot find module" error instead of the whole file failing to load.
 */
async function loadVerifier() {
  return import('./verify-content.mjs');
}

const TOML_POST = `+++
title = "Alpha"
slug = "alpha"
date = 2024-01-31T15:32:01+08:00
tags = ["python"]
categories = ["python"]
+++

## Alpha

Body text.
`;

/**
 * Write a throwaway content tree and hand its root to `fn`.
 */
async function withFixture(files, fn) {
  const root = mkdtempSync(path.join(tmpdir(), 'blog-verify-content-'));
  try {
    for (const [relativePath, contents] of Object.entries(files)) {
      const target = path.join(root, relativePath);
      mkdirSync(path.dirname(target), { recursive: true });
      writeFileSync(target, contents, 'utf8');
    }
    return await fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

describe('content inventory', () => {
  it('derives the slug from front matter and falls back to the file path', async () => {
    const { deriveSlug } = await loadVerifier();

    assert.equal(
      deriveSlug('content/post/alpha.md', { slug: 'custom-slug' }),
      'custom-slug',
    );
    assert.equal(deriveSlug('content/post/dir/index.md', {}), 'dir');
    assert.equal(deriveSlug('content/post/dir/nested.md', {}), 'dir/nested');
  });

  it('maps posts and pages to their historical routes', async () => {
    const { deriveRoute } = await loadVerifier();

    assert.equal(deriveRoute('content/post/alpha.md', 'alpha'), '/post/alpha/');
    assert.equal(deriveRoute('content/post/dir/index.md', 'dir'), '/post/dir/');
    assert.equal(deriveRoute('content/about/index.md', 'about'), '/about/');
  });

  it('splits TOML front matter from the body without touching the body', async () => {
    const { splitFrontMatter } = await loadVerifier();

    const raw = TOML_POST;
    const { frontMatter, body } = splitFrontMatter(raw);

    assert.match(frontMatter, /title = "Alpha"/);
    assert.equal(body, '\n## Alpha\n\nBody text.\n');
    assert.ok(raw.endsWith(body), 'the body is preserved byte-for-byte');
  });

  it('splits CRLF front matter from the body without touching the body', async () => {
    const { splitFrontMatter, parseFrontMatterFields } = await loadVerifier();

    const raw = TOML_POST.replace(/\n/g, '\r\n');
    const { frontMatter, body } = splitFrontMatter(raw);

    assert.equal(body, '\r\n## Alpha\r\n\r\nBody text.\r\n');
    assert.ok(raw.endsWith(body), 'the body is preserved byte-for-byte');
    assert.deepEqual(parseFrontMatterFields(frontMatter), {
      title: 'Alpha',
      slug: 'alpha',
      date: '2024-01-31T15:32:01+08:00',
      tags: '["python"]',
      categories: '["python"]',
    });
  });

  it('strips carriage returns from the front matter but not from the body', async () => {
    const { splitFrontMatter } = await loadVerifier();

    const raw = TOML_POST.replace(/\n/g, '\r\n');
    const { frontMatter, body } = splitFrontMatter(raw);

    assert.ok(
      !frontMatter.includes('\r'),
      'the front matter carries no carriage returns',
    );
    assert.ok(body.includes('\r'), 'the body keeps its carriage returns');
  });

  it('hashes a body the same way whatever line endings it uses', async () => {
    const { hashBody } = await loadVerifier();

    assert.equal(
      hashBody('one\r\ntwo\r\n'),
      hashBody('one\ntwo\n'),
      'the hash does not depend on the checkout line endings',
    );
    assert.notEqual(hashBody('one\r\ntwo\r\n'), hashBody('one\nthree\n'));
  });

  it('collects only local assets referenced by the body or the front matter', async () => {
    const { collectLocalAssetRefs } = await loadVerifier();

    const body = [
      '![local](pic.png)',
      '![remote](https://example.com/remote.png)',
      '[link](notes.md)',
      '[hostname](www.jd.com)',
      '[anchor](#section)',
      '[mailto](mailto:someone@example.com)',
    ].join('\n');

    const assets = collectLocalAssetRefs(
      'content/post/dir/index.md',
      { image: 'title.jpg' },
      body,
    );

    assert.deepEqual(assets, [
      'content/post/dir/pic.png',
      'content/post/dir/title.jpg',
    ]);
  });
});

describe('manifest verification', () => {
  it('reports a duplicate route when two sources resolve to the same route', async () => {
    const { buildManifest, verifyManifest } = await loadVerifier();

    const sharedSlug = TOML_POST.replace('slug = "alpha"', 'slug = "shared"');

    await withFixture(
      {
        'content/post/alpha.md': sharedSlug,
        'content/post/beta.md': sharedSlug,
      },
      async (root) => {
        const manifest = buildManifest(root, [
          'content/post/alpha.md',
          'content/post/beta.md',
        ]);
        const result = verifyManifest(manifest, root);

        assert.equal(result.ok, false);
        assert.ok(
          result.problems.some((problem) => problem.code === 'duplicate-route'),
          `expected a duplicate-route problem, got ${JSON.stringify(result.problems)}`,
        );
      },
    );
  });

  it('reports a tracked Markdown file that is missing from disk', async () => {
    const { buildManifest, verifyManifest } = await loadVerifier();

    await withFixture({ 'content/post/alpha.md': TOML_POST }, async (root) => {
      const manifest = buildManifest(root, ['content/post/alpha.md']);
      rmSync(path.join(root, 'content/post/alpha.md'));

      const result = verifyManifest(manifest, root);

      assert.equal(result.ok, false);
      assert.ok(
        result.problems.some(
          (problem) =>
            problem.code === 'missing-source' &&
            problem.source === 'content/post/alpha.md',
        ),
        `expected a missing-source problem, got ${JSON.stringify(result.problems)}`,
      );
    });
  });

  it('reports a referenced local image that does not exist', async () => {
    const { buildManifest, verifyManifest } = await loadVerifier();

    const post = TOML_POST.replace('Body text.', '![missing](pic.png)');

    await withFixture({ 'content/post/alpha.md': post }, async (root) => {
      const manifest = buildManifest(root, ['content/post/alpha.md']);
      const result = verifyManifest(manifest, root);

      assert.equal(result.ok, false);
      assert.ok(
        result.problems.some(
          (problem) =>
            problem.code === 'missing-asset' &&
            problem.source === 'content/post/alpha.md',
        ),
        `expected a missing-asset problem, got ${JSON.stringify(result.problems)}`,
      );
    });
  });

  it('reports an article whose body hash changed', async () => {
    const { buildManifest, verifyManifest } = await loadVerifier();

    await withFixture({ 'content/post/alpha.md': TOML_POST }, async (root) => {
      const manifest = buildManifest(root, ['content/post/alpha.md']);
      writeFileSync(
        path.join(root, 'content/post/alpha.md'),
        TOML_POST.replace('Body text.', 'Rewritten body text.'),
        'utf8',
      );

      const result = verifyManifest(manifest, root);

      assert.equal(result.ok, false);
      assert.ok(
        result.problems.some(
          (problem) =>
            problem.code === 'body-changed' &&
            problem.source === 'content/post/alpha.md',
        ),
        `expected a body-changed problem, got ${JSON.stringify(result.problems)}`,
      );
    });
  });

  it('passes when every source, route and asset is intact', async () => {
    const { buildManifest, verifyManifest } = await loadVerifier();

    await withFixture(
      {
        'content/post/alpha.md': TOML_POST,
        'content/post/pic.png': 'not really a png',
        'content/about/index.md': '+++\ntitle = "About"\n+++\n\nAbout text.\n',
      },
      async (root) => {
        const manifest = buildManifest(root, [
          'content/post/alpha.md',
          'content/about/index.md',
        ]);
        const result = verifyManifest(manifest, root);

        assert.deepEqual(result.problems, []);
        assert.equal(result.ok, true);
      },
    );
  });
});

/** A post with a cover image and an image in its body. */
const POST_WITH_IMAGES = `+++
title = "Alpha"
slug = "alpha"
date = 2024-01-31T15:32:01+08:00
image = "cover.png"
+++

## Alpha

![pic](pic.png)
`;

/** The content tree of the small site the built output checks read. */
const CONTENT = {
  'content/post/alpha.md': POST_WITH_IMAGES,
  'content/post/cover.png': 'not really a png',
  'content/post/pic.png': 'not really a png',
};

/** The output of a build of that small site. */
const OUTPUT = {
  'dist/index.html':
    '<link rel="canonical" href="https://example.com/" /><a href="/post/alpha/">Alpha</a>',
  'dist/post/alpha/index.html':
    '<img src="/_astro/cover.abc.webp" /><img src="/_astro/pic.def.webp" />',
  'dist/404.html': '<h1>Not found</h1>',
  'dist/_astro/cover.abc.webp': 'not really a png',
  'dist/_astro/pic.def.webp': 'not really a png',
};

/**
 * Audit the built output of the small site.
 *
 * The fixture is written to a throwaway directory, so the checks read a site
 * of their own instead of the site of the repository.
 */
async function auditBuiltOutput(files = OUTPUT, options = {}) {
  const { buildManifest, verifyBuiltOutput } = await loadVerifier();

  return withFixture({ ...CONTENT, ...files }, async (root) => {
    const manifest = buildManifest(root, ['content/post/alpha.md']);

    return verifyBuiltOutput(manifest, root, options);
  });
}

describe('the built output', () => {
  it('collects the local references of a page and leaves the others out', async () => {
    const { collectLocalReferences } = await loadVerifier();

    const html = [
      '<a href="/post/alpha/">Alpha</a>',
      '<a href="https://example.com/other">Other</a>',
      '<a href="#section">Section</a>',
      '<img src="/_astro/cover.webp" />',
      '<script src="//cdn.example.com/x.js"></script>',
    ].join('\n');

    assert.deepEqual(collectLocalReferences(html), [
      '/post/alpha/',
      '/_astro/cover.webp',
    ]);
  });

  it('takes the base path off a local reference', async () => {
    const { localPath } = await loadVerifier();

    assert.equal(localPath('/post/alpha/', '/'), '/post/alpha/');
    assert.equal(localPath('/blog/post/alpha/', '/blog/'), '/post/alpha/');
    assert.equal(localPath('/blog/', '/blog/'), '/');
    assert.equal(localPath('/blog', '/blog/'), '/');
    assert.equal(localPath('/post/alpha/', '/blog/'), null);
  });

  it('resolves a local path to the file of the output that serves it', async () => {
    const { outputFileFor } = await loadVerifier();

    await withFixture(
      {
        'dist/index.html': 'home',
        'dist/post/alpha/index.html': 'alpha',
        'dist/favicon.png': 'icon',
      },
      async (root) => {
        const output = path.join(root, 'dist');

        assert.equal(
          outputFileFor(output, '/'),
          path.join(output, 'index.html'),
        );
        assert.equal(
          outputFileFor(output, '/post/alpha/'),
          path.join(output, 'post', 'alpha', 'index.html'),
        );
        assert.equal(
          outputFileFor(output, '/favicon.png'),
          path.join(output, 'favicon.png'),
        );
        assert.equal(outputFileFor(output, '/missing/'), null);
        assert.equal(outputFileFor(output, '/../outside'), null);
      },
    );
  });

  it('reads the base path of a build from the canonical URL of its home page', async () => {
    const { detectBase } = await loadVerifier();

    await withFixture(
      {
        'dist/index.html':
          '<link rel="canonical" href="https://blueberry-py.github.io/blog/" />',
      },
      async (root) => {
        assert.equal(detectBase(path.join(root, 'dist')), '/blog/');
      },
    );
  });
});

describe('the verification of the built output', () => {
  it('passes when every route, asset and link is intact', async () => {
    const result = await auditBuiltOutput();

    assert.deepEqual(result.problems, []);
    assert.equal(result.ok, true);
  });

  it('reports a site that is not built', async () => {
    const result = await auditBuiltOutput({});

    assert.ok(
      result.problems.some((problem) => problem.code === 'no-built-output'),
      `expected a no-built-output problem, got ${JSON.stringify(result.problems)}`,
    );
  });

  it('reports a route of the manifest that has no page', async () => {
    const withoutPage = { ...OUTPUT };
    delete withoutPage['dist/post/alpha/index.html'];

    const result = await auditBuiltOutput(withoutPage);

    assert.ok(
      result.problems.some(
        (problem) =>
          problem.code === 'missing-page' && problem.route === '/post/alpha/',
      ),
      `expected a missing-page problem, got ${JSON.stringify(result.problems)}`,
    );
  });

  it('reports a route that two articles claim', async () => {
    const { buildManifest, verifyBuiltOutput } = await loadVerifier();

    const shared = POST_WITH_IMAGES.replace(
      'slug = "alpha"',
      'slug = "shared"',
    );

    await withFixture(
      {
        ...CONTENT,
        ...OUTPUT,
        'content/post/alpha.md': shared,
        'content/post/beta.md': shared,
      },
      async (root) => {
        const manifest = buildManifest(root, [
          'content/post/alpha.md',
          'content/post/beta.md',
        ]);
        const result = verifyBuiltOutput(manifest, root);

        assert.ok(
          result.problems.some((problem) => problem.code === 'duplicate-route'),
          `expected a duplicate-route problem, got ${JSON.stringify(result.problems)}`,
        );
      },
    );
  });

  it('reports a local link that points at nothing', async () => {
    const result = await auditBuiltOutput({
      ...OUTPUT,
      'dist/index.html': '<a href="/missing/">Missing</a>',
    });

    assert.ok(
      result.problems.some((problem) => problem.code === 'broken-link'),
      `expected a broken-link problem, got ${JSON.stringify(result.problems)}`,
    );
  });

  it('reports a link that points outside of the base path', async () => {
    const result = await auditBuiltOutput(OUTPUT, { base: '/blog/' });

    assert.ok(
      result.problems.some((problem) => problem.code === 'link-outside-base'),
      `expected a link-outside-base problem, got ${JSON.stringify(result.problems)}`,
    );
  });

  it('reports a base path that is used twice', async () => {
    const result = await auditBuiltOutput(
      {
        ...OUTPUT,
        'dist/index.html': '<a href="/blog/blog/post/alpha/">Alpha</a>',
      },
      { base: '/blog/' },
    );

    assert.ok(
      result.problems.some((problem) => problem.code === 'doubled-base'),
      `expected a doubled-base problem, got ${JSON.stringify(result.problems)}`,
    );
  });

  it('accepts a link whose own name is the name of the base path', async () => {
    const result = await auditBuiltOutput(
      {
        ...OUTPUT,
        'dist/index.html': '<a href="/blog/tags/blog/">Blog</a>',
      },
      { base: '/blog/' },
    );

    assert.ok(
      !result.problems.some((problem) => problem.code === 'doubled-base'),
      `the link to the tag blog is not a doubled base, got ${JSON.stringify(result.problems)}`,
    );
  });

  it('reports an image of an article that its page does not render', async () => {
    const result = await auditBuiltOutput({
      ...OUTPUT,
      'dist/post/alpha/index.html': '<img src="/_astro/cover.abc.webp" />',
    });

    assert.ok(
      result.problems.some(
        (problem) =>
          problem.code === 'missing-built-asset' &&
          problem.detail.includes('pic.png'),
      ),
      `expected a missing-built-asset problem, got ${JSON.stringify(result.problems)}`,
    );
  });

  it('reports a number of articles that does not match the manifest', async () => {
    const result = await auditBuiltOutput({
      ...OUTPUT,
      'dist/post/beta/index.html': '<p>Beta</p>',
    });

    assert.ok(
      result.problems.some((problem) => problem.code === 'post-count-mismatch'),
      `expected a post-count-mismatch problem, got ${JSON.stringify(result.problems)}`,
    );
  });
});
