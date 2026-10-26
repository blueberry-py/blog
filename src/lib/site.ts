/**
 * The identity of the blog and the helpers that follow from it.
 *
 * The values come from the configuration of the old Hugo site
 * (`config/_default/config.toml`): the name, the subtitle, the timezone the
 * articles were written in and the way their dates were shown.
 */

/** The name of the site, shown in the header, in the footer and in the titles. */
export const SITE_TITLE = 'BlueberryPy';

/** The subtitle of the site, shown under the name. */
export const SITE_SUBTITLE = 'Python & Fun';

/** The handle of the site on the social network the old site linked to. */
export const SITE_TWITTER_HANDLE = '@linzeyang';

/** The license the articles of the site are published under. */
export const SITE_LICENSE = 'Licensed under CC BY-NC-SA 4.0';

/** The year the site started publishing its articles. */
export const SITE_START_YEAR = 2024;

/** The timezone the articles are dated in. */
export const SITE_TIMEZONE = 'Asia/Shanghai';

/**
 * The offset of the site's timezone.
 *
 * Asia/Shanghai has no daylight saving time since 1991, so every date the
 * blog shows carries this offset.
 */
const SITE_UTC_OFFSET = '+08:00';

/**
 * The name of the site's timezone.
 *
 * Hugo printed the dates with the abbreviation of the zone, which for
 * Asia/Shanghai is `CST`. `Intl` only knows the offset (`GMT+8`), so the
 * abbreviation of the old site is kept here.
 */
const SITE_TIMEZONE_NAME = 'CST';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: SITE_TIMEZONE,
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

const isoFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: SITE_TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

/** The parts of a date in the site's timezone, as `Intl` reports them. */
function dateParts(
  formatter: Intl.DateTimeFormat,
  date: Date,
): Map<string, string> {
  return new Map(
    formatter.formatToParts(date).map((part) => [part.type, part.value]),
  );
}

/**
 * A date the way Hugo showed it: `Mon Jan 2 2006 15:04:05 MST`.
 *
 * The site is written in Asia/Shanghai, so the time is the local time of the
 * article and not the time of the machine that builds the site.
 */
export function formatDate(date: Date): string {
  const parts = dateParts(dateFormatter, date);

  return [
    parts.get('weekday'),
    parts.get('month'),
    parts.get('day'),
    parts.get('year'),
    `${parts.get('hour')}:${parts.get('minute')}:${parts.get('second')}`,
    SITE_TIMEZONE_NAME,
  ].join(' ');
}

/** A date as the `datetime` attribute of a `<time>` element. */
export function formatDateTime(date: Date): string {
  const parts = dateParts(isoFormatter, date);

  return `${parts.get('year')}-${parts.get('month')}-${parts.get('day')}T${parts.get('hour')}:${parts.get('minute')}:${parts.get('second')}${SITE_UTC_OFFSET}`;
}

/** The base path of the deployment: `/` for the root hosts, `/blog/` for GitHub Pages. */
const base = import.meta.env.BASE_URL ?? '/';

/** The base path without its trailing slash, so it can be prefixed to a path. */
const basePrefix = base.endsWith('/') ? base.slice(0, -1) : base;

/**
 * A site URL that works under the configured base path.
 *
 * The project site on GitHub Pages is served from `/blog`, every other host
 * serves the same pages from the root, so every link of the site has to be
 * built from the base path of the build.
 */
export function withBase(pathname: string): string {
  return `${basePrefix}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

/** The path of the current page, without the base path of the deployment. */
export function currentPath(url: URL): string {
  const pathname = url.pathname.startsWith(basePrefix)
    ? url.pathname.slice(basePrefix.length)
    : url.pathname;

  return pathname || '/';
}
