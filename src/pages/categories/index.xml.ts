import type { APIContext } from 'astro';

import { publishedPosts, termFeed } from '../../lib/feed.ts';
import { collectTerms, sortTerms } from '../../lib/taxonomy.ts';

/**
 * The feed of the categories of the site, at the route the old Hugo site served
 * it at.
 *
 * The old site served a feed of its terms at `/categories/index.xml`; the feed
 * holds the same categories the page of the categories holds.
 */
export async function GET(context: APIContext) {
  const posts = await publishedPosts();

  return termFeed(
    context,
    'Categories',
    '/categories/',
    sortTerms(collectTerms(posts, 'categories')),
  );
}
