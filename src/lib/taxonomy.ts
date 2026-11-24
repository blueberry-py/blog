import type { CollectionEntry } from 'astro:content';

import { sortPosts } from './posts.ts';

/**
 * A term of the site: a tag or a category.
 *
 * The terms are built from the front matter of the posts: the URL of a term is
 * its name in lower case, and the name the term is shown with is chosen from
 * the spellings the posts used.
 */
export interface Term {
  /** The slug of the term: its name in lower case. */
  slug: string;
  /** The name the term is shown with. */
  name: string;
  /** The posts that carry the term, from the newest to the oldest. */
  posts: CollectionEntry<'posts'>[];
}

/** The slug of a term: its name in lower case. */
export function termSlug(name: string): string {
  return name.trim().toLowerCase();
}

/** The number of capital letters a spelling carries. */
function capitals(name: string): number {
  return (name.match(/[A-Z]/g) ?? []).length;
}

/**
 * The name a term is shown with.
 *
 * The posts spell a term as they please, and every spelling reaches the same
 * term: `AI` and `ai` are served at `/tags/ai/`. The name carries the capitals
 * the posts gave it, so a term the posts wrote `LLM` is shown as `LLM`; a term
 * they only ever wrote in lower case is shown with its first letter in upper
 * case, so a tag reads as a name and not as a word in the middle of a
 * sentence.
 *
 * A term the posts spelled more than one way is named with the spelling that
 * carries the most capitals, and with the one they used most when the
 * spellings carry as many.
 */
export function termName(spellings: Iterable<string>): string {
  const counts = new Map<string, number>();

  for (const spelling of spellings) {
    const name = spelling.trim();

    if (name === '') continue;

    counts.set(name, (counts.get(name) ?? 0) + 1);
  }

  const chosen =
    [...counts.keys()].sort(
      (a, b) =>
        capitals(b) - capitals(a) ||
        (counts.get(b) ?? 0) - (counts.get(a) ?? 0) ||
        a.localeCompare(b, 'en'),
    )[0] ?? '';

  return capitals(chosen) > 0
    ? chosen
    : chosen.charAt(0).toUpperCase() + chosen.slice(1);
}

/**
 * The terms of a taxonomy, with the posts that carry them.
 *
 * The posts of a term are the posts whose front matter names the term, no
 * matter how they spelled it: `AI` and `ai` are the same term.
 */
export function collectTerms(
  posts: CollectionEntry<'posts'>[],
  field: 'tags' | 'categories',
): Term[] {
  const spellings = new Map<string, string[]>();
  const members = new Map<string, CollectionEntry<'posts'>[]>();

  for (const post of posts) {
    for (const value of post.data[field]) {
      const slug = termSlug(value);

      if (!spellings.has(slug)) spellings.set(slug, []);
      spellings.get(slug)?.push(value.trim());

      if (!members.has(slug)) members.set(slug, []);
      members.get(slug)?.push(post);
    }
  }

  return [...spellings.keys()].map((slug) => ({
    slug,
    name: termName(spellings.get(slug) ?? []),
    posts: sortPosts(members.get(slug) ?? []),
  }));
}

/**
 * The terms in the order the widgets of the old site listed them: the terms
 * with the most posts first, the terms with the same number of posts by name.
 */
export function sortTerms(terms: Term[]): Term[] {
  return [...terms].sort(
    (a, b) =>
      b.posts.length - a.posts.length || a.name.localeCompare(b.name, 'en'),
  );
}
