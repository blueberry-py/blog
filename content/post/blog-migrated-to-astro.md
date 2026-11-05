---
title: This Blog Moved to Astro
description: What the move from Hugo to Astro actually took, and everything the plan left uncovered.
slug: blog-migrated-to-astro
date: 2026-11-05T10:55:00+08:00
authors:
  - Zeyang Lin
tags:
  - blog
  - astro
  - hugo
  - web
categories:
  - blog
series:
  - blog migration
keywords:
  - Astro
  - Hugo
  - Markdown
  - static site
  - pnpm
  - Cloudflare Workers
draft: false
---

This blog is written in Markdown. I write a post, the site turns it into HTML, and I publish it to several hosting platforms. That simple workflow is exactly what I want to keep.

The part that has become less simple is everything around the writing.

## When a theme becomes part of the system

The site uses [Hugo](https://gohugo.io/) with a third-party theme. It has served the blog well, but the theme has also become more than a visual layer. Some of the site's configuration is specific to that theme: settings for the sidebar, article table of contents, tag cloud, categories, footer, and social metadata all use the theme's own structure.

That creates a kind of lock-in. Changing themes is not just changing colors and layouts; it can mean translating configuration and behavior by hand. If I want more freedom to shape the site, I would rather have the templates and styles live in this repository, where I can change them directly.

## A build script that knows too much

The blog is published in several places: GitHub Pages, Netlify, Render, Vercel, and Cloudflare. They all serve the same content, but the build setup has needed more work than I would like.

For example, the current build script installs specific versions of Go, Hugo, Dart Sass, and Node.js before it can build the site. That may be useful when a host does not already have the right tools, but it also means the script has to manage a small toolchain of its own. Platform configuration then has to call that script in slightly different ways.

My ideal is less elaborate: one normal build command that produces a folder of static files, with each host publishing that output. The blog should not need a bespoke installer just to render Markdown into HTML.

## Keeping versions in step

There is also the relationship between Hugo and its theme. Hugo changes over time, and the theme changes over time. Even when each project works well on its own, I still have to make sure their versions and assumptions continue to work together.

I would like the site's core presentation to be code I own, instead of depending on a theme's release schedule and configuration model. That does not mean rebuilding every feature from scratch for its own sake. It means choosing the behaviors the blog actually uses and implementing them as ordinary templates and components that are easy to understand and adjust.

## The direction: Astro, with the Markdown staying

After comparing a few options, Astro looks like a good fit. It is open source, designed for content-focused sites, and supports Markdown content collections. Its components let me build the pages and reusable parts of the site directly, with regular CSS for the design. The default output is static HTML; browser-side JavaScript can stay out of the way unless a feature actually needs it.

I also want to use pnpm for dependency management. The goal is a conventional workflow: install from the lockfile, run the local development server, and build the site into a `dist` directory. Astro's deployment guides cover the platforms I use, and its static output is not tied to any one host.

There are still a few hosting details to account for:

- **GitHub Pages** will keep its existing project-site address, `https://blueberry-py.github.io/blog/`. Since the site lives below `/blog/` rather than at the domain root, that deployment needs the matching base path.
- **Netlify, Render, and Vercel** can publish the static build from `dist` at the root of their respective sites.
- **Cloudflare** now recommends Workers for new projects. For this static blog, Workers can serve Astro's generated assets; Wrangler supplies the Cloudflare-specific deployment configuration.

So the content and design can stay shared, even though the deployment instructions are not identical on every platform. That is the tradeoff I want: portable static output, with only the small amount of host-specific configuration that is actually needed.

## The Markdown can stay, but its metadata needs a plan

The article bodies are already Markdown, and I want to keep writing them that way. One migration detail is that the posts use Hugo's TOML front matter, marked by `+++` at the top and bottom of the metadata block. Astro commonly uses YAML front matter, so the metadata needs to be converted carefully while preserving each post's title, date, slug, tags, categories, and other fields.

Some posts also keep images beside their Markdown files. Those image bundles should move with the posts and continue to render from relative links. Preserving the current `/post/{slug}/` addresses matters too; a change of generator should not break old links.

The other work is recreating the blog features I rely on: the table of contents, archives, tags and categories, series, RSS, sitemap, and search and social metadata. This is where owning the templates should pay off: the behavior can be designed around the blog instead of being expressed through another theme's settings.

That was the plan, written before any of it was built. The migration is finished: it landed on `main` the day after I wrote that, and the writing has not changed at all. What turned out to be interesting is not the part the plan got right. It is everything the plan did not cover — the details that only appear once a corpus of thirty-seven articles is handed to a generator that has never seen it.

## The metadata was both the easy part and the hard part

The plan named one detail of the front matter, the `+++` fences. The fences had a story, and line endings came with them.

Every file of the corpus uses CRLF line endings. The first version of the converter matched the fence exactly, so the front matter of every single article parsed as _empty_: the inventory recorded `/post/my-first-post/` instead of the real Hugo route `/post/my-first-hugo-blog/`, and dropped every cover image the front matter named. Nothing failed. The numbers were simply wrong, and I only caught it by cross-checking the route list against the output the old build still had lying around.

Line endings came back a second time. The migration recorded a hash of each article body so that nothing could silently rewrite an article, and then Git came into play: it stores the blob with LF and checks it out with CRLF on Windows. Those hashes described _my machine_, so the same check on Linux CI reported thirty-seven articles as changed. The hash now normalizes the line endings first, and `.gitattributes` pins what the repository writes, which is something the Hugo site had never needed.

The other surprises were all the same shape: Astro is stricter where Hugo was forgiving, and forgiving where I needed strict.

- A collection declared with a plain object schema silently drops every field it does not name, because Astro replaces the front matter with what the schema parsed. The schema of this site is loose on purpose: `series`, `keywords` and `externalLink` are declared, and any field a future article adds survives the build instead of disappearing from it without a trace.
- Two entries with the same slug would serve the same URL and one would win. Astro only warns about that; `prerenderConflictBehavior: 'error'` turns it into a build failure, which is what a blog with thirty-seven posts wants.
- Astro caches the parsed collection. After I changed the schema, the cached entry kept the old value, the front-matter image stayed the plain string `title.jpg`, and the build failed with an error that named the image rather than the cache. Deleting the data store was the fix, and it will be the fix the next time, too.

## Every old URL is a promise

I said in the plan that a change of generator should not break old links. I did not say what that costs. It costs eighty-three redirects, seven feed templates and one small integration.

Hugo paginated everything: ten articles per page, so `/tags/python/page/3/` was a real URL a reader could have bookmarked or a search engine could have indexed. The new site serves every list in full, which is the behavior I actually want, so the old routes have to answer with a page that sends the reader to the route that holds the same articles now. `/post/` leads to `/archives/`, `/page/2/` leads to the home page. Most of the eighty-three are pagination of that kind, and they are written down in one JSON file that the build reads and the tests verify.

Feeds were the same problem with more stakes, because a feed URL is a subscription a reader set up once. The old site served fifty-nine feeds: a feed of the articles of the site at three different URLs, a feed of the articles of every tag, a feed of the articles of every category, and a feed of the terms of each taxonomy. They are recorded as seven templates, two of which name a `<term>`, because the terms of the site are whatever its articles name — a new tag produces its own feed with no edit to the file. The old site served the main feed at `/index.xml`, so that URL still answers with the feed, next to the `/rss.xml` the new header advertises.

`/sitemap.xml` taught me something about static builds. Astro's `redirects` in a static build with directory output writes a _directory_ named `sitemap.xml`, holding an `index.html`, so the URL that used to be a file answers with a 404. A ten-line integration copies the sitemap the index names to `dist/sitemap.xml` after the build, which keeps the list of routes in one place instead of a second generated file.

One check produced a false positive I like, because it is a bug only a corpus can produce. The build audit looks for links that carry the base path twice, which is the signature of a build with the wrong base path. The site has a tag named `blog`, so `/blog/tags/blog/` — a perfectly correct link on the GitHub Pages deployment under `/blog/` — was reported as broken. The rule now compares the path that is left after the base path is removed.

## The theme was doing more work than I thought

Owning the templates was supposed to free me from a theme's opinions. It also removed the features I had stopped noticing the theme provided.

The clearest one was related content. The old site ended every article with five articles about the same subjects, chosen by Hugo's related index: a shared keyword worth 100, a shared tag worth 80, a threshold of 80, and no articles newer than the one you are reading. I did not know any of that until I had to reproduce it, so `src/lib/related.ts` carries those numbers and their comments. Worse still, the first version of the new site did not show related content _at all_, and nothing failed, because a block that is missing is very quiet. It survived until the final review.

Taxonomy names were another archeology dig. Hugo titled a term with the spelling its articles used, and fell back to the lower-case spelling when the articles used both. So the tag page for `ai` is titled "Ai" while the category page for `ai` is titled "AI", `gpt` stays "GPT" and `llm` becomes "Llm". That is not a rule I would have invented; it is a rule I had to reverse-engineer so that fifty-four page titles matched. Reproducing it takes a seven-line function and a comment that explains why the function exists.

Two small ones are worth naming because they are the kind of defect a reader feels without being able to report. Two Mojo articles share one timestamp, so without a tie-break the archive, the feed and the tag page can disagree about which comes first; they are ordered by date and then by slug. And Hugo printed its dates with the abbreviation of the zone, `CST`, where `Intl` only knows the offset, `GMT+8`. The date helper started out writing a month _name_ into the `datetime` attribute, where the attribute requires a number.

## The checks are what finished the migration

The plan did not mention testing at all, and it turned out to be most of the work. The migration was executed against a baseline: an inventory of every article with its route, title, date, images and a hash of its body, and a verifier that compares the built site against it. Content could not move unless the change was deliberate, and that is what made it possible to refactor aggressively for two days without checking every page by hand.

A frozen snapshot has an expiry date, though. It described thirty-seven articles as they stood on one Monday. Once the migration was over, an article in progress or a draft would fail the gate, and a gate that fails for the wrong reason is a gate people route around. So the verification layer was retired after the migration landed: the tests now compute the inventory from `content/**` at run time, ignore drafts, and still read the built output. The route of every article, every image, every link, every feed and every old URL is checked against the actual `dist`, in 120 tests that run in under a minute. `astro build` produced 96 pages in four seconds. That ratio is the migration in one sentence: rendering Markdown was never the work.

Concurrency got one flag. Two test files build the site into the same `dist`, and two builds at the same time raced over the prerendered assets, so the suite failed at random about once in every two runs. `--test-concurrency=1` is the honest fix for a suite that builds the thing it tests.

## The tools came back, without the toolchain

The build script that installed Go, Hugo, Dart Sass and Node.js is gone, which was the point. What replaced it is a set of checks that cost more attention than expected.

Prettier, ESLint and markdownlint-cli2 now cover the JavaScript, the Astro and the Markdown sources. For the articles I wanted two guarantees and I had to be precise about them: the prose is never re-wrapped, and the code examples are never reformatted. What I had not thought through is that the _markup_ would change. When the tools were first run, Prettier aligned tables, rewrote block quotes and horizontal rules in its own marks, and spaced lists away from the text above them, in ten of the thirty-seven articles. The words are untouched, and Git diff shows the markup. I would rather know this happened than pretend a formatter is a no-op.

The Markdown linter needed eight exceptions, each with the reason written next to it, because the articles as written break those rules: eight hundred and eighty-eight over-long lines, twenty links named after their destination, fifteen articles with more than one top-level heading. The migration was not allowed to rewrite article text, so the linter describes the corpus instead of correcting it.

The hooks changed twice. The repository started with a Python `pre-commit` configuration, because that is the toolchain I know, not the one this project has. One of its hooks needed a `pymarkdown` environment built with a Python version for which `pyyaml` has no wheel, and building it needs a C++ compiler that is not installed. That is the whole argument against keeping it: a second toolchain, in a repository that had just spent two days deleting one. `husky` and `lint-staged` now do the same job with the tools the project already has, installed by `pnpm install` so a fresh clone is gated without another step, and the push hook runs the same two commands as CI.

## Five hosts and two variables

The plan said each host publishes the same `dist`. True, and not sufficient.

The canonical URL and the base path are read from the environment, which is how the GitHub Pages deployment under `/blog/` gets its prefix. That also meant a build inherited whatever the shell happened to hold: the site of one host was built with the prefix of another, and every link on it answered with a 404. Worse, under Git Bash the value `/blog` was rewritten into a Windows path. Two commands now exist, `build:root` and `build:pages`, and each pins both variables in the same command that runs the build, so the checks and the hosts always read a site whose shape was chosen on purpose.

The smaller host facts, all of them learned rather than planned: Render reads no configuration file from the repository and needs no `SITE_URL`, because the canonical URL of the site is the Netlify one on every host but GitHub Pages. The repository has to be told that the source of its Pages site is "GitHub Actions", or the workflow has nothing to deploy. pnpm 12 refuses to run the install scripts of `esbuild` and `workerd` until they are explicitly allowed, and `workerd` is the runtime Cloudflare runs the Worker with, so that allowance is in the CI of every host. `vercel.json` stayed, because the auto-detection of Vercel would run `astro build` instead of the build command that pins the variables. And `wrangler.toml` lost its `[build]` section, which had been running the build a second time on every deployment.

## Cloudflare was the last thing to move

Cloudflare now recommends Workers for new projects, and a static blog fits a Worker with assets: the output is served as static assets, and the 404 page of the site answers the unknown URLs. That part worked the first time.

What I did not know is how much a branch preview needs. Workers Builds runs `wrangler preview` for a branch, and that command refuses to start when the configuration holds no `previews` block. The block may be empty — this Worker has no variables, no secrets and no bindings, so a preview has nothing of its own to ask for — but it has to be there. And the two commands of Builds are two separate settings: the deploy command publishes the production branch, the preview command runs for every other branch. Putting `wrangler preview` in the deploy field would produce a nice preview and a site that never updates.

The last surprise was not mine at all. The upload of the assets failed once with `code: 10013`, "an unknown error", from `assets-upload-session` of the Cloudflare API. Same code, same endpoint, same symptom as an open issue in `workers-sdk` where a single retry of the build was enough. It was enough here too. I had already verified the file count, the sizes, the file names and the configuration; the API was having a bad afternoon. Worth saying out loud because "the deploy failed" reads like a fault in the repository, and this one was not.

## What the new site still does not have

Not everything the old theme did has been rebuilt, and the list is short enough to write down.

An article page names no reading time, which the old theme computed. The cards in the lists carry no cover image, where the theme showed the front-matter image as a thumbnail. The feeds name no `atom:link rel="self"`. And the site follows the color scheme of the system with no switch, where the theme offered one.

There are no comments, no search and no widgets. The plan listed search among the features to recreate, and I dropped it: a search box over a personal blog of thirty-seven articles is a feature I never use as a reader, and an index to keep in step with the corpus is a thing to maintain. The old theme had its comments switched off and its widget lists empty, so a reader loses nothing that was ever readable. The honest summary is that everything a reader of the old site could have used is still there, and four niceties are not.

## Did it deliver

The workflow I wanted was: write Markdown, run one normal build command, publish a folder of static files. That is what I have. There is no bespoke installer, the theme's configuration model is gone, the templates and the CSS are files of this repository that I can change directly, and the versions of Hugo and a theme no longer have to stay in step because neither is installed.

The part the plan did not predict is where the effort went. Converting front matter took an afternoon. The old URLs, the features nobody had written down, the corpus that behaves differently from the sample, the four hosts that each need one fact stated explicitly, and the checks that make any of it safe to change again — that was the migration. A static site generator is a small problem. A static site is a corpus with a history, and the history is the expensive part.
