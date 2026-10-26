import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { z } from 'astro/zod';

/**
 * The collection schemas live in a TypeScript module of their own so that they
 * can be checked without starting Astro: `src/content.config.ts` only wires
 * them to the loaders, and these tests exercise the rules themselves.
 */
async function loadSchemas() {
  return import('../../src/lib/content-schema.ts');
}

/**
 * The helper of Astro that reads the cover image of an article.
 *
 * Astro reads the image of the cover and turns it into the metadata of the
 * image it optimizes. A cover that is not there is dropped by the loader of
 * the collection before the schema is read (see `src/lib/cover.ts`), so the
 * schema never sees one.
 */
function astroImage() {
  return () =>
    z.string().transform(async (imagePath) => ({
      src: `/_astro/${imagePath}`,
    }));
}

const POST = {
  title: 'Alpha',
  slug: 'alpha',
  date: '2024-01-31T15:32:01+08:00',
  description: 'The first post',
  tags: ['python'],
  categories: ['python'],
  authors: ['Zeyang Lin'],
};

describe('post schema', () => {
  it('requires a slug, because the slug is the post URL', async () => {
    const { postSchema } = await loadSchemas();

    const withoutSlug = { ...POST };
    delete withoutSlug.slug;

    const result = postSchema.safeParse(withoutSlug);

    assert.equal(result.success, false);
    assert.ok(
      result.error.issues.some((issue) => issue.path.includes('slug')),
      `expected a slug issue, got ${JSON.stringify(result.error.issues)}`,
    );
  });

  it('requires a title and a description', async () => {
    const { postSchema } = await loadSchemas();

    const result = postSchema.safeParse({ slug: 'alpha', date: POST.date });

    assert.equal(result.success, false);
    const paths = result.error.issues.map((issue) => issue.path.join('.'));
    assert.ok(paths.includes('title'), `expected a title issue, got ${paths}`);
    assert.ok(
      paths.includes('description'),
      `expected a description issue, got ${paths}`,
    );
  });

  it('coerces the front matter date into a Date', async () => {
    const { postSchema } = await loadSchemas();

    const data = postSchema.parse(POST);

    assert.ok(data.date instanceof Date, 'the date is a Date');
    assert.equal(data.date.toISOString(), '2024-01-31T07:32:01.000Z');
  });

  it('defaults the taxonomy lists to empty arrays', async () => {
    const { postSchema } = await loadSchemas();

    const withoutTaxonomies = { ...POST };
    delete withoutTaxonomies.tags;
    delete withoutTaxonomies.categories;
    delete withoutTaxonomies.authors;

    const data = postSchema.parse(withoutTaxonomies);

    assert.deepEqual(data.tags, []);
    assert.deepEqual(data.categories, []);
    assert.deepEqual(data.authors, []);
  });

  it('treats a post as published unless it is a draft', async () => {
    const { postSchema } = await loadSchemas();

    assert.equal(postSchema.parse(POST).draft, false);
    assert.equal(postSchema.parse({ ...POST, draft: true }).draft, true);
  });

  it('keeps metadata the schema does not know about', async () => {
    const { postSchema } = await loadSchemas();

    const data = postSchema.parse({
      ...POST,
      cover: 'cover.png',
      aliases: ['old-url'],
    });

    assert.equal(data.cover, 'cover.png');
    assert.deepEqual(data.aliases, ['old-url']);
  });

  it('accepts the optional metadata Hugo wrote', async () => {
    const { postSchema } = await loadSchemas();

    const data = postSchema.parse({
      ...POST,
      image: 'cover.png',
      keywords: ['python', 'astro'],
      series: ['one liner'],
      externalLink: 'https://example.com',
    });

    assert.equal(data.image, 'cover.png');
    assert.deepEqual(data.keywords, ['python', 'astro']);
    assert.deepEqual(data.series, ['one liner']);
    assert.equal(data.externalLink, 'https://example.com');
  });
});

describe('the schema of the collection', () => {
  it('keeps the cover image of an article', async () => {
    const { postCollectionSchema } = await loadSchemas();

    const schema = postCollectionSchema({ image: astroImage() });
    const data = await schema.parseAsync({ ...POST, image: 'cover.png' });

    assert.equal(data.image.src, '/_astro/cover.png');
  });

  it('keeps an article that has no cover', async () => {
    const { postCollectionSchema } = await loadSchemas();

    const schema = postCollectionSchema({ image: astroImage() });
    const data = await schema.parseAsync(POST);

    assert.equal(data.image, undefined);
  });
});

describe('page schema', () => {
  it('accepts the about page without a description', async () => {
    const { pageSchema } = await loadSchemas();

    const result = pageSchema.safeParse({
      title: 'About',
      slug: 'about',
      date: '2024-01-31T16:11:57+08:00',
    });

    assert.equal(result.success, true);
    assert.ok(result.data.date instanceof Date);
  });

  it('keeps metadata the schema does not know about', async () => {
    const { pageSchema } = await loadSchemas();

    const data = pageSchema.parse({
      title: 'About',
      date: '2024-01-31T16:11:57+08:00',
      sidebar: 'Python & Fun',
    });

    assert.equal(data.sidebar, 'Python & Fun');
  });
});
