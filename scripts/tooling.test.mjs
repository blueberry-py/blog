/**
 * The tooling gate of the repository.
 *
 * The formatter and the linters are only useful when they really cover the
 * sources of the site and when they really fail on a broken file. These tests
 * run the three tools the way `pnpm format:check` and `pnpm lint` do and check
 * both: the sources of the site pass, and a file with a defect does not.
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

const PRETTIER = path.join(REPO_ROOT, 'node_modules/prettier/bin/prettier.cjs');
const ESLINT = path.join(REPO_ROOT, 'node_modules/eslint/bin/eslint.js');
const MARKDOWNLINT = path.join(
  REPO_ROOT,
  'node_modules/markdownlint-cli2/markdownlint-cli2-bin.mjs',
);

/** The directory the broken files are written to; it lives inside the repository so the tools find the configuration. */
const TEMP_DIR = path.join(REPO_ROOT, 'tooling-test-tmp');

/** Run a tool and report its exit code and its output instead of throwing. */
function run(script, args) {
  try {
    const stdout = execFileSync(process.execPath, [script, ...args], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    return { code: 0, output: stdout };
  } catch (error) {
    return {
      code: typeof error.status === 'number' ? error.status : 1,
      output: `${error.stdout ?? ''}${error.stderr ?? ''}`,
    };
  }
}

/** Write a file into the temporary directory of the tests. */
function writeFixture(name, content) {
  mkdirSync(TEMP_DIR, { recursive: true });
  const absolute = path.join(TEMP_DIR, name);
  writeFileSync(absolute, content, 'utf8');

  return path.relative(REPO_ROOT, absolute).split(path.sep).join('/');
}

test.after(() => {
  rmSync(TEMP_DIR, { recursive: true, force: true });
});

test('the formatted sources of the site pass the formatter', () => {
  const result = run(PRETTIER, [
    '--check',
    'astro.config.mjs',
    'eslint.config.js',
    'src/content.config.ts',
    'src/lib/content-schema.ts',
    'scripts/migration/verify-content.mjs',
    'content/post/one-liner-bun.md',
    'content/about/index.md',
    'README.md',
  ]);

  assert.equal(result.code, 0, `prettier reported:\n${result.output}`);
});

test('the formatter reports an Astro file that is not formatted', () => {
  const fixture = writeFixture(
    'Unformatted.astro',
    '---\nconst  answer=42\n---\n<div>{answer}</div>\n',
  );
  const result = run(PRETTIER, ['--check', fixture]);

  assert.notEqual(result.code, 0, 'an unformatted Astro file has to fail');
  assert.match(result.output, /Unformatted\.astro/);
});

test('the sources of the site pass the linter', () => {
  const result = run(ESLINT, [
    'astro.config.mjs',
    'eslint.config.js',
    'src/content.config.ts',
    'src/lib/content-schema.ts',
    'scripts/migration/verify-content.mjs',
  ]);

  assert.equal(result.code, 0, `eslint reported:\n${result.output}`);
});

test('the linter reports an Astro file with a defect', () => {
  const fixture = writeFixture(
    'Broken.astro',
    '---\nconst answer = 42;\ndebugger;\n---\n<div>{answer}</div>\n',
  );
  const result = run(ESLINT, [fixture]);

  assert.notEqual(result.code, 0, 'an Astro file with a defect has to fail');
  assert.match(result.output, /Broken\.astro/);
});

test('the articles pass the Markdown linter', () => {
  const result = run(MARKDOWNLINT, ['content/**/*.md']);

  assert.equal(result.code, 0, `markdownlint reported:\n${result.output}`);
});

test('the Markdown linter reports a file with a defect', () => {
  const fixture = writeFixture(
    'Broken.md',
    '# A heading\n\nText without a final newline.',
  );
  const result = run(MARKDOWNLINT, [fixture]);

  assert.notEqual(result.code, 0, 'a Markdown file with a defect has to fail');
  assert.match(result.output, /Broken\.md/);
});
