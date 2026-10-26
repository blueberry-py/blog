#!/usr/bin/env node
/**
 * Checks that the repository carries no Hugo or theme coupling any more.
 *
 * The site is built by Astro and published with pnpm, so the configuration of
 * Hugo, the theme submodules and the asset directories of Hugo have no reason
 * to exist. These checks read the tree of the repository: a file of Hugo that
 * comes back, or a source that still points at one of the removed paths, fails
 * here instead of in a build.
 *
 * Usage: node --test scripts/repository.test.mjs
 */
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

/** The directories of the repository that hold the sources of the site. */
const SOURCE_DIRECTORIES = ['.github', 'src'];

/**
 * The files of the repository that describe the site and configure its build.
 *
 * The articles are left alone: they are the writing of the author, and the
 * scripts of the repository are left alone too: they name Hugo only to prove
 * that it is gone.
 */
const CONFIGURATION_FILES = [
  '.gitignore',
  '.markdownlint-cli2.yaml',
  '.pre-commit-config.yaml',
  '.prettierignore',
  '.prettierrc.json',
  'README.md',
  'astro.config.mjs',
  'eslint.config.js',
  'netlify.toml',
  'package.json',
  'vercel.json',
  'wrangler.toml',
];

/**
 * The paths of Hugo and of its themes that nothing of the site may name.
 *
 * The prose of a source may still say that the site used to be a Hugo site;
 * what may not come back is a path the build would read.
 */
const HUGO_PATHS =
  /hugo\.toml|build\.sh|hugo-coder|hugo-theme-stack|archetypes\/|resources\/_gen|\.gitmodules|HUGO_VERSION|gohugo|themes\//i;

/** The text of a file of the repository. */
function read(...parts) {
  return readFileSync(path.join(REPO_ROOT, ...parts), 'utf8');
}

/** The path of a file, relative to the root of the repository. */
function relative(file) {
  return path.relative(REPO_ROOT, file).split(path.sep).join('/');
}

/** Every file under a directory. */
function filesUnder(directory) {
  const found = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      found.push(...filesUnder(full));
      continue;
    }

    found.push(full);
  }

  return found;
}

/** The files of the repository that hold the site and its configuration. */
function siteSources() {
  const files = CONFIGURATION_FILES.map((file) => path.join(REPO_ROOT, file));

  for (const directory of SOURCE_DIRECTORIES) {
    files.push(...filesUnder(path.join(REPO_ROOT, directory)));
  }

  return files;
}

/** The patterns of an ignore file, without its comments. */
function patterns(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '' && !line.startsWith('#'));
}

/** Whether an ignore file ignores a directory of the repository. */
function ignores(text, name) {
  return patterns(text).some(
    (pattern) => pattern.replace(/^\//, '').replace(/\/$/, '') === name,
  );
}

describe('the repository carries no Hugo configuration', () => {
  it('has no Hugo build script', () => {
    assert.equal(
      existsSync(path.join(REPO_ROOT, 'build.sh')),
      false,
      'the build script of Hugo is still there',
    );
  });

  it('has no Hugo configuration', () => {
    assert.equal(
      existsSync(path.join(REPO_ROOT, 'hugo.toml')),
      false,
      'the configuration of Hugo is still there',
    );
    assert.equal(
      existsSync(path.join(REPO_ROOT, 'config')),
      false,
      'the configuration directory of Hugo is still there',
    );
  });

  it('has no content archetype', () => {
    assert.equal(
      existsSync(path.join(REPO_ROOT, 'archetypes')),
      false,
      'the archetype of Hugo is still there',
    );
  });

  it('has no submodule configuration', () => {
    assert.equal(
      existsSync(path.join(REPO_ROOT, '.gitmodules')),
      false,
      'the submodules of the themes are still configured',
    );
  });

  it('has no theme submodules', () => {
    assert.equal(
      existsSync(path.join(REPO_ROOT, 'themes')),
      false,
      'the themes of Hugo are still there',
    );
  });
});

describe('the assets of the site live in the tree of Astro', () => {
  it('keeps the avatar in the assets of Astro', () => {
    assert.ok(
      existsSync(path.join(REPO_ROOT, 'src/assets/avatar.jpg')),
      'the avatar is not in src/assets',
    );
    assert.equal(
      existsSync(path.join(REPO_ROOT, 'assets')),
      false,
      'the asset directory of Hugo is still there',
    );
  });

  it('imports the avatar from the assets of Astro', () => {
    const header = read('src/components/SiteHeader.astro');

    assert.match(header, /from '\.\.\/assets\/avatar\.jpg'/);
    assert.doesNotMatch(
      header,
      /\.\.\/\.\.\/assets\//,
      'the avatar is still imported from the asset directory of Hugo',
    );
  });

  it('keeps the favicon in the public tree of Astro', () => {
    assert.ok(
      existsSync(path.join(REPO_ROOT, 'public/favicon-32x32.png')),
      'the favicon is not in public',
    );
    assert.equal(
      existsSync(path.join(REPO_ROOT, 'static')),
      false,
      'the static directory of Hugo is still there',
    );
  });

  it('keeps the public tree free of the output of Hugo', () => {
    const generated = filesUnder(path.join(REPO_ROOT, 'public')).filter(
      (file) => ['.html', '.xml'].includes(path.extname(file)),
    );

    assert.deepEqual(
      generated.map(relative),
      [],
      'the public tree holds the output of Hugo',
    );
  });
});

describe('the ignore files of the repository', () => {
  it('ignores the dependencies and the output of the build', () => {
    const gitignore = read('.gitignore');

    for (const name of ['node_modules', '.astro', 'dist', '.wrangler']) {
      assert.ok(
        ignores(gitignore, name),
        `the .gitignore does not ignore ${name}`,
      );
    }
  });

  it('ignores the state of the deploy tools', () => {
    const gitignore = read('.gitignore');
    const prettierignore = read('.prettierignore');
    const markdownlint = read('.markdownlint-cli2.yaml');
    const eslint = read('eslint.config.js');

    assert.ok(
      ignores(gitignore, '.netlify'),
      'the .gitignore does not ignore the state of the Netlify CLI',
    );
    assert.ok(
      ignores(prettierignore, '.netlify'),
      'the .prettierignore does not ignore the state of the Netlify CLI',
    );
    assert.match(
      markdownlint,
      /\.netlify\/\*\*/,
      'the Markdown linter does not ignore the state of the Netlify CLI',
    );
    assert.match(
      eslint,
      /'\.netlify\/'/,
      'the linter does not ignore the state of the Netlify CLI',
    );
  });

  it('ignores no output of Hugo', () => {
    assert.doesNotMatch(
      read('.gitignore'),
      /hugo|resources\/_gen/i,
      'the .gitignore still ignores the output of Hugo',
    );
  });

  it('ignores the public tree but keeps the favicon', () => {
    const gitignore = read('.gitignore');

    assert.match(
      gitignore,
      /^\/public\/\*$/m,
      'the .gitignore does not ignore the public tree',
    );
    assert.match(
      gitignore,
      /^!\/public\/favicon-32x32\.png$/m,
      'the .gitignore does not keep the favicon of the public tree',
    );
  });

  it('ignores no theme in the formatter and in the Markdown linter', () => {
    for (const file of ['.prettierignore', '.markdownlint-cli2.yaml']) {
      assert.doesNotMatch(
        read(file),
        /themes\/|resources\/|archetypes\//,
        `${file} still ignores a directory of Hugo`,
      );
    }
  });
});

describe('the line endings of the repository', () => {
  it('pins the line endings of the files of the repository', () => {
    assert.ok(
      existsSync(path.join(REPO_ROOT, '.gitattributes')),
      'the repository has no .gitattributes',
    );

    assert.match(
      read('.gitattributes'),
      /^\* text=auto eol=lf$/m,
      'the line endings of the files are not pinned',
    );
  });

  it('tells the formatter which line endings it writes', () => {
    const prettier = JSON.parse(read('.prettierrc.json'));

    assert.equal(
      prettier.endOfLine,
      'lf',
      'the formatter is not told which line endings it writes',
    );
  });
});

describe('the sources of the site', () => {
  it('name no path of Hugo', () => {
    const found = siteSources().filter((file) =>
      HUGO_PATHS.test(readFileSync(file, 'utf8')),
    );

    assert.deepEqual(
      found.map(relative),
      [],
      'the sources of the site still name a path of Hugo',
    );
  });
});

describe('the README of the repository', () => {
  it('documents the commands of Astro and of pnpm', () => {
    const readme = read('README.md');

    for (const command of [
      'pnpm install --frozen-lockfile',
      'pnpm dev',
      'pnpm build:root',
      'pnpm check',
    ]) {
      assert.ok(
        readme.includes(command),
        `the README does not document ${command}`,
      );
    }
  });

  it('documents how a deployment is previewed', () => {
    const readme = read('README.md');

    for (const command of [
      'pnpm build:root',
      'pnpm build:pages',
      'pnpm deploy:netlify',
    ]) {
      assert.ok(
        readme.includes(command),
        `the README does not document ${command}`,
      );
    }
  });

  it('documents the rule of the public tree', () => {
    const readme = read('README.md');

    assert.match(
      readme,
      /`public`/,
      'the README does not name the public tree',
    );
    assert.match(
      readme,
      /favicon/,
      'the README does not say what the public tree holds',
    );
  });

  it('badges the workflow of the deployment', () => {
    const readme = read('README.md');

    assert.match(readme, /actions\/workflows\/deploy\.yml\/badge\.svg/);
    assert.doesNotMatch(readme, /hugo\.yaml/);
  });

  it('lists the five hosts of the site', () => {
    const readme = read('README.md');

    for (const host of [
      /GitHub Pages/i,
      /Netlify/i,
      /Render/i,
      /Vercel/i,
      /Cloudflare Workers/i,
    ]) {
      assert.match(readme, host, `the README does not mention ${host}`);
    }
  });

  it('documents the base path of GitHub Pages', () => {
    assert.match(read('README.md'), /`\/blog`/);
  });

  it('documents the deployment to Cloudflare Workers', () => {
    assert.match(read('README.md'), /pnpm deploy:cloudflare/);
  });

  it('tells what the formatter does to the articles', () => {
    const readme = read('README.md');

    assert.doesNotMatch(
      readme,
      /The articles keep the shape they were written in/,
      'the README still says that the articles keep the shape they were written in',
    );
    assert.match(
      readme,
      /changed the markup of ten of the thirty-eight\s+articles/,
      'the README does not say that the formatter changed the markup of ten articles',
    );
    assert.match(
      readme,
      /baseline of `pnpm verify:content`/,
      'the README does not say what the baseline of the verification follows',
    );
  });

  it('tells how the articles outside the baseline are reconciled', () => {
    const readme = read('README.md');

    assert.match(
      readme,
      /pnpm convert:frontmatter -- --path/,
      'the README does not tell how an article outside the baseline is converted',
    );
    assert.match(
      readme,
      /`draft: false`/,
      'the README does not tell that an article that is not a draft is published',
    );
  });
});
