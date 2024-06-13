import { Obj, isNullish, pass } from '@toktokhan-dev/universal'

import { find, flow, prop } from 'lodash/fp'
import { isMatch } from 'matcher'

import { GenSitemapConfig } from '.'

export const isInWildcard = (target: string) => (patterns: string | string[]) =>
  isMatch(target, patterns)

export const findKeyHasWildCard = (obj: Obj) => (key: string) =>
  flow(
    pass(obj),
    Object.entries,
    find(flow(prop(1), find(isInWildcard(key)))),
    prop(0),
  )()

export const renderSitemap = (
  sites: {
    loc: string
    changefreq?: string
    priority?: string
  }[],
) => {
  return `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sites
      .map(({ changefreq, loc, priority }) => {
        return `<url>
                <loc>${loc}</loc>
                ${isNullish(priority) ? '' : `<priority>${priority}</priority>`}
                ${isNullish(changefreq) ? '' : `<changefreq>${changefreq}</changefreq>`}
              </url>`
      })
      .join('\n')}
  </urlset> 
  `
}

export const routesBy =
  (routeMapper: GenSitemapConfig['routeMapper']) => async (route: string) => {
    const routes = routeMapper?.[route]
    if (typeof routes === 'function') {
      return routes()
    }
    if (routes) {
      return routes
    }

    return route
  }

export const hasDynamicRoute = (str: string) => !!str.match(/\[.*\]/)
