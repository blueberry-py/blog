import type { APIContext } from 'astro';

import { postFeed, publishedPosts } from '../../lib/feed.ts';

/**
 * The feed of the articles, at the second route the old Hugo site served it at.
 *
 * The old site served an empty section `posts` at `/posts/` and a feed of it at
 * `/posts/index.xml`. The page of that section is now an alias of the archive,
 * and the feed holds the articles the archive holds.
 */
export async function GET(context: APIContext) {
  return postFeed(context, 'Posts', '/posts/', await publishedPosts());
}
