# blog

BlueberryPy Blog

![Github Pages Status](https://github.com/linzeyang/blog/actions/workflows/hugo.yaml/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/965bb60e-3720-453c-9951-28da16675c0d/deploy-status)](https://app.netlify.com/sites/blueberrypy/deploys)

The blog posts are synced across the following platforms:

- [Github Pages](https://blueberry-py.github.io/blog/)
- [Netlify](https://blueberrypy.netlify.app/)
- [Render](https://blueberrypy.onrender.com/)
- [Vercel](https://blueberrypy-blog.vercel.app/)

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
