import type { APIContext } from 'astro';

import { publishedPosts, termFeed } from '../../lib/feed.ts';
import { collectTerms, sortTerms } from '../../lib/taxonomy.ts';

/**
 * The feed of the tags of the site, at the route the old Hugo site served it at.
 *
 * The old site served a feed of its terms at `/tags/index.xml`; the feed holds
 * the same tags the page of the tags holds.
 */
export async function GET(context: APIContext) {
  const posts = await publishedPosts();

  return termFeed(
    context,
    'Tags',
    '/tags/',
    sortTerms(collectTerms(posts, 'tags')),
  );
}
