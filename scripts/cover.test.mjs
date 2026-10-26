#!/usr/bin/env node
/**
 * Checks the cover of an article whose cover is not there.
 *
 * Hugo served the cover of an article from the folder of the article, and so
 * does this site. An article that names a cover it does not have must not stop
 * the site from being built: it is published without a cover, and the build
 * says which cover is missing. Without that, one unfinished article of the
 * working tree breaks every build of the site.
 *
 * Usage: node --test scripts/cover.test.mjs
 */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const ASTRO_BIN = path.join(
  REPO_ROOT,
  'node_modules',
  'astro',
  'bin',
  'astro.mjs',
);

/** The article the build is checked with. */
const PUBLISHED = 'cover-tolerance-published';
const DRAFT = 'cover-tolerance-draft';

/**
 * The store of the content layer: the cache of the articles of the site.
 *
 * Astro reads an article from the store when its file has not changed, and the
 * loader that drops a cover that is not there is not run again: the build
 * would not say which cover is missing, and the check would answer a question
 * of the cache. The store is emptied before the build, so that the loader
 * always runs.
 */
const CONTENT_STORE = path.join(
  REPO_ROOT,
  'node_modules',
  '.astro',
  'data-store.json',
);

/**
 * The helper is created in the same task as these tests, so it is imported
 * lazily: before the implementation exists every test fails with a
 * "cannot find module" error instead of the whole file failing to load.
 */
async function loadCover() {
  return import('../src/lib/cover.ts');
}

/** A folder with an article in it, and the path of that article. */
function withArticle(fn) {
  const root = mkdtempSync(path.join(tmpdir(), 'blog-cover-'));
  const folder = path.join(root, 'post');
  const file = path.join(folder, 'index.md');

  mkdirSync(folder, { recursive: true });
  writeFileSync(file, '---\ntitle: "Alpha"\n---\n', 'utf8');

  try {
    return fn({ root, folder, file });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

describe('the cover of an article', () => {
  it('keeps the cover of an article whose cover is there', async () => {
    const { withoutMissingCover } = await loadCover();

    withArticle(({ folder, file }) => {
      writeFileSync(path.join(folder, 'title.jpg'), 'image', 'utf8');

      const { data, missing } = withoutMissingCover(
        { title: 'Alpha', image: 'title.jpg' },
        file,
      );

      assert.equal(data.image, 'title.jpg');
      assert.equal(missing, undefined);
    });
  });

  it('drops the cover of an article whose cover is not there', async () => {
    const { withoutMissingCover } = await loadCover();

    withArticle(({ folder, file }) => {
      const { data, missing } = withoutMissingCover(
        { title: 'Alpha', image: 'title.jpg' },
        file,
      );

      assert.equal(data.image, undefined);
      assert.equal(data.title, 'Alpha');
      assert.equal(missing?.cover, 'title.jpg');
      assert.equal(
        missing?.path,
        path.join(folder, 'title.jpg'),
        'the report names the file the cover would have been',
      );
    });
  });

  it('keeps a cover that is not a file of the article', async () => {
    const { withoutMissingCover } = await loadCover();

    withArticle(({ file }) => {
      for (const cover of [
        'https://example.com/title.jpg',
        '/title.jpg',
        '//example.com/title.jpg',
      ]) {
        const { data, missing } = withoutMissingCover(
          { title: 'Alpha', image: cover },
          file,
        );

        assert.equal(data.image, cover);
        assert.equal(missing, undefined);
      }
    });
  });

  it('keeps an article that has no cover', async () => {
    const { withoutMissingCover } = await loadCover();

    withArticle(({ file }) => {
      const { data, missing } = withoutMissingCover({ title: 'Alpha' }, file);

      assert.deepEqual(data, { title: 'Alpha' });
      assert.equal(missing, undefined);
    });
  });
});

/**
 * Build the site and remove the articles that were written for the check.
 *
 * The articles are removed whether the build succeeds or fails, so a check
 * that fails does not leave an article of its own in the content tree.
 */
function buildSiteAndClean(directories) {
  rmSync(CONTENT_STORE, { force: true });

  try {
    const build = spawnSync(process.execPath, [ASTRO_BIN, 'build'], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      env: {
        ...process.env,
        ASTRO_TELEMETRY_DISABLED: '1',
        SITE_URL: 'https://blueberrypy.netlify.app',
        BASE_PATH: '/',
      },
    });

    if (build.status !== 0) {
      throw new Error(
        `the site did not build:\n${[build.stdout, build.stderr]
          .filter(Boolean)
          .join('\n')}`,
        { cause: build.error },
      );
    }

    return [build.stdout, build.stderr].filter(Boolean).join('\n');
  } finally {
    for (const directory of directories) {
      rmSync(directory, { recursive: true, force: true });
    }
  }
}

describe('a site with an article whose cover is not there', () => {
  it('builds the site and publishes the article without a cover', () => {
    const folder = path.join(REPO_ROOT, 'content', 'post');
    const written = [];

    const write = (name, frontMatter) => {
      const directory = path.join(folder, name);
      mkdirSync(directory, { recursive: true });
      writeFileSync(
        path.join(directory, 'index.md'),
        `---\n${frontMatter}\n---\n\nThe body of the article.\n`,
        'utf8',
      );
      written.push(directory);
    };

    write(
      PUBLISHED,
      [
        'title: "The published article"',
        'slug: "cover-tolerance-published"',
        'date: 2026-01-02T10:00:00+08:00',
        'description: "An article whose cover is not there."',
        'image: "title.jpg"',
      ].join('\n'),
    );

    write(
      DRAFT,
      [
        'title: "The draft article"',
        'slug: "cover-tolerance-draft"',
        'date: 2026-01-03T10:00:00+08:00',
        'description: "A draft whose cover is not there."',
        'image: "title.jpg"',
        'draft: true',
      ].join('\n'),
    );

    const output = buildSiteAndClean(written);

    assert.match(
      output,
      /names a cover that is not there/,
      'the build says which cover is missing',
    );

    const page = path.join(REPO_ROOT, 'dist', 'post', PUBLISHED, 'index.html');

    assert.ok(existsSync(page), 'the article is published');

    const html = readFileSync(page, 'utf8');

    assert.doesNotMatch(
      html,
      /title\.jpg/,
      'the article is published without the cover it does not have',
    );
    assert.ok(
      !existsSync(path.join(REPO_ROOT, 'dist', 'post', DRAFT, 'index.html')),
      'the draft is not published',
    );
  });
});
