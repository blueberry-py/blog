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

The `public` directory holds the files that are published as they are. It holds
the favicon and nothing else: Astro copies the public tree into the output of
the build after it has written the pages, so a page left there would overwrite
the page of the site. The build stops while the public tree holds a `.html` or
a `.xml` file. A file the site needs and that is not the favicon is added with
`git add -f public/<file>`, because the public tree is ignored apart from the
favicon.

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

The prose of the articles is never re-wrapped (`proseWrap: "preserve"`) and the
code blocks of the articles are not reformatted, so the words of an article are
the words that were written. The markup of an article is not left alone: when
the tools were added, Prettier changed the markup of ten of the thirty-eight
articles, by aligning their tables, by writing their block quotes and their
rules with its own marks and by spacing their lists from the text above them.
The baseline of `pnpm verify:content` follows the articles as they are
formatted, so it reports the change of an article and not the change of the
words of an article. The Markdown rules the articles do not follow are listed,
with the reason, in `.markdownlint-cli2.yaml`.

### Before a commit

```sh
pnpm format
pnpm check
pnpm test
```

`pnpm verify:content` checks that every article still exists at the route it
had, with the body and the local images it refers to.

Hugo served a page of articles at `/post/` and a page of ten articles per
list. The site serves every list in full, so the old routes answer with a page
that leads to the route that holds the same articles: `/post/` leads to
`/archives/`, `/page/2/` to the home page and `/tags/python/page/2/` to
`/tags/python/`. The routes are written down in
`scripts/migration/legacy-aliases.json`, and the build answers every one of
them.

## Deployment

Every host builds the same static output and publishes the `dist` directory.
Two environment variables tell the build where the site lives; `astro.config.mjs`
reads them:

| Variable    | Meaning                                                                |
| ----------- | ---------------------------------------------------------------------- |
| `SITE_URL`  | The canonical URL of the site.                                         |
| `BASE_PATH` | The path the site is served under, `/` on every host but GitHub Pages. |

The canonical URL of the site is `https://blueberrypy.netlify.app` on every
host but GitHub Pages, which serves the project site of the repository under
`/blog`.

A build for a host pins those two values, so the values another host left in
the shell cannot shape it:

| Command            | Host                                           |
| ------------------ | ---------------------------------------------- |
| `pnpm build:root`  | Netlify, Render, Vercel and Cloudflare Workers |
| `pnpm build:pages` | the project site of GitHub Pages               |

Every host runs the build of its own row: a build that takes the two values
from the environment would publish a site shaped for another host, and every
link of it would answer with a 404.

| Host               | Settings                       | Publish | Build                                                                               |
| ------------------ | ------------------------------ | ------- | ----------------------------------------------------------------------------------- |
| GitHub Pages       | `.github/workflows/deploy.yml` | `dist`  | `withastro/action@v6`, `SITE_URL=https://blueberry-py.github.io`, `BASE_PATH=/blog` |
| Netlify            | `netlify.toml`                 | `dist`  | `pnpm build:root`                                                                   |
| Render             | the dashboard of the site      | `dist`  | `pnpm build:root`                                                                   |
| Vercel             | `vercel.json`                  | `dist`  | `pnpm build:root`                                                                   |
| Cloudflare Workers | `wrangler.toml`                | `dist`  | `pnpm build:root`, published by `pnpm deploy:cloudflare`                            |

The repository has to be set to "GitHub Actions" as the source of the GitHub
Pages site, otherwise the workflow has no site to deploy to.

### Previewing a deployment

The preview of a host is the output of the build of the site, so a preview
starts with a build. Every host but GitHub Pages serves the site from the root
and uses the build for the root; the project site of GitHub Pages asks for the
base path it is served under:

```sh
pnpm build:root
pnpm build:pages
```

Netlify shows a draft of the site under a temporary URL, and the site that is
live keeps serving the last published deployment until the draft is published:

```sh
pnpm deploy:netlify
```

The site has to be linked to the account of Netlify once, with `netlify link`.

The Worker is previewed locally against the built output, as described in
[Cloudflare Workers](#cloudflare-workers).

### Render

Render reads no configuration file from the repository, so the settings of the
static site are made in its dashboard:

- Build command: `pnpm build:root`
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
command `pnpm build:root` and the deploy command `pnpm deploy:cloudflare`.

The Worker can be served locally, against the built output:

```sh
pnpm build:root && pnpm exec wrangler dev
```
