import type { APIContext } from 'astro';

import { postFeed, publishedPosts } from '../../lib/feed.ts';

/**
 * The feed of the articles, at the route the old Hugo site served it at.
 *
 * The old site served the feed of its section `post` at `/post/index.xml`. The
 * page of that section is now an alias of the archive, and the feed stays at
 * the route a reader of the old site followed.
 */
export async function GET(context: APIContext) {
  return postFeed(context, 'Posts', '/post/', await publishedPosts());
}
