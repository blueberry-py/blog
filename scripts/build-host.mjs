#!/usr/bin/env node
/**
 * The build of the site for a host.
 *
 * The canonical URL of the site and the base path it is served under differ
 * per host, and the build reads them from the environment. A shell that holds
 * the values of another host — a `BASE_PATH` left over from a build for the
 * project site of GitHub Pages, for instance — would publish a site shaped
 * for that host, and every link of it would answer with a 404.
 *
 * This script pins the values of the host it is given and runs the build, so
 * a deployment cannot pick up the values of the shell it runs in.
 *
 * Usage: node scripts/build-host.mjs <host> [arguments of astro build]
 */
import { spawnSync } from 'node:child_process';
import { realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const ASTRO_BIN = path.join(
  REPO_ROOT,
  'node_modules',
  'astro',
  'bin',
  'astro.mjs',
);

/**
 * The shape of the site per host: the canonical URL of the site and the path
 * it is served under.
 *
 * The root hosts serve the site from the root of their domain; the project
 * site of GitHub Pages serves it under `/blog`.
 */
export const HOSTS = {
  root: { SITE_URL: 'https://blueberrypy.netlify.app', BASE_PATH: '/' },
  pages: { SITE_URL: 'https://blueberry-py.github.io', BASE_PATH: '/blog' },
};

/**
 * The values of the environment that shape the site of a host.
 *
 * @param {string} host The host to build for.
 * @returns {{SITE_URL: string, BASE_PATH: string}} The values of the host.
 */
export function hostEnvironment(host) {
  const shape = HOSTS[host];

  if (!shape) {
    throw new Error(
      `unknown host ${host}: expected one of ${Object.keys(HOSTS).join(', ')}`,
    );
  }

  return { ...shape };
}

/**
 * Build the site for a host.
 *
 * @param {string} host The host to build for.
 * @param {string[]} arguments_ The arguments of the build of Astro.
 * @returns {number} The exit code of the build.
 */
export function buildSite(host, arguments_ = []) {
  const build = spawnSync(
    process.execPath,
    [ASTRO_BIN, 'build', ...arguments_],
    {
      cwd: REPO_ROOT,
      stdio: 'inherit',
      env: { ...process.env, ...hostEnvironment(host) },
    },
  );

  return build.status ?? 1;
}

// The script builds the site when it is run, and only offers the values of
// the hosts when it is imported.
const invoked =
  process.argv[1] && pathToFileURL(realpathSync(process.argv[1])).href;

if (invoked === import.meta.url) {
  const [host, ...arguments_] = process.argv.slice(2);

  if (!host) {
    console.error(
      'usage: node scripts/build-host.mjs <host> [arguments of astro build]',
      `hosts: ${Object.keys(HOSTS).join(', ')}`,
    );
    process.exit(1);
  }

  process.exit(buildSite(host, arguments_));
}
