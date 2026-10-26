import type { APIContext } from 'astro';

import { postFeed, publishedPosts } from '../../../lib/feed.ts';
import type { Term } from '../../../lib/taxonomy.ts';
import { collectTerms } from '../../../lib/taxonomy.ts';

export async function getStaticPaths() {
  const posts = await publishedPosts();

  return collectTerms(posts, 'tags').map((term) => ({
    params: { tag: term.slug },
    props: { term },
  }));
}

/**
 * The feed of the articles of a tag, at the route the old Hugo site served it at.
 *
 * The old site served the feed of a tag at `/tags/<term>/index.xml`; the feed
 * holds the articles the page of the tag holds.
 */
export async function GET(context: APIContext) {
  const { term } = context.props as { term: Term };

  return postFeed(context, term.name, `/tags/${term.slug}/`, term.posts);
}
