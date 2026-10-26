/**
 * The feeds of the site.
 *
 * The old Hugo site served a feed of the articles of the site, a feed of the
 * articles of every tag and of every category and a feed of the terms of every
 * taxonomy. The feeds of the new site live at the same routes, so a reader
 * that followed one of them keeps reading the same articles.
 */
import rss from '@astrojs/rss';
import type { RSSFeedItem } from '@astrojs/rss';
import type { APIContext } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer } from 'astro/container';

import { SITE_TITLE, withBase } from './site.ts';
import { sortPosts } from './posts.ts';
import type { Term } from './taxonomy.ts';

/**
 * The articles of the site that are published, from the newest to the oldest.
 *
 * @returns The published articles of the site.
 */
export async function publishedPosts(): Promise<CollectionEntry<'posts'>[]> {
  return sortPosts(
    await getCollection('posts', ({ data }) => data.draft !== true),
  );
}

/**
 * The items of a feed of articles: every article with the whole of its body.
 *
 * The body of an article is rendered the way the page of the article renders
 * it, so a reader of the feed reads the whole article and not the summary of
 * its front matter.
 *
 * @param posts The articles of the feed.
 * @returns The items of the feed.
 */
async function postItems(
  posts: CollectionEntry<'posts'>[],
): Promise<RSSFeedItem[]> {
  const container = await experimental_AstroContainer.create();

  return Promise.all(
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
}

/**
 * The title and the description of a feed, the way Hugo titled its feeds.
 *
 * Hugo titled the feed of a list with the name of the list and the name of the
 * site, and described it as the recent content of that title.
 *
 * @param name The name of the list the feed holds, e.g. `Posts`.
 * @returns The title and the description of the feed.
 */
function feedHeading(name: string): { title: string; description: string } {
  const title = `${name} on ${SITE_TITLE}`;

  return { title, description: `Recent content in ${title}` };
}

/**
 * A feed of articles.
 *
 * The site is served from the root or from the `/blog` prefix of the project
 * site on GitHub Pages, so the link of the feed and the link of every article
 * of it carry the base path of the build.
 *
 * @param context The context of the endpoint the feed is built for.
 * @param name The name of the list the feed holds, e.g. `Posts`.
 * @param link The route of the page the feed belongs to, e.g. `/post/`.
 * @param posts The articles of the feed.
 * @returns The feed of the articles.
 */
export async function postFeed(
  context: APIContext,
  name: string,
  link: string,
  posts: CollectionEntry<'posts'>[],
): Promise<Response> {
  const { title, description } = feedHeading(name);

  return rss({
    title,
    description,
    site: new URL(withBase(link), context.site).href,
    items: await postItems(posts),
    customData: '<language>en-us</language>',
  });
}

/**
 * A feed of the terms of a taxonomy: every term with the page that holds it.
 *
 * The terms are listed in the order the page of the taxonomy lists them, so a
 * reader of the feed finds the terms in the order a reader of the page finds
 * them.
 *
 * @param context The context of the endpoint the feed is built for.
 * @param name The name of the taxonomy, e.g. `Tags`.
 * @param link The route of the page of the taxonomy, e.g. `/tags/`.
 * @param terms The terms of the taxonomy.
 * @returns The feed of the terms.
 */
export async function termFeed(
  context: APIContext,
  name: string,
  link: string,
  terms: Term[],
): Promise<Response> {
  const { title, description } = feedHeading(name);

  return rss({
    title,
    description,
    site: new URL(withBase(link), context.site).href,
    items: terms.map((term) => ({
      title: term.name,
      link: withBase(`${link}${term.slug}/`),
      pubDate: term.posts[0]?.data.date,
    })),
    customData: '<language>en-us</language>',
  });
}
