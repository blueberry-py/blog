import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import { pageSchema, postSchema } from './lib/content-schema.ts';

/**
 * Blog posts. The front matter is the Hugo front matter of the same name:
 * `title`, `slug`, `date` and `description` are always present, the taxonomy
 * lists default to empty, and the remaining fields are optional.
 */
const posts = defineCollection({
  loader: glob({ base: './content/post', pattern: '**/*.md' }),
  schema: postSchema,
});

/** Standalone pages, currently only the about page. */
const pages = defineCollection({
  loader: glob({ base: './content/about', pattern: '**/*.md' }),
  schema: pageSchema,
});

export const collections = { posts, pages };
