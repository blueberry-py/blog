import type { APIContext } from 'astro';

import { GET as feed } from './rss.xml.ts';

/**
 * The feed of the posts at the URL the old Hugo site served it at.
 *
 * The feed itself lives in `rss.xml.ts`; this route keeps `/index.xml` alive
 * for the readers that followed it.
 */
export async function GET(context: APIContext) {
  return feed(context);
}
