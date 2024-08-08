import path from 'path'
import util from 'util'

import { defineCommand } from '@toktokhan-dev/cli'
import {
  convertFilePathToObject,
  cwd,
  generateCodeFile,
  renderExportConst,
} from '@toktokhan-dev/node'
import { Obj, flatObject, keep } from '@toktokhan-dev/universal'

import { compact, flow, snakeCase } from 'lodash'

/**
 * pages 폴더를 조회하여 route 경로를 포함한 객체를 생성합니다.
 * `next.js page router`에서 사용가능합니다.
 *
 * @packageDocumentation
 */

/**
 * @category Types
 */
export interface GenRouteConfig {
  /** 조회할 page 파일들이 포함되어있는 폴더 입니다. */
  input?: string
  /** 생성될 파일이 위치할 경로입니다.*/
  output?: string
  /** 생성될 route 객체의 이름입니다 */
  displayName?: string
  /** 포함할 route 의 glob 패턴입니다. */
  includes?: string[]
  /** 제외될 route 의 glob 패턴입니다. */
  ignored?: string[]
  /** one depth  가 true 일 경우, 폴더 구조를 무시하고 one depth 로 객체를 생성합니다.*/
  oneDepth?: boolean
}

/**
 * @category Commands
 */
export const genRoutePage = defineCommand<'gen:route', GenRouteConfig>({
  name: 'gen:route',
  description: 'Generate route object from page files in the folder.',

  cliOptions: [
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
      name: 'displayName',
      alias: 'd',
      type: 'string',
      description: '생성될 route 객체의 이름입니다',
    },
    {
      name: 'includes',
      alias: 'ic',
      type: 'string[]',
      description: '포함할 route 의 glob 패턴입니다.',
    },
    {
      name: 'ignored',
      alias: 'ig',
      type: 'string[]',
      description: '제외할 route 의 glob 패턴입니다.',
    },
    {
      name: 'oneDepth',
      alias: 'od',
      type: 'boolean',
      description:
        'one depth  가 true 일 경우, 폴더 구조를 무시하고 one depth 로 객체를 생성합니다.',
    },
  ],

  default: {
    input: 'src/pages',
    output: 'src/generated/path/routes.ts',
    displayName: 'ROUTES',
    ignored: ['_app.tsx', '_document.tsx', '_error.tsx', 'api/**'],
  },

  run: flow(
    keep,
    keep.map(prop('input')),
    keep.map(firstArg(cwd)),
    keep.map<GenRouteConfig, string, Obj>((value, kept) =>
      convertFilePathToObject<string>(
        {
          basePath: '/',
          includingPattern: kept.includes?.map(globAllDir),
          ignoredPattern: kept.ignored?.map(globAllDir),
          formatKey: getRouteKey,
          formatValue: getRouteValue,
        },
        value,
      ),
    ),
    keep.map<GenRouteConfig, Obj, any>((value, kept) =>
      kept.oneDepth ? flatObject({ formatKey: getFlatObjKey }, value) : value,
    ),
    keep.map(generateRouteFile),
  ),
})

function prop(key: string) {
  return (obj: Record<string, any>) => obj[key]
}

function firstArg(fn: (...param: any[]) => any) {
  return (...param: any[]) => fn(param[0])
}

function globAllDir(pattern: string) {
  return path.join('**', pattern)
}

function getRouteKey(key: string) {
  if (key === 'index') return 'MAIN'
  const [dynamicPattern] = Array.from(key.matchAll(/\[(.*?)\]/g))

  if (dynamicPattern?.[1])
    return snakeCase(`by ${dynamicPattern[1]}`).toUpperCase()
  return snakeCase(key).toUpperCase()
}

function getRouteValue(data: {
  key: string
  path: string
  wholePath: string
  info: path.ParsedPath
}) {
  const replaced = data.path.replace(/\.(tsx|ts)$/, '').replace(/index/, '')
  if (replaced.endsWith('/'))
    return replaced.substring(0, replaced.length - 1) || '/'
  return replaced
}

function getFlatObjKey(parentKey: string | null, currentKey: string) {
  return snakeCase(compact([parentKey, currentKey]).join(' ')).toUpperCase()
}

function generateRouteFile(data: Record<string, any>, config: GenRouteConfig) {
  if (!config.displayName) throw new Error('displayName is required')
  if (!config.output) throw new Error('output is required')

  const view = renderExportConst(
    config.displayName,
    util.inspect(data, { depth: Infinity }),
  )
  generateCodeFile({ outputPath: config.output }, view)
}
