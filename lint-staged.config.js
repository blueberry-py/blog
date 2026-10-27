/**
 * The gate of a commit.
 *
 * The pre-commit hook runs this file through `husky` and `lint-staged`, which
 * hands every command the files of the commit and stages what was fixed, so a
 * commit carries the formatted copy of a file instead of the copy the author
 * wrote. The commands are the commands of `pnpm check`: ESLint lints the code,
 * markdownlint-cli2 lints the articles with the rules of
 * `.markdownlint-cli2.yaml`, and Prettier formats both.
 *
 * The whole repository is read by `pnpm check` and by the CI job, not here: a
 * commit stays a second-long step, and a check that is too slow to sit on every
 * commit is a check that gets skipped with `git commit --no-verify`.
 */
export default {
  // The rules of an article are fixed first, so the formatter settles the shape
  // of a file that already passes the linter. `--no-globs` keeps the linter on
  // the files of the commit: the `globs` of the configuration would lint every
  // article of the repository on every commit.
  '*.md': ['markdownlint-cli2 --no-globs --fix', 'prettier --write'],
  // ESLint fixes the code it can and reports what it cannot; Prettier then
  // formats what ESLint left.
  '*.{js,mjs,cjs,ts,mts,cts,tsx,astro}': ['eslint --fix', 'prettier --write'],
  // The configuration and the styles are formatted and not linted.
  '*.{json,css,yml,yaml}': ['prettier --write'],
};
