/**
 * The routes of the old Hugo site that the site answers with a redirect.
 *
 * Hugo served a page of articles at `/post/`, a page of articles per taxonomy
 * and a page of ten articles per list. The Astro site serves every list in
 * full, so the old routes answer with a page that sends the reader to the
 * route that holds the same articles now.
 *
 * The routes the old site served are written down in `legacy-redirects.json`;
 * this module reads them and turns them into the redirects of the build.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const REDIRECTS_PATH = 'scripts/legacy-redirects.json';

/**
 * The routes of the old site and the route each of them leads to.
 *
 * @param {string} rootDir The root of the repository.
 * @returns {Record<string, string>} The old route and the route it leads to.
 */
export function readLegacyRedirects(rootDir) {
  const file = path.join(rootDir, REDIRECTS_PATH);

  if (!existsSync(file)) return {};

  return JSON.parse(readFileSync(file, 'utf8')).aliases;
}

/**
 * The destination of a redirect under the base path of the build.
 *
 * The base path is the directory the site is served from: `/` on the root
 * hosts, `/blog/` on the project site of GitHub Pages. A destination without
 * it would send the reader to a route the site does not serve.
 *
 * @param {string} route The route of the new site.
 * @param {string} base The base path of the build.
 * @returns {string} The destination of the redirect.
 */
export function redirectDestination(route, base) {
  const prefix = base.endsWith('/') ? base : `${base}/`;

  return `${prefix}${route.replace(/^\/+/, '')}`;
}

/**
 * The redirects of the build: every route of the old site and the route it
 * leads to.
 *
 * @param {string} rootDir The root of the repository.
 * @param {string} base The base path of the build.
 * @returns {Record<string, string>} The old route and the destination.
 */
export function legacyRedirects(rootDir, base) {
  const redirects = {};

  for (const [from, to] of Object.entries(readLegacyRedirects(rootDir))) {
    redirects[from] = redirectDestination(to, base);
  }

  return redirects;
}
