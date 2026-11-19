#!/usr/bin/env node
/**
 * The command that runs oxfmt.
 *
 * `scripts/formatter.mjs` says why a run of oxfmt can die on Windows and why
 * the run is repeated. This file is the command: it hands oxfmt its arguments
 * and its output, and exits with the exit code of the run that finished.
 *
 * Usage: node scripts/oxfmt.mjs [arguments of oxfmt]
 */
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { ATTEMPTS, crashed, runFormatter } from './formatter.mjs';

const OXFMT = fileURLToPath(
  new URL('../node_modules/oxfmt/bin/oxfmt', import.meta.url),
);

/** Run oxfmt once and resolve to the exit code of the run. */
function run(arguments_) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [OXFMT, ...arguments_], {
      stdio: 'inherit',
    });

    child.on('error', (error) => {
      process.stderr.write(`oxfmt could not start: ${error.message}\n`);
      resolve(1);
    });
    child.on('close', (code) => resolve(code ?? 1));
  });
}

const arguments_ = process.argv.slice(2);

const code = await runFormatter(
  () => run(arguments_),
  (attempt) => {
    if (attempt < ATTEMPTS) {
      process.stderr.write(
        `oxfmt died with an access violation; running the formatter again ` +
          `(${attempt + 1} of ${ATTEMPTS}).\n`,
      );
    }
  },
);

if (crashed(code)) {
  process.stderr.write(
    `oxfmt died with an access violation ${ATTEMPTS} times in a row; ` +
      `the formatter reports a failure.\n`,
  );
  process.exitCode = 1;
} else {
  process.exitCode = code;
}
