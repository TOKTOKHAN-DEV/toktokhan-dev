import path from 'path'

import { defineCommand } from '@toktokhan-dev/cli'
import { generateCodeFile, pathOn } from '@toktokhan-dev/node'
import {
  awaitted,
  createObjBySelector,
  log,
  not,
  pass,
  prefix,
  removeStr,
} from '@toktokhan-dev/universal'

import { globby } from 'globby'
import { flatMap } from 'lodash'
import { filter, flow, map, union } from 'lodash/fp'

import {
  findKeyHasWildCard,
  hasDynamicRoute,
  renderSitemap,
  routesBy,
} from './utils'

/**
 * `next.js page router`버전의 pages 폴더 기반으로 `sitemap.xml` 파일을 생성합니다.
 * @packageDocumentation
 */

/**
 * @category Types
 */
export type Changefreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

/**
 * @category Types
 */
export type Priority =
  | 1
  | 0.9
  | 0.8
  | 0.7
  | 0.6
  | 0.5
  | 0.4
  | 0.3
  | 0.2
  | 0.1
  | 0

/**
 * @category Types
 */
export type RouterType = 'page' | 'app'

/**
 * @category Types
 */
export interface GenSitemapConfig {
  /**
   * 도메인 주소입니다.
   */
  domain: string
  /**
   * 조회할 page 파일들이 포함되어있는 폴더 입니다.
   */
  input: string
  /**
   * 생성될 파일이 위치할 경로입니다.
   */
  output: string
  /**
   * Next.js 라우터 타입입니다.
   */
  routerType: RouterType
  /**
   * sitemap 에 포함되는 파일 glob 패턴 입니다.
   */
  includes?: string[]
  /**
   * sitemap 에 포함되지 않는 파일 glob 패턴 입니다.
   */
  ignored?: string[]
  /**
   * 특정 라우트를 의도한 경로로 변경하기 위한 객체입니다.
   * key 로 파일상의 정확한 route 경로를 받고, value 로 변경될 경로, 경로 배열을 받습니다.
   *
   * ex -> { '/': '/home' }
   * ex -> { '/detail/[id]' : getIds().map(id => `/detail/${id}`) }
   * ex -> { '/detail/[id]' : '/detail/sitemap.xml' }
   */
  routeMapper?: Partial<
    Record<
      string,
      | string
      | string[]
      | Promise<string | string[]>
      | (() => string | string[])
      | (() => Promise<string | string[]>)
    >
  >
  /**
   * sitemap 의 changefreq 를 설정하기 위한 객체입니다.
   * key 로 changefreq 중 특정 값을 받고, value 로 해당 changefreq 를 가지는 경로의 glob 패턴, glob 패턴 배열의 배열을 받습니다.
   *
   * ex -> { 'daily': ['/comment/*', ['/goods/*', !goods/review ]] }
   */
  changefreq?: Partial<Record<Changefreq, (string | string[])[]>>
  /**
   * sitemap 의 0 부터 1 까지의 priority 를 설정하기 위한 객체입니다.
   * key 로 priority 중 특정 값을 받고, value 로 해당 priority 를 가지는 경로의 glob 패턴, glob 패턴 배열의 배열을 받습니다.
   *
   * ex -> { 1: ['/comment/*', ['/goods/*', !goods/review ]] }
   */
  priority?: Partial<Record<Priority, (string | string[])[]>>
}

/**
 * @category Commands
 */
export const genSitemap = defineCommand<'gen:sitemap', GenSitemapConfig>({
  name: 'gen:sitemap',
  description:
    'next.js page router 에서 pages 폴더 기반으로 sitemap.xml 파일을 생성합니다.',

  cliOptions: [
    {
      name: 'domain',
      alias: 'd',
      type: 'string',
      description: '도메인 주소입니다.',
    },
    {
      name: 'input',
      alias: 'i',
      type: 'string',
      description: '조회할 page 파일들이 포함되어있는 폴더 입니다.',
    },
    {
      name: 'output',
      alias: 'o',
      type: 'string',
      description: '생성될 파일이 위치할 경로입니다.',
    },

    {
      name: 'includes',
      alias: 'ic',
      type: 'string[]',
      description: 'sitemap 에 포함되는 파일 glob 패턴 입니다.',
    },
    {
      name: 'ignored',
      alias: 'ig',
      type: 'string[]',
      description: 'sitemap 에 포함되지 않는 파일 glob 패턴 입니다.',
    },
  ],

  default: {
    input: './pages',
    output: './public/sitemap.xml',
    routerType: 'page',
    includes: ['**/*.{ts,tsx}'],
    ignored: [
      '**/api/**',
      '**/_app.{ts,tsx}',
      '**/_document.{ts,tsx}',
      '**/_error.{ts,tsx}',
    ],
  },
  run: async (config) => {
    const {
      domain,
      input,
      output,
      routerType,
      changefreq,
      priority,
      ignored,
      includes,
      routeMapper,
    } = config

    if (!domain) {
      throw new Error('domain is required')
    }

    const removeTarget = routerType === 'page' ? 'index' : 'page'
    const removeTargetRegex = new RegExp(
      `/?${removeTarget}(\\.tsx|\\.ts|\\.js|\\.jsx)?$`,
      'g',
    )

    flow(
      pass(includes?.map(pathOn(input))),
      union(ignored?.map(flow(pathOn(input), prefix('!')))),
      globby,
      awaitted(
        map(
          flow(
            (t) => path.relative(input, t),
            removeStr(removeTargetRegex),
            prefix('/'),
            routesBy(routeMapper),
          ),
        ),
      ),
      awaitted((d) => Promise.all(d)),
      awaitted(
        flow(
          log("sitemap's routes"),
          flatMap,
          filter(not(hasDynamicRoute)),
          map(
            createObjBySelector<any>({
              loc: pathOn(domain),
              priority: findKeyHasWildCard(priority || {}),
              changefreq: findKeyHasWildCard(changefreq || {}),
            }),
          ),
          renderSitemap,
          generateCodeFile({
            outputPath: output,
            prettier: {
              parser: 'html',
            },
          }),
        ),
      ),
    )()
  },
})
