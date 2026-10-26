import type { APIContext } from 'astro';

import { postFeed, publishedPosts } from '../../../lib/feed.ts';
import type { Term } from '../../../lib/taxonomy.ts';
import { collectTerms } from '../../../lib/taxonomy.ts';

export async function getStaticPaths() {
  const posts = await publishedPosts();

  return collectTerms(posts, 'categories').map((term) => ({
    params: { category: term.slug },
    props: { term },
  }));
}

/**
 * The feed of the articles of a category, at the route the old Hugo site served
 * it at.
 *
 * The old site served the feed of a category at `/categories/<term>/index.xml`;
 * the feed holds the articles the page of the category holds.
 */
export async function GET(context: APIContext) {
  const { term } = context.props as { term: Term };

  return postFeed(context, term.name, `/categories/${term.slug}/`, term.posts);
}
