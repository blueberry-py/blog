import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

import { SITE_SUBTITLE, SITE_TITLE, withBase } from '../lib/site.ts';
import { sortPosts } from '../lib/posts.ts';

/**
 * The feed of the posts.
 *
 * The site is served from the root or from the `/blog` prefix of the project
 * site on GitHub Pages, so the canonical URL of the feed is built from the
 * base path of the build and every link of an item carries it as well.
 */
export async function GET(context: APIContext) {
  const posts = sortPosts(
    await getCollection('posts', ({ data }) => data.draft !== true),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_SUBTITLE,
    site: new URL(withBase('/'), context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: withBase(`/post/${post.id}/`),
      categories: [...post.data.categories, ...post.data.tags],
      author: post.data.authors.join(', '),
    })),
    customData: '<language>en-us</language>',
  });
}
