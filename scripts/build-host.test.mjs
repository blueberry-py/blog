#!/usr/bin/env node
/**
 * Checks of the build of the site for a host.
 *
 * The canonical URL of the site and the base path it is served under differ
 * per host, and the build reads them from the environment. A shell that holds
 * the values of another host — a `BASE_PATH` left over from a build for the
 * project site of GitHub Pages, for instance — would publish a site shaped
 * for that host, and every link of it would answer with a 404.
 *
 * These checks prove that the build of a host pins the values of that host,
 * whatever the environment of the shell holds.
 *
 * Usage: node --test scripts/build-host.test.mjs
 */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { hostEnvironment } from './build-host.mjs';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const BUILD_SCRIPT = path.join(REPO_ROOT, 'scripts', 'build-host.mjs');

/**
 * The values the environment of a shell holds when it was used for another
 * host: the build has to ignore them.
 */
const LEAKED = {
  SITE_URL: 'https://blueberry-py.github.io',
  BASE_PATH: '/blog',
};

/**
 * The build of the site for a host, in a directory of its own.
 *
 * @param {string} host The host to build for.
 * @returns {{output: string, build: object}} The directory of the build and
 *   the result of the build.
 */
function buildFor(host) {
  const output = mkdtempSync(path.join(tmpdir(), 'build-host-'));
  const build = spawnSync(
    process.execPath,
    [BUILD_SCRIPT, host, '--outDir', output],
    {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      env: {
        ...process.env,
        ...LEAKED,
        ASTRO_TELEMETRY_DISABLED: '1',
      },
    },
  );

  return { output, build };
}

/** The home page of a built site. */
function homePage(output) {
  return readFileSync(path.join(output, 'index.html'), 'utf8');
}

describe('the build of the site for a host', () => {
  it('names the shape of every host', () => {
    assert.deepEqual(hostEnvironment('root'), {
      SITE_URL: 'https://blueberrypy.netlify.app',
      BASE_PATH: '/',
    });
    assert.deepEqual(hostEnvironment('pages'), {
      SITE_URL: 'https://blueberry-py.github.io',
      BASE_PATH: '/blog',
    });
  });

  it('refuses a host it does not know', () => {
    assert.throws(() => hostEnvironment('nowhere'), /nowhere/);
  });

  it('builds the site for a root host whatever the shell holds', () => {
    const { output, build } = buildFor('root');

    try {
      assert.equal(
        build.status,
        0,
        `the site did not build:\n${build.stdout}\n${build.stderr}`,
      );

      const page = homePage(output);

      assert.match(
        page,
        /<link rel="canonical" href="https:\/\/blueberrypy\.netlify\.app\/">/,
        'the site is not canonical at the URL of the root host',
      );
      assert.doesNotMatch(
        page,
        /href="\/blog\//,
        'the site is served under the base path of another host',
      );
    } finally {
      rmSync(output, { recursive: true, force: true });
    }
  });

  it('builds the site for the project site of GitHub Pages', () => {
    const { output, build } = buildFor('pages');

    try {
      assert.equal(
        build.status,
        0,
        `the site did not build:\n${build.stdout}\n${build.stderr}`,
      );

      const page = homePage(output);

      assert.match(
        page,
        /<link rel="canonical" href="https:\/\/blueberry-py\.github\.io\/blog\/">/,
        'the site is not canonical at the URL of the project site',
      );
      assert.match(
        page,
        /href="\/blog\/tags\/"/,
        'the site is not served under the base path of the project site',
      );
    } finally {
      rmSync(output, { recursive: true, force: true });
    }
  });
});
