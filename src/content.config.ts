import { defineCollection } from 'astro:content';
import { glob, type Loader, type LoaderContext } from 'astro/loaders';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { pageSchema, postCollectionSchema } from './lib/content-schema.ts';
import { withoutMissingCover } from './lib/cover.ts';

/**
 * A loader that publishes an article whose cover is not there without a cover.
 *
 * Astro turns the cover of an article into an import before the schema of the
 * collection is read, so a cover that is not there stops the build with an
 * error of the bundler. The loader drops such a cover before the schema sees
 * it and says which cover is missing, so that one unfinished article does not
 * break every build of the site.
 */
function withoutMissingCovers(loader: Loader): Loader {
  return {
    name: `${loader.name}-without-missing-covers`,
    async load(context: LoaderContext) {
      await loader.load({
        ...context,
        parseData: <TData extends Record<string, unknown>>(props: {
          id: string;
          data: TData;
          filePath?: string;
        }) => {
          const { data, missing } = withoutMissingCover(
            props.data,
            props.filePath,
          );

          if (missing) {
            const root = fileURLToPath(context.config.root);

            context.logger.warn(
              `The article ${props.id} names a cover that is not there: ${missing.cover} (${path.relative(root, missing.path)}). It is published without a cover.`,
            );
          }

          return context.parseData({ ...props, data });
        },
      });
    },
  };
}

/**
 * Blog posts. The front matter is the Hugo front matter of the same name:
 * `title`, `slug`, `date` and `description` are always present, the taxonomy
 * lists default to empty, and the remaining fields are optional.
 */
const posts = defineCollection({
  loader: withoutMissingCovers(
    glob({ base: './content/post', pattern: '**/*.md' }),
  ),
  schema: postCollectionSchema,
});

/** Standalone pages, currently only the about page. */
const pages = defineCollection({
  loader: glob({ base: './content/about', pattern: '**/*.md' }),
  schema: pageSchema,
});

export const collections = { posts, pages };
