import type { SchemaContext } from 'astro:content';
import { z } from 'astro/zod';

/**
 * The front matter of a blog post, as Hugo wrote it.
 *
 * The schema is loose on purpose: a field the schema does not know about is
 * kept instead of being dropped, so metadata added to a post later survives
 * the migration without a code change.
 */
export const postSchema = z.looseObject({
  title: z.string(),
  description: z.string(),
  // The slug is the URL of the post, so it may not be missing.
  slug: z.string(),
  // The TOML dates carried a `+08:00` offset; they are read as instants.
  date: z.coerce.date(),
  authors: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  image: z.string().optional(),
  draft: z.boolean().default(false),
  keywords: z.array(z.string()).optional(),
  series: z.array(z.string()).optional(),
  externalLink: z.string().optional(),
});

/**
 * The schema of the posts collection.
 *
 * It is the schema of the front matter with the cover image read by the
 * `image` helper of the collection: the posts name the cover relative to the
 * folder of the post, the same way Hugo did, and Astro turns it into the
 * metadata of the image it optimizes.
 *
 * A cover image that is not there does not reach this schema: the loader of
 * the collection drops it and says which cover is missing, because Astro turns
 * the cover of an article into an import before the schema is read.
 */
export function postCollectionSchema({ image }: SchemaContext) {
  return postSchema.extend({ image: image().optional() });
}

/** The front matter of a standalone page, currently only the about page. */
export const pageSchema = z.looseObject({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string().optional(),
  slug: z.string().optional(),
});
