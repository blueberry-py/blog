import type { CollectionEntry } from 'astro:content';

/**
 * The articles that belong to an article.
 *
 * The old Hugo site ended every article with a block titled "Related content"
 * that held the five articles about the same subjects. Hugo chose them with
 * the weights of its related index: a keyword the two articles share was worth
 * 100, a tag was worth 80, and an article had to reach the threshold of 80 to
 * be shown. The weights are kept here, so the new site offers the reader the
 * articles the old site offered.
 */

/** The weight a keyword the two articles share carries. */
const KEYWORD_WEIGHT = 100;

/** The weight a tag the two articles share carries. */
const TAG_WEIGHT = 80;

/**
 * The score an article needs to be shown as related.
 *
 * Hugo dropped the terms that weighed less than its threshold of 80, so one
 * shared tag is enough and one shared keyword weighs more than any number of
 * shared tags.
 */
const THRESHOLD = 80;

/** The number of articles the block holds, the number the old theme held. */
export const RELATED_LIMIT = 5;

/**
 * The terms of an article, without the spaces around them.
 *
 * The terms are compared the way Hugo compared them: as they are written, so
 * `AI` and `ai` are two terms.
 *
 * @param {string[] | undefined} values The terms of an article.
 * @returns {Set<string>} The terms, each of them once.
 */
function terms(values: string[] | undefined): Set<string> {
  return new Set(
    (values ?? []).map((value) => value.trim()).filter((value) => value !== ''),
  );
}

/**
 * The number of terms two articles have in common.
 *
 * @param {Set<string>} one The terms of the first article.
 * @param {Set<string>} other The terms of the second article.
 * @returns {number} The number of terms both of them carry.
 */
function shared(one: Set<string>, other: Set<string>): number {
  let count = 0;

  for (const term of one) {
    if (other.has(term)) count += 1;
  }

  return count;
}

/**
 * The score two articles share.
 *
 * @param {CollectionEntry<'posts'>} post The article.
 * @param {CollectionEntry<'posts'>} other The other article.
 * @returns {number} The score of the pair.
 */
export function relatedScore(
  post: CollectionEntry<'posts'>,
  other: CollectionEntry<'posts'>,
): number {
  return (
    KEYWORD_WEIGHT *
      shared(terms(post.data.keywords), terms(other.data.keywords)) +
    TAG_WEIGHT * shared(terms(post.data.tags), terms(other.data.tags))
  );
}

/**
 * The articles that belong to an article.
 *
 * The articles that came later are left out, the way Hugo left them out, and
 * the articles of the same score are ordered by the date they were published,
 * the newest first. The articles that share the most come first.
 *
 * @param {CollectionEntry<'posts'>} post The article.
 * @param {CollectionEntry<'posts'>[]} posts The articles of the site.
 * @param {number} limit The number of articles the block holds.
 * @returns {CollectionEntry<'posts'>[]} The articles that belong to it.
 */
export function relatedPosts(
  post: CollectionEntry<'posts'>,
  posts: CollectionEntry<'posts'>[],
  limit: number = RELATED_LIMIT,
): CollectionEntry<'posts'>[] {
  const scored = posts
    .filter(
      (other) =>
        other.id !== post.id &&
        other.data.draft !== true &&
        other.data.date.valueOf() <= post.data.date.valueOf(),
    )
    .map((other) => ({ other, score: relatedScore(post, other) }))
    .filter(({ score }) => score >= THRESHOLD);

  scored.sort(
    (a, b) =>
      b.score - a.score ||
      b.other.data.date.valueOf() - a.other.data.date.valueOf() ||
      a.other.id.localeCompare(b.other.id, 'en'),
  );

  return scored.slice(0, limit).map(({ other }) => other);
}
