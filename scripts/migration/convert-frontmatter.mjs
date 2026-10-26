#!/usr/bin/env node
/**
 * Convert the Hugo TOML front matter of the blog to the YAML front matter
 * Astro reads.
 *
 * The conversion is deliberately narrow: the TOML block is parsed, its values
 * are serialized as YAML, and the Markdown body is carried over untouched. A
 * file whose front matter cannot be parsed is never overwritten.
 *
 * Usage:
 *   node scripts/migration/convert-frontmatter.mjs --check   report what would change
 *   node scripts/migration/convert-frontmatter.mjs           convert the inventoried files
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parse as parseToml, TomlDate } from 'smol-toml';
import { stringify as stringifyYaml } from 'yaml';

import { deriveSlug, splitFrontMatter } from './verify-content.mjs';

const REPO_ROOT = path.resolve(
  fileURLToPath(new URL('../..', import.meta.url)),
);
const MANIFEST_PATH = 'scripts/migration/legacy-routes.json';

/**
 * Render a TOML date the way it was written.
 *
 * `TomlDate.toISOString()` keeps the UTC offset but adds milliseconds the
 * original literal did not have, so the zero fraction is dropped again.
 */
export function formatTomlDate(date) {
  return date.toISOString().replace(/\.000(?=(?:Z|[+-]\d{2}:\d{2})?$)/, '');
}

/** Replace every TOML date with its original literal form. */
function normalizeDates(value) {
  if (value instanceof TomlDate) return formatTomlDate(value);

  if (Array.isArray(value)) return value.map(normalizeDates);

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, normalizeDates(item)]),
    );
  }

  return value;
}

/**
 * Convert the front matter of one Markdown file.
 *
 * Returns the new content and whether it differs from the old. A file that
 * already has YAML front matter, or none at all, is returned unchanged.
 */
export function convertContent(raw, options = {}) {
  const { frontMatter, body, delimiter, unterminated } = splitFrontMatter(raw);

  if (unterminated) {
    throw new Error('cannot parse the front matter: the block is never closed');
  }

  if (!delimiter || delimiter !== '+++') {
    return { output: raw, changed: false };
  }

  let parsed;
  try {
    // The front matter is rewritten anyway, so its carriage returns are
    // dropped before parsing; the body keeps the line endings it has.
    const tomlText = frontMatter
      .split('\n')
      .map((line) => line.replace(/\r$/, ''))
      .join('\n');

    parsed = parseToml(tomlText);
  } catch (error) {
    throw new Error(`cannot parse the TOML front matter: ${error.message}`, {
      cause: error,
    });
  }

  const data = normalizeDates(parsed);

  // Hugo derives the URL of a page without a slug from its path, so the
  // migrated front matter carries the same identity.
  if (!data.slug && options.sourcePath) {
    data.slug = deriveSlug(options.sourcePath, {});
  }

  // Keep the line endings the file already uses, so converting a file does
  // not turn it into a mixed-line-ending file.
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const front = `---\n${stringifyYaml(data, { lineWidth: 0 })}---\n`.replace(
    /\n/g,
    eol,
  );
  const output = `${front}${body}`;

  return { output, changed: output !== raw };
}

/**
 * Convert one file on disk.
 *
 * In write mode the file is rewritten; in check mode the file is only read
 * and the would-be content is returned.
 */
export function convertFile(rootDir, sourcePath, options = {}) {
  const absolute = path.join(rootDir, sourcePath);
  const raw = readFileSync(absolute, 'utf8');

  let result;
  try {
    result = convertContent(raw, { sourcePath });
  } catch (error) {
    throw new Error(`${sourcePath}: ${error.message}`, { cause: error });
  }

  if (options.write && result.changed) {
    writeFileSync(absolute, result.output, 'utf8');
  }

  return { source: sourcePath, changed: result.changed, output: result.output };
}

/** The content files the migration owns, as recorded by the baseline manifest. */
export function listInventoriedFiles(rootDir = REPO_ROOT) {
  const manifest = JSON.parse(
    readFileSync(path.join(rootDir, MANIFEST_PATH), 'utf8'),
  );

  return manifest.entries.map((entry) => entry.source);
}

function main(argv) {
  const check = argv.includes('--check');
  const rootDir = REPO_ROOT;
  const sources = listInventoriedFiles(rootDir);
  const changed = [];

  for (const sourcePath of sources) {
    const result = convertFile(rootDir, sourcePath, { write: !check });
    if (result.changed) changed.push(sourcePath);
  }

  if (check) {
    for (const sourcePath of changed) {
      console.log(`${sourcePath}: front matter would be converted to YAML`);
    }
    console.log(`${changed.length} of ${sources.length} files would change`);
    return changed.length === 0 ? 0 : 1;
  }

  console.log(
    `converted ${changed.length} of ${sources.length} files to YAML front matter`,
  );

  return 0;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    process.exit(main(process.argv.slice(2)));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
