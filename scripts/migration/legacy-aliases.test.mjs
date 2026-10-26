#!/usr/bin/env node
/**
 * Checks for the aliases of the routes of the old Hugo site.
 *
 * Hugo served a page of articles at `/post/`, a page of articles per taxonomy
 * and a page of ten articles per list. The Astro site serves every list in
 * full, so the old routes answer with a page that sends the reader to the
 * route that holds the same articles now.
 *
 * The routes the old site served are written down in `legacy-aliases.json`;
 * these checks read that baseline and the redirects the build makes of it.
 *
 * Usage: node --test scripts/migration/legacy-aliases.test.mjs
 */
import assert from 'node:assert/strict';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  aliasDestination,
  legacyRedirects,
  readLegacyAliases,
} from './legacy-aliases.mjs';

const REPO_ROOT = path.resolve(
  fileURLToPath(new URL('../..', import.meta.url)),
);

describe('the aliases of the routes of the old site', () => {
  it('holds the routes the old site served and the new site does not', () => {
    const aliases = readLegacyAliases(REPO_ROOT);

    assert.equal(
      aliases['/post/'],
      '/archives/',
      'the list of the articles has no alias',
    );
    assert.equal(
      aliases['/page/2/'],
      '/',
      'the second page of the home page has no alias',
    );
    assert.equal(
      aliases['/tags/python/page/2/'],
      '/tags/python/',
      'the second page of a tag has no alias',
    );
    assert.equal(
      aliases['/categories/python/page/3/'],
      '/categories/python/',
      'the third page of a category has no alias',
    );
  });

  it('sends every alias to a route of the site', () => {
    const aliases = readLegacyAliases(REPO_ROOT);

    for (const [from, to] of Object.entries(aliases)) {
      assert.match(
        to,
        /^\/$|^\/archives\/$|^\/tags\/$|^\/categories\/$|^\/(tags|categories)\/[^/]+\/$/,
        `the alias ${from} points at ${to}`,
      );
    }
  });

  it('puts the base path of the build in front of every alias', () => {
    const redirects = legacyRedirects(REPO_ROOT, '/blog/');

    for (const [from, to] of Object.entries(redirects)) {
      assert.ok(
        to.startsWith('/blog/'),
        `the alias ${from} points at ${to}, outside of the base path`,
      );
    }
  });

  it('keeps the aliases of a build for a root host', () => {
    const redirects = legacyRedirects(REPO_ROOT, '/');

    assert.equal(redirects['/post/'], '/archives/');
    assert.equal(redirects['/page/2/'], '/');
  });

  it('points the home page of the old site at the home page of the new site', () => {
    assert.equal(aliasDestination('/', '/'), '/');
    assert.equal(aliasDestination('/archives/', '/blog/'), '/blog/archives/');
  });
});
