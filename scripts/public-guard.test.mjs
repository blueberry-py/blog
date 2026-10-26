#!/usr/bin/env node
/**
 * Checks of the guard of the public tree.
 *
 * Astro copies the public tree into the output of the build *after* it has
 * written the pages, so a file that is left in the public tree overwrites the
 * page of the same name. The build of Hugo wrote its pages into `public/`,
 * and those pages would be published next to the pages of Astro.
 *
 * The guard names the files that must not be there and refuses to build while
 * they are: these checks prove that it names them and that it stops the build.
 *
 * Usage: node --test scripts/public-guard.test.mjs
 */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { assertNoStalePublicFiles, stalePublicFiles } from './public-guard.mjs';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const ASTRO_BIN = path.join(
  REPO_ROOT,
  'node_modules',
  'astro',
  'bin',
  'astro.mjs',
);
const PUBLIC_DIR = path.join(REPO_ROOT, 'public');

/** The canonical URL of the build of the check. */
const SITE = 'https://blueberrypy.netlify.app';

/**
 * A public tree that holds the pages of another site beside the files a site
 * needs.
 */
function publicTreeWithPages() {
  const directory = mkdtempSync(path.join(tmpdir(), 'public-guard-'));

  mkdirSync(path.join(directory, 'post', 'an-old-post'), { recursive: true });
  writeFileSync(path.join(directory, 'index.html'), '<html></html>');
  writeFileSync(path.join(directory, 'index.xml'), '<rss></rss>');
  writeFileSync(
    path.join(directory, 'post', 'an-old-post', 'index.html'),
    '<html></html>',
  );
  writeFileSync(path.join(directory, 'favicon-32x32.png'), 'not really a png');
  writeFileSync(path.join(directory, 'app.css'), 'body {}');

  return directory;
}

/** A public tree that holds the files a site needs and no page. */
function publicTreeWithAssets() {
  const directory = mkdtempSync(path.join(tmpdir(), 'public-guard-'));

  writeFileSync(path.join(directory, 'favicon-32x32.png'), 'not really a png');
  writeFileSync(path.join(directory, 'app.css'), 'body {}');

  return directory;
}

describe('the guard of the public tree', () => {
  it('names the pages of the public tree', () => {
    const directory = publicTreeWithPages();

    try {
      assert.deepEqual(stalePublicFiles(directory), [
        'index.html',
        'index.xml',
        'post/an-old-post/index.html',
      ]);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('accepts a public tree that holds no page', () => {
    const directory = publicTreeWithAssets();

    try {
      assert.deepEqual(stalePublicFiles(directory), []);
      assert.doesNotThrow(() => assertNoStalePublicFiles(directory));
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('refuses to build while the public tree holds a page', () => {
    const directory = publicTreeWithPages();

    try {
      assert.throws(
        () => assertNoStalePublicFiles(directory),
        (error) => {
          assert.match(error.message, /index\.html/);
          assert.match(error.message, /post\/an-old-post\/index\.html/);
          return true;
        },
      );
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('stops the build of the site while the public tree holds a page', () => {
    // The probe lives in the public tree of the repository, so this check and
    // the checks that read that tree have to run one after the other: the test
    // script of the repository runs them with `--test-concurrency=1`.
    const probe = path.join(PUBLIC_DIR, 'guard-probe.html');
    const output = mkdtempSync(path.join(tmpdir(), 'public-guard-build-'));

    writeFileSync(probe, '<html><body>the output of Hugo</body></html>');

    try {
      const build = spawnSync(
        process.execPath,
        [ASTRO_BIN, 'build', '--outDir', output],
        {
          cwd: REPO_ROOT,
          encoding: 'utf8',
          env: {
            ...process.env,
            ASTRO_TELEMETRY_DISABLED: '1',
            SITE_URL: SITE,
            BASE_PATH: '/',
          },
        },
      );

      const reported = [build.stdout, build.stderr].filter(Boolean).join('\n');

      assert.notEqual(
        build.status,
        0,
        `the build published the page of the public tree:\n${reported}`,
      );
      assert.match(
        reported,
        /guard-probe\.html/,
        'the build did not name the page of the public tree',
      );
    } finally {
      rmSync(probe, { force: true });
      rmSync(output, { recursive: true, force: true });
    }
  });
});
