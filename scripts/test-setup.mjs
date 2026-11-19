/**
 * The fixtures a test run leaves behind when it is killed.
 *
 * Some checks write a fixture into the tree of the repository and remove it
 * in a `finally` or an `after` hook: the probe of the public guard, the
 * articles of the cover tolerance and the broken files of the tooling gate.
 * A run that is killed before those hooks run leaves the fixtures behind,
 * and the next run then builds against them: the guard refuses every build
 * and the Markdown linter reports the broken file of the last run.
 *
 * The test script imports this module before it runs a single check, so a
 * run always starts from the tree it expects, whatever the last run did.
 * The checks run one after the other (`--test-concurrency=1`), so removing
 * the fixtures here never takes one away from a check that is using it.
 */
import { rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

rmSync(path.join(REPO_ROOT, 'public', 'guard-probe.html'), { force: true });
rmSync(path.join(REPO_ROOT, 'tooling-test-tmp'), {
  recursive: true,
  force: true,
});

for (const article of ['cover-tolerance-published', 'cover-tolerance-draft']) {
  rmSync(path.join(REPO_ROOT, 'content', 'post', article), {
    recursive: true,
    force: true,
  });
}
