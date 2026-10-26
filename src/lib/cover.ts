import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

/**
 * The cover of an article that is not there.
 */
export interface MissingCover {
  /** The cover the article names, the way the front matter writes it. */
  cover: string;
  /** The file the cover names, where it would have been. */
  path: string;
}

/** The result of the check of the cover of an article. */
export interface CoverCheck<TData> {
  /** The data of the article, without the cover that is not there. */
  data: TData;
  /** The cover that is not there, when the article names one. */
  missing?: MissingCover;
}

/**
 * Whether a cover names a file of the article.
 *
 * A cover of another site, or a file of the `public` folder, is served the way
 * it is written: it is not a file next to the article, so it is not checked.
 */
function isLocalFile(cover: string): boolean {
  if (cover.startsWith('/')) return false;
  if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(cover)) return false;

  return true;
}

/**
 * Drop the cover of an article whose cover is not there.
 *
 * Hugo served the cover of an article from the folder of the article, and so
 * does this site: the cover of an article is a file next to the article. An
 * article that names a cover it does not have is published without a cover
 * rather than breaking every build of the site, and the cover that is missing
 * is reported so that it can be added.
 *
 * The check belongs here, and not in the schema of the collection, because
 * Astro turns the cover of an article into an import before the schema is
 * read: a cover that is not there stops the build inside the bundler, where
 * the schema cannot soften it.
 */
export function withoutMissingCover<TData extends Record<string, unknown>>(
  data: TData,
  filePath?: string,
): CoverCheck<TData> {
  const cover = data.image;

  if (typeof cover !== 'string' || cover.trim() === '') return { data };
  if (!filePath) return { data };
  if (!isLocalFile(cover)) return { data };

  const target = resolve(dirname(filePath), cover);

  if (existsSync(target)) return { data };

  const entries = Object.entries(data).filter(([key]) => key !== 'image');

  return {
    data: Object.fromEntries(entries) as TData,
    missing: { cover, path: target },
  };
}
