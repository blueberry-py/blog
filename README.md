# blog

BlueberryPy Blog

![Github Pages Status](https://github.com/linzeyang/blog/actions/workflows/deploy.yml/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/965bb60e-3720-453c-9951-28da16675c0d/deploy-status)](https://app.netlify.com/sites/blueberrypy/deploys)

The blog posts are synced across the following platforms:

- [GitHub Pages](https://blueberry-py.github.io/blog/)
- [Netlify](https://blueberrypy.netlify.app/)
- [Render](https://blueberrypy.onrender.com/)
- [Vercel](https://blueberrypy-blog.vercel.app/)
- Cloudflare Workers (the `blog` Worker of `wrangler.toml`)

## Development

The site is an [Astro](https://astro.build/) static site that is built with
[pnpm](https://pnpm.io/). The Node.js and the pnpm versions are pinned in
`.nvmrc` and in the `packageManager` field of `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The articles live in `content/post` and `content/about`; they are read through
the content collections of `src/content.config.ts`.

### Formatting and linting

| Command             | What it does                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------- |
| `pnpm format`       | Formats the JavaScript, TypeScript, Astro and Markdown sources with Prettier.                           |
| `pnpm format:check` | Reports the sources that are not formatted, without writing them.                                       |
| `pnpm lint`         | Lints the JavaScript, TypeScript and Astro sources with ESLint and the Markdown with markdownlint-cli2. |
| `pnpm check`        | Runs `astro check`, `pnpm lint` and `pnpm format:check`.                                                |
| `pnpm test`         | Runs the migration tests and the tests of the tooling.                                                  |

The configuration of the tools lives in `.prettierrc.json`, `.prettierignore`,
`eslint.config.js` and `.markdownlint-cli2.yaml`.

The articles keep the shape they were written in: the prose is never re-wrapped
(`proseWrap: "preserve"`) and the code blocks of the articles are not
reformatted. The Markdown rules the articles do not follow are listed, with the
reason, in `.markdownlint-cli2.yaml`.

### Before a commit

```sh
pnpm format
pnpm check
pnpm test
```

`pnpm verify:content` checks that every article still exists at the route it
had, with the body and the local images it refers to.

## Deployment

Every host builds the same static output with `pnpm build` and publishes the
`dist` directory. Two environment variables tell the build where the site
lives; `astro.config.mjs` reads them:

| Variable    | Meaning                                                                |
| ----------- | ---------------------------------------------------------------------- |
| `SITE_URL`  | The canonical URL of the site.                                         |
| `BASE_PATH` | The path the site is served under, `/` on every host but GitHub Pages. |

The canonical URL of the site is `https://blueberrypy.netlify.app` on every
host but GitHub Pages, which serves the project site of the repository under
`/blog`.

| Host               | Settings                       | Publish | Build                                                                               |
| ------------------ | ------------------------------ | ------- | ----------------------------------------------------------------------------------- |
| GitHub Pages       | `.github/workflows/deploy.yml` | `dist`  | `withastro/action@v6`, `SITE_URL=https://blueberry-py.github.io`, `BASE_PATH=/blog` |
| Netlify            | `netlify.toml`                 | `dist`  | `pnpm build`                                                                        |
| Render             | the dashboard of the site      | `dist`  | `pnpm build`                                                                        |
| Vercel             | `vercel.json`                  | `dist`  | `pnpm build`                                                                        |
| Cloudflare Workers | `wrangler.toml`                | `dist`  | `pnpm build`, published by `pnpm deploy:cloudflare`                                 |

The repository has to be set to "GitHub Actions" as the source of the GitHub
Pages site, otherwise the workflow has no site to deploy to.

### Render

Render reads no configuration file from the repository, so the settings of the
static site are made in its dashboard:

- Build command: `pnpm build`
- Publish path: `dist`
- Environment: `TZ=Asia/Shanghai`; `SITE_URL` is not needed, because the
  canonical URL of the site is the one of the default build.

### Cloudflare Workers

The Worker serves the static output of the site, with the 404 page of the site
as the page of the unknown URLs. The deployment builds the site first:

```sh
pnpm deploy:cloudflare
```

A deployment from the Cloudflare dashboard (Workers Builds) uses the build
command `pnpm build` and the deploy command `pnpm deploy:cloudflare`.

The Worker can be served locally, against the built output:

```sh
pnpm build && pnpm exec wrangler dev
```
