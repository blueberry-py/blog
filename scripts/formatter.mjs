/**
 * The formatter, and the run of it that dies on Windows.
 *
 * oxfmt formats the files on a pool of worker threads — an Astro file is
 * formatted by a Prettier instance that runs on that pool — and tears the pool
 * down once every file is done. On Windows the teardown sometimes raises an
 * access violation: the run prints its report and then the process dies with
 * `0xC0000005` (`STATUS_ACCESS_VIOLATION`), which `pnpm` and the shell read as a
 * failed command. A run that dies that way has not compared the sources with
 * the configuration, so its exit code says nothing about the sources, and the
 * result of the command is the result of a run that finished.
 *
 * The repeat lives in this file so every caller — `pnpm format`, `pnpm
 * format:check`, `lint-staged` and the tests — reads the same result through the
 * same rule.
 */

/** The exit code of a Windows process that died with an access violation. */
export const ACCESS_VIOLATION = 3221225477;

/** How many runs a crash is allowed to consume before it is reported. */
export const ATTEMPTS = 4;

/** Whether an exit code of the formatter is the crash instead of a result. */
export function crashed(code) {
  // Windows reports the code of `0xC0000005` as an unsigned integer, and a
  // shell that reads it as a signed integer reports it as negative.
  return code === ACCESS_VIOLATION || code === ACCESS_VIOLATION - 2 ** 32;
}

/**
 * Run the formatter until one of its runs finishes.
 *
 * `run` takes the number of the attempt and resolves to the exit code of that
 * run, and `report` is told about every run that crashed. The exit code of the
 * last run is the result: a run that reports unformatted files, or a crash that
 * leaves no result behind, are both the answer of the formatter.
 */
export async function runFormatter(run, report = () => {}) {
  let code = 1;

  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    code = await run(attempt);

    if (!crashed(code)) {
      return code;
    }

    report(attempt);
  }

  return code;
}
