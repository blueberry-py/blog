#!/usr/bin/env node
/**
 * The guard of the public tree.
 *
 * Astro copies the public tree into the output of the build *after* it has
 * written the pages, so a file that is left in the public tree overwrites the
 * page of the same name. The build of Hugo wrote its pages into `public/`,
 * and those pages would be published next to the pages of Astro.
 *
 * The guard names the files that must not be there — the pages of a site, the
 * files with the extension `.html` or `.xml` — and refuses to build while they
 * are there.
 *
 * Usage: node --test scripts/public-guard.test.mjs
 */
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** The extensions of the files that are the pages of a site. */
const PAGE_EXTENSIONS = ['.html', '.xml'];

/**
 * The pages of the public tree, relative to the root of the tree.
 *
 * @param {string} publicDir The directory of the public tree.
 * @returns {string[]} The pages of the tree, sorted by their path.
 */
export function stalePublicFiles(publicDir) {
  if (!existsSync(publicDir)) {
    return [];
  }

  const found = [];

  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const full = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        walk(full);
        continue;
      }

      if (PAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
        found.push(path.relative(publicDir, full).split(path.sep).join('/'));
      }
    }
  };

  walk(publicDir);

  return found.sort();
}

/**
 * The message that names the pages of the public tree.
 *
 * @param {string[]} stale The pages of the public tree.
 * @returns {string} The message of the refusal.
 */
export function stalePublicMessage(stale) {
  return [
    `The public tree holds ${stale.length} page(s) of another site:`,
    ...stale.map((file) => `  ${file}`),
    '',
    'Astro copies the public tree into the output of the build after it has',
    'written the pages, so these files would overwrite the pages of this',
    'site. Delete them, or move the files the site needs into `src/assets/`.',
  ].join('\n');
}

/**
 * Refuse to build while the public tree holds a page.
 *
 * @param {string} publicDir The directory of the public tree.
 * @throws {Error} When the public tree holds a page.
 */
export function assertNoStalePublicFiles(publicDir) {
  const stale = stalePublicFiles(publicDir);

  if (stale.length === 0) {
    return;
  }

  throw new Error(stalePublicMessage(stale));
}

/**
 * The directory of the public tree, as the configuration of Astro resolved it.
 *
 * @param {object} config The configuration of Astro.
 * @returns {string} The directory of the public tree.
 */
function resolvePublicDir(config) {
  const root =
    config.root instanceof URL
      ? fileURLToPath(config.root)
      : (config.root ?? process.cwd());
  const publicDir = config.publicDir ?? 'public';
  const resolved =
    publicDir instanceof URL ? fileURLToPath(publicDir) : publicDir;

  return path.resolve(root, resolved);
}

/**
 * The integration that guards the public tree.
 *
 * The build stops while the public tree holds a page. The other commands
 * warn: the pages of another site are published by a build, and the server of
 * the development reads the routes of the sources first.
 *
 * @returns {object} The integration of the guard.
 */
export function publicGuard() {
  return {
    name: 'public-guard',
    hooks: {
      'astro:config:setup': ({ config, command, logger }) => {
        const stale = stalePublicFiles(resolvePublicDir(config));

        if (stale.length === 0) {
          return;
        }

        if (command !== 'build') {
          logger.warn(stalePublicMessage(stale));
          return;
        }

        throw new Error(stalePublicMessage(stale));
      },
    },
  };
}
