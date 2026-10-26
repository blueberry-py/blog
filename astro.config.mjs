import { defineConfig } from 'astro/config';

/**
 * The canonical URL and the base path differ per host: GitHub Pages serves
 * the project site under `/blog`, every other host serves it at the root.
 * Both are read from the environment so one build command can target either.
 */
const site = process.env.SITE_URL ?? 'https://blueberrypy.netlify.app';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base: base.endsWith('/') ? base : `${base}/`,
  output: 'static',
  trailingSlash: 'always',
  // Two posts sharing a slug would serve the same URL: fail the build instead
  // of silently letting one of them win.
  prerenderConflictBehavior: 'error',
  build: {
    format: 'directory',
  },
});
