import { relay } from '@toktokhan-dev/universal'

import { range } from 'lodash'

import { genSitemap } from '.'

// console.log(path.relative(path.resolve('./pages'), path.resolve('./pages/index.tsx'))

const list = range(0, 100)
const getList = async (params: { offset: number; limit: number }) => {
  const { offset, limit } = params
  const next = offset + limit
  return {
    total: list.length,
    next: list.length - 1 < next ? null : next,
    data: list.slice(offset, offset + limit),
  }
}

genSitemap.run({
  domain: 'https://example.com',
  input: './pages',
  output: './public/sitemap.xml',
  includes: ['**/*.{ts,tsx}'],
  ignored: ['**/_app.{ts,tsx}', '**/_document.{ts,tsx}', '**/_error.{ts,tsx}'],
  routerType: 'page',
  routeMapper: {
    '/goods/[id]': relay({
      initialParam: 0,
      getNext: (nextParam: number) => getList({ offset: nextParam, limit: 10 }),
      getNextParams: (last) => last?.next,
      selector: (pages) =>
        pages.map((p) => p.data.map((id) => `/goods/${id}`)).flat(),
    }),
  },
  priority: {
    1: ['/'],
    0.5: ['/payment/*', ['/goods/*', '!/goods/review']],
  },
  changefreq: {
    always: [],
    daily: [],
    hourly: ['/payment/*'],
    monthly: [],
    never: [],
    weekly: [],
    yearly: [],
  },
})
