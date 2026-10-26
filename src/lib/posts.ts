import type { CollectionEntry } from 'astro:content';

/**
 * The posts of the site, from the newest to the oldest.
 *
 * Two posts can carry the same date, so the slug breaks the tie: the order of
 * the site is the same in every build.
 */
export function sortPosts(
  posts: CollectionEntry<'posts'>[],
): CollectionEntry<'posts'>[] {
  return [...posts].sort(
    (a, b) =>
      b.data.date.valueOf() - a.data.date.valueOf() ||
      a.id.localeCompare(b.id, 'en'),
  );
}
