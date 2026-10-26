import type { CollectionEntry } from 'astro:content';

import { sortPosts } from './posts.ts';

/**
 * A term of the site: a tag or a category.
 *
 * The terms of the old Hugo site were built from the front matter of the
 * posts: the name of a term was the name the posts gave it, and the URL of a
 * term was that name in lower case.
 */
export interface Term {
  /** The slug of the term: the name in lower case, the way Hugo served it. */
  slug: string;
  /** The name the term is shown with. */
  name: string;
  /** The posts that carry the term, from the newest to the oldest. */
  posts: CollectionEntry<'posts'>[];
}

/** The slug Hugo served a term at: the name of the term in lower case. */
export function termSlug(name: string): string {
  return name.trim().toLowerCase();
}

/**
 * The name Hugo showed a term with.
 *
 * Hugo titled a term with the spelling its posts used, and used the lower case
 * spelling when the posts used both spellings: the posts that carried `AI` and
 * `ai` gave the term the name `Ai`, a term that only ever appeared as `GPT`
 * stayed `GPT`.
 */
export function termName(spellings: Iterable<string>): string {
  const names = [...new Set([...spellings].map((name) => name.trim()))].sort();
  const lower = names.find((name) => name === name.toLowerCase());
  const chosen = lower ?? names[0] ?? '';

  return chosen.charAt(0).toUpperCase() + chosen.slice(1);
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
  const spellings = new Map<string, Set<string>>();
  const members = new Map<string, CollectionEntry<'posts'>[]>();

  for (const post of posts) {
    for (const value of post.data[field]) {
      const slug = termSlug(value);

      if (!spellings.has(slug)) spellings.set(slug, new Set());
      spellings.get(slug)?.add(value.trim());

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
