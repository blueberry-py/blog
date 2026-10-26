#!/usr/bin/env node
/**
 * Checks for the deployment configuration of the five hosts.
 *
 * The site is published to GitHub Pages, Netlify, Render, Vercel and Cloudflare
 * Workers. Every host builds the same static output with pnpm, but each of them
 * needs its own settings: the URL the site is canonical at, the directory the
 * host publishes, and the toolchain the build uses. These checks read the
 * settings of the hosts, so a host that would build the Hugo site, or publish
 * the wrong directory, fails here instead of in the middle of a deployment.
 *
 * Usage: node --test scripts/deployment.test.mjs
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { parse as parseToml } from 'smol-toml';
import YAML from 'yaml';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

/** The text of a file of the repository. */
function read(...parts) {
  return readFileSync(path.join(REPO_ROOT, ...parts), 'utf8');
}

/** The parsed YAML of a file of the repository. */
function readYaml(...parts) {
  return YAML.parse(read(...parts));
}

/** The parsed TOML of a file of the repository. */
function readToml(...parts) {
  return parseToml(read(...parts));
}

/** The parsed JSON of a file of the repository. */
function readJson(...parts) {
  return JSON.parse(read(...parts));
}

/** The `uses` of every step of every job of a workflow. */
function usedActions(workflow) {
  return Object.values(workflow.jobs ?? {}).flatMap((job) =>
    (job.steps ?? []).map((step) => step.uses),
  );
}

/** The environment of a workflow: the one of the workflow, of the jobs and of the steps. */
function environments(workflow) {
  const found = [];

  for (const job of Object.values(workflow.jobs ?? {})) {
    if (job.env) found.push(job.env);

    for (const step of job.steps ?? []) {
      if (step.env) found.push(step.env);
    }
  }

  return found;
}

/** The workflow of the GitHub Pages deployment. */
function workflow() {
  return readYaml('.github/workflows/deploy.yml');
}

/** The settings of the Netlify deployment. */
function netlify() {
  return readToml('netlify.toml');
}

/** The settings of the Cloudflare Workers deployment. */
function wrangler() {
  return readToml('wrangler.toml');
}

describe('the deployment to GitHub Pages', () => {
  it('builds the site with the Astro action', () => {
    assert.ok(
      usedActions(workflow()).includes('withastro/action@v6'),
      'the workflow does not use withastro/action@v6',
    );
  });

  it('builds the site with the version of Node the project pins', () => {
    const build = Object.values(workflow().jobs ?? {}).find((job) =>
      (job.steps ?? []).some((step) => step.uses === 'withastro/action@v6'),
    );
    const step = build?.steps.find(
      (candidate) => candidate.uses === 'withastro/action@v6',
    );

    assert.equal(
      step?.with?.['node-version'],
      '24.22.1',
      'the action does not build with Node 24.22.1',
    );
  });

  it('builds the site with pnpm', () => {
    const text = read('.github/workflows/deploy.yml');

    assert.match(text, /pnpm/, 'the workflow does not use pnpm');
    assert.doesNotMatch(
      text,
      /\bnpm (ci|install)\b|\byarn\b/,
      'the workflow installs the dependencies with another package manager',
    );
  });

  it('builds the site for the project URL of the repository', () => {
    const found = environments(workflow()).flatMap((environment) =>
      Object.entries(environment),
    );

    assert.ok(
      found.some(
        ([name, value]) =>
          name === 'SITE_URL' && value === 'https://blueberry-py.github.io',
      ),
      'the workflow does not build the site for https://blueberry-py.github.io',
    );
    assert.ok(
      found.some(([name, value]) => name === 'BASE_PATH' && value === '/blog'),
      'the workflow does not build the site under /blog',
    );
  });

  it('gives the workflow the permissions of a Pages deployment', () => {
    const permissions = workflow().permissions ?? {};

    assert.equal(permissions.contents, 'read');
    assert.equal(permissions.pages, 'write');
    assert.equal(permissions['id-token'], 'write');
  });

  it('deploys the built site to GitHub Pages', () => {
    assert.ok(
      usedActions(workflow()).includes('actions/deploy-pages@v5'),
      'the workflow does not deploy the site to GitHub Pages',
    );
  });

  it('installs no Hugo toolchain', () => {
    const text = read('.github/workflows/deploy.yml');

    assert.doesNotMatch(
      text,
      /hugo|gohugo|setup-go|dart-sass/i,
      'the workflow still installs Hugo, Go or Dart Sass',
    );
  });
});

describe('the deployment to Netlify', () => {
  it('publishes the static output of the site', () => {
    assert.equal(netlify().build?.publish, 'dist');
  });

  it('builds the site for the root of the host', () => {
    assert.equal(
      netlify().build?.command,
      'pnpm build:root',
      'the build of Netlify takes the shape of the site from the environment',
    );
  });

  it('pins the version of Node and the timezone of the site', () => {
    const environment = netlify().build?.environment ?? {};

    assert.equal(environment.NODE_VERSION, '24.22.1');
    assert.equal(environment.TZ, 'Asia/Shanghai');
  });

  it('installs no Hugo toolchain', () => {
    const environment = netlify().build?.environment ?? {};

    for (const name of ['HUGO_VERSION', 'GO_VERSION', 'DART_SASS_VERSION']) {
      assert.equal(
        environment[name],
        undefined,
        `the build still installs ${name}`,
      );
    }
  });
});

describe('the deployment to Cloudflare Workers', () => {
  it('serves the static output of the site', () => {
    assert.equal(wrangler().assets?.directory, './dist');
  });

  it('serves the 404 page of the site', () => {
    assert.equal(wrangler().assets?.not_found_handling, '404-page');
  });

  it('builds the site without a shell script', () => {
    const text = read('wrangler.toml');

    assert.doesNotMatch(
      text,
      /build\.sh/,
      'the build still runs a shell script',
    );
  });
});

describe('the deployment to Vercel', () => {
  it('builds the site for the root of the host', () => {
    const vercel = readJson('vercel.json');

    assert.equal(
      vercel.buildCommand,
      'pnpm build:root',
      'the build of Vercel takes the shape of the site from the environment',
    );
    assert.equal(vercel.outputDirectory, 'dist');
  });

  it('has no Hugo-specific build command', () => {
    const text = read('vercel.json');

    assert.doesNotMatch(text, /hugo|build\.sh/i);
  });
});

describe('the deployment the README documents', () => {
  it('tells every host to build the site for the root of its domain', () => {
    const readme = read('README.md');

    assert.doesNotMatch(
      readme,
      /`pnpm build`/,
      'the README tells a host to build the site with the plain build',
    );
    assert.match(
      readme,
      /Build command: `pnpm build:root`/,
      'the README does not tell Render to build the site for its host',
    );
    assert.match(
      readme,
      /build\s+command `pnpm build:root`/,
      'the README does not tell the dashboard of Cloudflare to build the site for its host',
    );
  });

  it('tells the reader how the Worker is served locally', () => {
    const readme = read('README.md');

    assert.match(
      readme,
      /pnpm build:root && pnpm exec wrangler dev/,
      'the README does not serve the Worker from a build for its host',
    );
  });
});

describe('the build of the site for a host', () => {
  it('builds the site for the root of a domain', () => {
    const scripts = readJson('package.json').scripts ?? {};

    assert.match(
      scripts['build:root'] ?? '',
      /build-host\.mjs root/,
      'the build for a root host is not there',
    );
  });

  it('builds the site for the project site of GitHub Pages', () => {
    const scripts = readJson('package.json').scripts ?? {};

    assert.match(
      scripts['build:pages'] ?? '',
      /build-host\.mjs pages/,
      'the build for the project site is not there',
    );
  });

  it('builds the site of a deployment for its host', () => {
    const scripts = readJson('package.json').scripts ?? {};

    assert.match(
      scripts['deploy:cloudflare'] ?? '',
      /build:root/,
      'the deployment to Cloudflare Workers does not build the site for its host',
    );
    assert.match(
      scripts['deploy:netlify'] ?? '',
      /build:root/,
      'the deployment to Netlify does not build the site for its host',
    );
  });
});

describe('the deployment of the site', () => {
  it('has no Hugo workflow', () => {
    assert.equal(
      existsSync(path.join(REPO_ROOT, '.github/workflows/hugo.yaml')),
      false,
      'the workflow of the Hugo site is still there',
    );
  });

  it('deploys the site to Cloudflare Workers with Wrangler', () => {
    const scripts = readJson('package.json').scripts ?? {};

    assert.match(scripts['deploy:cloudflare'] ?? '', /build/);
    assert.match(scripts['deploy:cloudflare'] ?? '', /wrangler\s+deploy/);
  });

  it('has Wrangler as a development dependency', () => {
    const dependencies = readJson('package.json').devDependencies ?? {};

    assert.ok(
      dependencies.wrangler,
      'wrangler is not a development dependency',
    );
  });

  it('has no server adapter, because the site is static', () => {
    const packageJson = readJson('package.json');
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    assert.equal(dependencies['@astrojs/cloudflare'], undefined);
  });
});
