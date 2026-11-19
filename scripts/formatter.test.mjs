#!/usr/bin/env node
/**
 * The rule that repeats a run of the formatter.
 *
 * A run of oxfmt dies with an access violation on Windows now and then, after
 * it printed its report. The command has to hand its caller a result of a run
 * that finished, and it has to stop repeating a crash that does not go away —
 * these tests fix both halves of that rule without starting the formatter.
 *
 * Usage: node --test scripts/formatter.test.mjs
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ACCESS_VIOLATION,
  ATTEMPTS,
  crashed,
  runFormatter,
} from './formatter.mjs';

/** A formatter that answers with the given exit codes, one per run. */
function formatter(...codes) {
  const runs = [];

  return {
    runs,
    run: (attempt) => {
      runs.push(attempt);

      return Promise.resolve(codes[attempt - 1] ?? 1);
    },
  };
}

test('reads the code of the crash in both signs', () => {
  assert.equal(crashed(ACCESS_VIOLATION), true);
  assert.equal(crashed(ACCESS_VIOLATION - 2 ** 32), true);
  assert.equal(crashed(0), false);
  assert.equal(crashed(1), false);
});

test('reports the exit code of a run that finished', async () => {
  const { runs, run } = formatter(0);
  const reported = [];

  const code = await runFormatter(run, (attempt) => reported.push(attempt));

  assert.equal(code, 0);
  assert.deepEqual(runs, [1], 'a run that finished is not repeated');
  assert.deepEqual(reported, []);
});

test('repeats a crash and reports the run that finished', async () => {
  const { runs, run } = formatter(ACCESS_VIOLATION, 0);
  const reported = [];

  const code = await runFormatter(run, (attempt) => reported.push(attempt));

  assert.equal(code, 0, 'the crash of a run is not the result of the command');
  assert.deepEqual(runs, [1, 2], 'the crash is not repeated');
  assert.deepEqual(reported, [1], 'the crash is not reported');
});

test('reports unformatted files without repeating the run', async () => {
  const { runs, run } = formatter(1);

  const code = await runFormatter(run, () => {
    assert.fail('a run that reports unformatted files is not repeated');
  });

  assert.equal(code, 1);
  assert.deepEqual(runs, [1]);
});

test('reports a crash that does not go away', async () => {
  const { runs, run } = formatter(...Array(ATTEMPTS).fill(ACCESS_VIOLATION));

  const code = await runFormatter(run);

  assert.equal(code, ACCESS_VIOLATION, 'the crash is the exit code');
  assert.deepEqual(
    runs,
    Array.from({ length: ATTEMPTS }, (_, index) => index + 1),
    'the runs stop after the attempts',
  );
});
