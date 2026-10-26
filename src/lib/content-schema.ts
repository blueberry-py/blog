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

/** The front matter of a standalone page, currently only the about page. */
export const pageSchema = z.looseObject({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string().optional(),
  slug: z.string().optional(),
});
