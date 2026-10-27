import { copyFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { publicGuard } from './scripts/public-guard.mjs';
import { legacyRedirects } from './scripts/legacy-redirects.mjs';

/**
 * The sitemap of the site at the URL the old Hugo site served it at.
 *
 * The sitemap integration writes an index and the sitemap it names. The old
 * site served a single sitemap at `/sitemap.xml`, so the sitemap the index
 * names is copied there: both files hold the same URLs and the list of the
 * routes of the site stays in one place.
 */
function legacySitemap() {
  return {
    name: 'legacy-sitemap',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const output = fileURLToPath(dir);
        const index = path.join(output, 'sitemap-index.xml');

        if (!existsSync(index)) {
          return;
        }

        const named = /<loc>([^<]+)<\/loc>/.exec(
          await readFile(index, 'utf8'),
        )?.[1];
        const file = named?.split('/').pop();

        if (file) {
          await copyFile(
            path.join(output, file),
            path.join(output, 'sitemap.xml'),
          );
        }
      },
    },
  };
}

/**
 * The canonical URL and the base path differ per host: GitHub Pages serves
 * the project site under `/blog`, every other host serves it at the root.
 * Both are read from the environment so one build command can target either.
 */
const site = process.env.SITE_URL ?? 'https://blueberrypy.netlify.app';
const base = process.env.BASE_PATH ?? '/';
const basePath = base.endsWith('/') ? base : `${base}/`;

/** The root of the repository, where the baseline of the aliases lies. */
const repoRoot = path.resolve(fileURLToPath(new URL('.', import.meta.url)));

export default defineConfig({
  site,
  base: basePath,
  output: 'static',
  trailingSlash: 'always',
  // Two posts sharing a slug would serve the same URL: fail the build instead
  // of silently letting one of them win.
  prerenderConflictBehavior: 'error',
  build: {
    format: 'directory',
  },
  integrations: [sitemap(), legacySitemap(), publicGuard()],
  // The routes of the old Hugo site answer with a page that sends the reader
  // to the route that holds the same articles now.
  redirects: legacyRedirects(repoRoot, basePath),
});
