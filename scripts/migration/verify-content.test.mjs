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
