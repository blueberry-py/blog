import assert from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

/**
 * The converter is created in the same task as these tests, so it is imported
 * lazily: before the implementation exists every test fails with a
 * "cannot find module" error instead of the whole file failing to load.
 */
async function loadConverter() {
  return import('./convert-frontmatter.mjs');
}

const TOML_FRONT_MATTER = [
  '+++',
  'title = "Alpha"',
  'description = "A post about alpha"',
  'slug = "alpha"',
  'date = 2024-01-31T15:32:01+08:00',
  'authors = ["Zeyang Lin"]',
  'tags = ["python", "AI"]',
  'categories = ["python"]',
  'draft = false',
  '+++',
  '',
  '## Alpha',
  '',
  'Body text.',
  '',
].join('\n');

describe('front matter conversion', () => {
  it('converts TOML scalars and arrays into YAML front matter', async () => {
    const { convertContent } = await loadConverter();

    const { output, changed } = convertContent(TOML_FRONT_MATTER);

    assert.equal(changed, true);
    assert.ok(
      output.startsWith('---\n'),
      'the front matter uses YAML delimiters',
    );
    assert.match(output, /^title: Alpha$/m);
    assert.match(output, /^description: A post about alpha$/m);
    assert.match(output, /^slug: alpha$/m);
    assert.match(output, /^draft: false$/m);
    assert.match(output, /^authors:\s*$/m);
    assert.match(output, /^\s*- Zeyang Lin$/m);
    assert.match(output, /^tags:\s*$/m);
    assert.match(output, /^\s*- python$/m);
    assert.match(output, /^\s*- AI$/m);
  });

  it('keeps Unicode text intact', async () => {
    const { convertContent } = await loadConverter();

    const raw = [
      '+++',
      'title = "MOJO 系列 第一篇: 在 Ubuntu 环境下安装本地 SDK"',
      'description = "New Python 🐍 versions, JIT, agent harness 🤖"',
      'slug = "mojo-series-01-sdk-zhcn"',
      'date = 2023-09-08T18:00:00+08:00',
      '+++',
      '',
      '正文。',
      '',
    ].join('\n');

    const { output } = convertContent(raw);

    assert.match(output, /MOJO 系列 第一篇: 在 Ubuntu 环境下安装本地 SDK/);
    assert.match(output, /New Python 🐍 versions, JIT, agent harness 🤖/);
    assert.match(output, /正文。/);
  });

  it('preserves the offset of a timezone-bearing date', async () => {
    const { convertContent } = await loadConverter();

    const { output } = convertContent(TOML_FRONT_MATTER);

    assert.match(output, /date: '?2024-01-31T15:32:01\+08:00'?/);
  });

  it('keeps single-quoted TOML strings', async () => {
    const { convertContent } = await loadConverter();

    const raw =
      "+++\ntitle = 'About'\ndate = 2024-01-31T16:11:57+08:00\n+++\n\nAbout text.\n";

    const { output, changed } = convertContent(raw);

    assert.equal(changed, true);
    assert.match(output, /^title: About$/m);
  });

  it('leaves missing optional metadata out instead of inventing it', async () => {
    const { convertContent } = await loadConverter();

    const raw =
      '+++\ntitle = "About"\ndate = 2024-01-31T16:11:57+08:00\n+++\n\nAbout text.\n';

    const { output } = convertContent(raw);

    assert.match(output, /^title: About$/m);
    assert.doesNotMatch(output, /^tags:/m);
    assert.doesNotMatch(output, /^draft:/m);
    assert.doesNotMatch(output, /^authors:/m);
  });

  it('preserves the Markdown body byte-for-byte', async () => {
    const { convertContent } = await loadConverter();

    const body = '\r\n## Alpha\r\n\r\nBody text.\r\n';
    const raw = `+++\r\ntitle = "Alpha"\r\nslug = "alpha"\r\n+++\r\n${body}`;

    const { output } = convertContent(raw);

    assert.ok(output.endsWith(body), 'the body is unchanged');
  });

  it('converts a nested index.md bundle the same way', async () => {
    const { convertContent } = await loadConverter();

    const raw =
      '+++\ntitle = "Bundle"\nslug = "bundle"\ndate = 2024-02-21T15:23:13+08:00\nimage = "title.jpg"\n+++\n\n![pic](image-01.png)\n';

    const { output, changed } = convertContent(raw);

    assert.equal(changed, true);
    assert.match(output, /^image: title\.jpg$/m);
    assert.match(output, /!\[pic\]\(image-01\.png\)/);
  });

  it('refuses to convert a front matter block it cannot parse', async () => {
    const { convertContent } = await loadConverter();

    const raw = '+++\ntitle = "Alpha\nslug = \n+++\n\nBody.\n';

    assert.throws(() => convertContent(raw), /cannot parse/i);
  });

  it('refuses to convert a file with an unterminated front matter block', async () => {
    const { convertContent } = await loadConverter();

    const raw = '+++\ntitle = "Alpha"\n\nBody without a closing delimiter.\n';

    assert.throws(() => convertContent(raw), /cannot parse/i);
  });

  it('leaves a file without front matter untouched', async () => {
    const { convertContent } = await loadConverter();

    const raw = '# Just a heading\n\nNo front matter here.\n';

    const { output, changed } = convertContent(raw);

    assert.equal(changed, false);
    assert.equal(output, raw);
  });

  it('is idempotent once the front matter is YAML', async () => {
    const { convertContent } = await loadConverter();

    const { output } = convertContent(TOML_FRONT_MATTER);
    const second = convertContent(output);

    assert.equal(second.changed, false);
    assert.equal(second.output, output);
  });
});

describe('the files the converter is asked for', () => {
  /** A tree with an article that the baseline of the migration does not hold. */
  function withFixture(fn) {
    const root = mkdtempSync(path.join(tmpdir(), 'blog-convert-sources-'));
    try {
      const source = path.join(root, 'content/post/new.md');
      mkdirSync(path.dirname(source), { recursive: true });
      writeFileSync(source, TOML_FRONT_MATTER, 'utf8');
      return fn(root, source);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  }

  it('converts the articles of the baseline when no file is named', async () => {
    const { selectSources } = await loadConverter();

    await withFixture(async (root) => {
      mkdirSync(path.join(root, 'scripts/migration'), { recursive: true });
      writeFileSync(
        path.join(root, 'scripts/migration/legacy-routes.json'),
        JSON.stringify({
          entries: [{ source: 'content/post/alpha.md' }],
        }),
        'utf8',
      );

      assert.deepEqual(selectSources([], root), ['content/post/alpha.md']);
    });
  });

  it('converts a file the baseline does not hold', async () => {
    const { selectSources } = await loadConverter();

    await withFixture((root) => {
      assert.deepEqual(selectSources(['--path', 'content/post/new.md'], root), [
        'content/post/new.md',
      ]);
    });
  });

  it('writes the front matter of a file the baseline does not hold', async () => {
    const { convertFile, selectSources } = await loadConverter();

    await withFixture((root, source) => {
      const sources = selectSources(['--path', 'content/post/new.md'], root);

      for (const one of sources) {
        convertFile(root, one, { write: true });
      }

      const written = readFileSync(source, 'utf8');
      assert.ok(written.startsWith('---\n'), 'the front matter uses YAML');
      assert.match(written, /^title: Alpha$/m);
    });
  });

  it('refuses a path that is not an article of the site', async () => {
    const { selectSources } = await loadConverter();

    await withFixture((root) => {
      assert.throws(
        () => selectSources(['--path', 'README.md'], root),
        /content/,
      );
    });
  });

  it('refuses a path that names no file', async () => {
    const { selectSources } = await loadConverter();

    await withFixture((root) => {
      assert.throws(() => selectSources(['--path'], root), /--path/);
    });
  });
});

describe('front matter conversion on disk', () => {
  it('reports a change without writing it in check mode', async () => {
    const { convertFile } = await loadConverter();

    const root = mkdtempSync(path.join(tmpdir(), 'blog-convert-frontmatter-'));
    try {
      const source = path.join(root, 'content/post/alpha.md');
      mkdirSync(path.dirname(source), { recursive: true });
      writeFileSync(source, TOML_FRONT_MATTER, 'utf8');

      const result = convertFile(root, 'content/post/alpha.md', {
        write: false,
      });

      assert.equal(result.changed, true);
      assert.equal(
        readFileSync(source, 'utf8'),
        TOML_FRONT_MATTER,
        'the file is untouched',
      );
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it('writes the converted front matter in write mode', async () => {
    const { convertFile } = await loadConverter();

    const root = mkdtempSync(path.join(tmpdir(), 'blog-convert-frontmatter-'));
    try {
      const source = path.join(root, 'content/post/alpha.md');
      mkdirSync(path.dirname(source), { recursive: true });
      writeFileSync(source, TOML_FRONT_MATTER, 'utf8');

      const result = convertFile(root, 'content/post/alpha.md', {
        write: true,
      });

      assert.equal(result.changed, true);
      const written = readFileSync(source, 'utf8');
      assert.ok(written.startsWith('---\n'));
      assert.ok(written.endsWith('\n## Alpha\n\nBody text.\n'));
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it('refuses to overwrite a file whose front matter cannot be parsed', async () => {
    const { convertFile } = await loadConverter();

    const root = mkdtempSync(path.join(tmpdir(), 'blog-convert-frontmatter-'));
    try {
      const source = path.join(root, 'content/post/broken.md');
      mkdirSync(path.dirname(source), { recursive: true });
      const raw = '+++\ntitle = "Broken\n+++\n\nBody.\n';
      writeFileSync(source, raw, 'utf8');

      assert.throws(
        () => convertFile(root, 'content/post/broken.md', { write: true }),
        /cannot parse/i,
      );
      assert.equal(readFileSync(source, 'utf8'), raw, 'the file is untouched');
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
