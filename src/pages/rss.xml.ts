import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer } from 'astro/container';

import { SITE_SUBTITLE, SITE_TITLE, withBase } from '../lib/site.ts';
import { sortPosts } from '../lib/posts.ts';

/**
 * The feed of the posts.
 *
 * The site is served from the root or from the `/blog` prefix of the project
 * site on GitHub Pages, so the canonical URL of the feed is built from the
 * base path of the build and every link of an item carries it as well.
 *
 * The description of an item is the body of the post, rendered as the page of
 * the post renders it, the way the feed of the old site held it: a reader of
 * the feed reads the whole article and not the summary of its front matter.
 */
export async function GET(context: APIContext) {
  const posts = sortPosts(
    await getCollection('posts', ({ data }) => data.draft !== true),
  );
  const container = await experimental_AstroContainer.create();

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      const body = await container.renderToString(Content);

      return {
        title: post.data.title,
        description: body,
        pubDate: post.data.date,
        link: withBase(`/post/${post.id}/`),
        categories: [...post.data.categories, ...post.data.tags],
        author: post.data.authors.join(', '),
      };
    }),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_SUBTITLE,
    site: new URL(withBase('/'), context.site).href,
    items,
    customData: '<language>en-us</language>',
  });
}
