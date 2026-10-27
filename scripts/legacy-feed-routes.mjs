/**
 * The feeds of the old Hugo site.
 *
 * Hugo served a feed of the articles of the site, a feed of the articles of
 * every tag and of every category and a feed of the terms of every taxonomy.
 * The routes of those feeds are written down in `legacy-feed-routes.json`; this
 * module reads them and turns them into the routes the built site has to serve.
 *
 * The routes that name a term are written with `<term>`, because the terms of
 * the site are the terms its articles name: the feed of a term is served for
 * every term of the taxonomy, not for the terms of an older build.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const FEEDS_PATH = 'scripts/legacy-feed-routes.json';

/**
 * The feeds the old site served, with the route and the kind of each of them.
 *
 * @param {string} rootDir The root of the repository.
 * @returns {object[]} The feeds.
 */
export function readLegacyFeeds(rootDir) {
  const file = path.join(rootDir, FEEDS_PATH);

  if (!existsSync(file)) return [];

  return JSON.parse(readFileSync(file, 'utf8')).feeds;
}

/**
 * The routes of the feeds that name no term.
 *
 * These routes are the same in every build of the site; the routes of the feeds
 * of a term depend on the terms the articles name.
 *
 * @param {string} rootDir The root of the repository.
 * @returns {string[]} The routes of the feeds.
 */
export function legacyFeedRoutes(rootDir) {
  return readLegacyFeeds(rootDir)
    .filter((feed) => !feed.route.includes('<term>'))
    .map((feed) => feed.route);
}

/**
 * The feeds of the old site, with the terms of the site filled in.
 *
 * @param {string} rootDir The root of the repository.
 * @param {Record<string, string[]>} terms The terms of every taxonomy, by slug.
 * @returns {object[]} The feeds, with the route and the page of each of them.
 */
export function expandLegacyFeeds(rootDir, terms) {
  const feeds = [];

  for (const feed of readLegacyFeeds(rootDir)) {
    if (!feed.route.includes('<term>')) {
      feeds.push({ ...feed });
      continue;
    }

    for (const term of terms[feed.taxonomy] ?? []) {
      feeds.push({
        ...feed,
        route: feed.route.replace('<term>', term),
        page: feed.page.replace('<term>', term),
        term,
      });
    }
  }

  return feeds;
}
