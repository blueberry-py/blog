# BlueberryPy Blog

A personal blog about Python and the tools around it. It is written in
Markdown and built with [Astro](https://astro.build/) into static files; five
hosts publish the same site.

![GitHub Pages status](https://github.com/linzeyang/blog/actions/workflows/deploy.yml/badge.svg)
[![Netlify status](https://api.netlify.com/api/v1/badges/965bb60e-3720-453c-9951-28da16675c0d/deploy-status)](https://app.netlify.com/sites/blueberrypy/deploys)

| Host               | Address                                 |
| ------------------ | --------------------------------------- |
| GitHub Pages       | <https://blueberry-py.github.io/blog/>  |
| Netlify            | <https://blueberrypy.netlify.app/>      |
| Render             | <https://blueberrypy.onrender.com/>     |
| Vercel             | <https://blueberrypy-blog.vercel.app/>  |
| Cloudflare Workers | <https://blog.blueberrypy.workers.dev/> |

## Getting started

You need [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/), nothing
else. The Node.js version is pinned in `.nvmrc` and the pnpm version in the
`packageManager` field of `package.json`, so the versions a clone uses are the
versions the hosts use.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The development server prints the address of the site once it is ready.

### Where things live

- `content/post/` — the articles, one file or one folder each
- `content/about/` — the about page
- `src/` — the layouts, the components, the styles and the helpers of the pages
- `scripts/` — the helpers of the build and the tests
- `public/` — the files that are published as they are

The `public` directory holds the files the site publishes as they are; today
that is the favicon and nothing else. Astro copies the public tree into the
build after it has written the pages, so a page left there would overwrite a
page of the site, and the build stops while the tree holds a `.html` or a `.xml`
file. To add another file, use `git add -f public/<file>`, because the directory
is ignored apart from the favicon.

## Writing an article

An article is a Markdown file of `content/post/`, with YAML front matter: the
title, the description, the date and the slug. The slug is the address of the
article, so an article whose slug is `my-first-hugo-blog` is served at
`/post/my-first-hugo-blog/`. The images an article shows live next to it, the
way they did under Hugo.

An article is a draft until you say it is not. The build publishes the articles
that are not drafts, so an article that carries `draft: false` goes live with
the next build; keep the flag at `true` until the article has been read.

The cover of an article is the image its front matter names, and that image is
a file next to the article. An article that names a cover it does not have is
published without a cover, and the build says which cover is missing.

## Checks and tools

| Command             | What it does                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------- |
| `pnpm format`       | Formats the JavaScript, TypeScript, Astro and Markdown sources with Prettier.                           |
| `pnpm format:check` | Reports the sources that are not formatted, without writing them.                                       |
| `pnpm lint`         | Lints the JavaScript, TypeScript and Astro sources with ESLint and the Markdown with markdownlint-cli2. |
| `pnpm check`        | Runs `astro check`, `pnpm lint` and `pnpm format:check`.                                                |
| `pnpm test`         | Runs the tests of the tooling, of the built site and of the repository.                                 |

The configuration of the tools lives in `.prettierrc.json`, `.prettierignore`,
`eslint.config.js` and `.markdownlint-cli2.yaml`. A commit runs the files it
touches through `lint-staged`, which reads its globs from
`lint-staged.config.js`.

### What the tools do to an article

The prose of the articles is never re-wrapped (`proseWrap: "preserve"`) and the
code blocks of an article are never reformatted, so the words of an article are
the words that were written. The markup of an article is not left alone: when
the tools were added, Prettier changed the markup of ten of the thirty-seven
articles, by aligning their tables, by writing their block quotes and their
rules with its own marks and by spacing their lists from the text above them.
The checks of the built site read the articles as they are written now, so they
follow the change of the markup of an article and not the change of its words.
The Markdown rules the articles do not follow are listed, with the reason, in
`.markdownlint-cli2.yaml`.

### Before a commit

`pnpm install` installs the hooks through the `prepare` script of the
repository, so a fresh clone is gated without another step. Before a commit,
`lint-staged` works on the files of the commit: markdownlint-cli2 fixes the
articles with the rules of `.markdownlint-cli2.yaml`, ESLint fixes the code it
can, and Prettier formats both. A file that was fixed is staged again, so the
commit carries the fixed copy.

Before a push, the whole gate runs:

```sh
pnpm check
pnpm test
```

Those are the commands of CI as well: `.github/workflows/ci.yml` runs them for a
pull request, and the `verify` job of `.github/workflows/deploy.yml` runs them
for a push to `main`, before the site is built. A commit that passes the hooks
and a commit that passes CI have therefore been checked by the same commands.
The hooks can be skipped with `git commit --no-verify`; the CI job cannot, and
it is the gate that decides what is published.

The hooks use the tools the repository already has, not a second toolchain, and
the checks of the `.pre-commit-config.yaml` they replaced still happen: Prettier
owns the trailing whitespace and the final newline, `.gitattributes` owns the
line endings, markdownlint-cli2 owns the rules of the articles (read from one
configuration), and the push protection of GitHub refuses a private key.

### What the tests check

`pnpm test` builds the site and reads the output: every article is served at the
route of its slug, with its title, its date, its images and its words; every
page and every feed points at a file of the output; and every route of the old
site is answered.

### The old URLs

Hugo split every list into pages of ten articles, and served `/post/` as the page
of articles. The new site serves every list in full, so an old route answers
with a page that leads to the route which holds the same articles now: `/post/`
leads to `/archives/`, `/page/2/` to the home page, and `/tags/python/page/2/` to
`/tags/python/`. All of them are written down in
`scripts/legacy-redirects.json`, and the build answers every one of them.

## Deployment

Every host builds the same static output and publishes the `dist` directory. Two
environment variables tell the build where the site lives, and `astro.config.mjs`
reads both of them:

| Variable    | Meaning                                                                |
| ----------- | ---------------------------------------------------------------------- |
| `SITE_URL`  | The canonical URL of the site.                                         |
| `BASE_PATH` | The path the site is served under, `/` on every host but GitHub Pages. |

The canonical URL of the site is `https://blueberrypy.netlify.app` on every host
but GitHub Pages, which serves the project site of the repository under `/blog`.

Both values are pinned by the command that runs the build, so a value another
host left in the shell cannot shape it:

| Command            | Host                                           |
| ------------------ | ---------------------------------------------- |
| `pnpm build:root`  | Netlify, Render, Vercel and Cloudflare Workers |
| `pnpm build:pages` | the project site of GitHub Pages               |

Every host runs the build of its own row. A build that read the two values from
the environment instead would publish a site shaped for another host, whose
links would all answer with a 404.

| Host               | Settings                       | Publish | Build                                                                               |
| ------------------ | ------------------------------ | ------- | ----------------------------------------------------------------------------------- |
| GitHub Pages       | `.github/workflows/deploy.yml` | `dist`  | `withastro/action@v6`, `SITE_URL=https://blueberry-py.github.io`, `BASE_PATH=/blog` |
| Netlify            | `netlify.toml`                 | `dist`  | `pnpm build:root`                                                                   |
| Render             | the dashboard of the site      | `dist`  | `pnpm build:root`                                                                   |
| Vercel             | `vercel.json`                  | `dist`  | `pnpm build:root`                                                                   |
| Cloudflare Workers | `wrangler.toml`                | `dist`  | `pnpm build:root`, published by `pnpm deploy:cloudflare`                            |

The source of the GitHub Pages site has to be set to "GitHub Actions" in the
settings of the repository, otherwise the workflow has no site to deploy to.

### Previewing a deployment

A preview is the output of a build of the site, so it starts with one. Every
host but GitHub Pages serves the site from the root and takes the build for the
root; the project site of GitHub Pages asks for the base path it is served
under:

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

The Worker serves the static output of the site, and the 404 page of the site is
the page of the unknown URLs. The deployment builds the site first:

```sh
pnpm deploy:cloudflare
```

A deployment from the Cloudflare dashboard (Workers Builds) uses the build
command `pnpm build:root` and the deploy command `pnpm deploy:cloudflare`.

Cloudflare builds a preview of every branch with `wrangler preview`, which stops
when the configuration holds no `previews` block. The Worker sets no variables,
no secrets and no bindings, so the block of `wrangler.toml` is empty: the preview
reads the assets and the compatibility settings of the Worker itself.

The Worker can be served locally, against the built output:

```sh
pnpm build:root && pnpm exec wrangler dev
```

## License

The blog is published under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). The text
of the license is in `LICENSE`.
