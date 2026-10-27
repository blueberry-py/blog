#!/usr/bin/env node
/**
 * Checks for the routes of the old site that the site answers with a redirect.
 *
 * Hugo served a page of articles at `/post/`, a page of articles per taxonomy
 * and a page of ten articles per list. The Astro site serves every list in
 * full, so the old routes answer with a page that sends the reader to the
 * route that holds the same articles now.
 *
 * The routes the old site served are written down in `legacy-redirects.json`;
 * these checks read them and the redirects the build makes of them.
 *
 * Usage: node --test scripts/legacy-redirects.test.mjs
 */
import assert from 'node:assert/strict';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  legacyRedirects,
  readLegacyRedirects,
  redirectDestination,
} from './legacy-redirects.mjs';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

describe('the routes of the old site', () => {
  it('holds the routes the old site served and the new site does not', () => {
    const redirects = readLegacyRedirects(REPO_ROOT);

    assert.equal(
      redirects['/post/'],
      '/archives/',
      'the list of the articles has no redirect',
    );
    assert.equal(
      redirects['/page/2/'],
      '/',
      'the second page of the home page has no redirect',
    );
    assert.equal(
      redirects['/tags/python/page/2/'],
      '/tags/python/',
      'the second page of a tag has no redirect',
    );
    assert.equal(
      redirects['/categories/python/page/3/'],
      '/categories/python/',
      'the third page of a category has no redirect',
    );
  });

  it('sends every route to a route of the site', () => {
    const redirects = readLegacyRedirects(REPO_ROOT);

    for (const [from, to] of Object.entries(redirects)) {
      assert.match(
        to,
        /^\/$|^\/archives\/$|^\/tags\/$|^\/categories\/$|^\/(tags|categories)\/[^/]+\/$/,
        `the old route ${from} points at ${to}`,
      );
    }
  });

  it('puts the base path of the build in front of every route', () => {
    const redirects = legacyRedirects(REPO_ROOT, '/blog/');

    for (const [from, to] of Object.entries(redirects)) {
      assert.ok(
        to.startsWith('/blog/'),
        `the old route ${from} points at ${to}, outside of the base path`,
      );
    }
  });

  it('keeps the routes of a build for a root host', () => {
    const redirects = legacyRedirects(REPO_ROOT, '/');

    assert.equal(redirects['/post/'], '/archives/');
    assert.equal(redirects['/page/2/'], '/');
  });

  it('points the home page of the old site at the home page of the new site', () => {
    assert.equal(redirectDestination('/', '/'), '/');
    assert.equal(
      redirectDestination('/archives/', '/blog/'),
      '/blog/archives/',
    );
  });
});
