import { existsSync, readdirSync } from 'fs'
import path from 'path'

import { boxLog, cwd, pathOf, pathOn, yaml } from '@toktokhan-dev/node'
import { isEvery, or, pass, removeStr } from '@toktokhan-dev/universal'

import { filter, flatMap, flow, map, prop } from 'lodash/fp'

export const hasApiExtractorConfig: (dirPath: string) => boolean = flow(
  pathOf('api-extractor.json'),
  existsSync,
)

export const hasPackageJson: (dirPath: string) => boolean = flow(
  pathOf('package.json'),
  existsSync,
)

export const readDirPaths = (root: string): string[] => {
  if (!existsSync(root)) return []
  const files = readdirSync(root, { withFileTypes: true })
  return files
    .filter((f) => f.isDirectory())
    .map((f) => path.resolve(f.path, f.name))
}

export const getWorkspacePackages: (basePath: string) => string[] = flow(
  pathOf('pnpm-workspace.yaml'),
  yaml<{ packages: string[] }>,
  flow(prop('packages'), or([])),
)

export const packageHasDoc: () => string[] = flow(
  flow(pass(cwd()), getWorkspacePackages),
  map(
    flow(
      flow(pathOn(cwd()), removeStr('/*'), readDirPaths),
      filter(isEvery([hasPackageJson, hasApiExtractorConfig])),
    ),
  ),
  flatMap((p) => p),
)

export const match =
  (params: Parameters<typeof String.prototype.match>[0]) => (str: string) => {
    return str.match(params)
  }

export const matchAll =
  (params: Parameters<typeof String.prototype.matchAll>[0]) =>
  (str: string) => {
    return Array.from(str.matchAll(params))
  }

export const tagRgx = (tag: string, flags?: string) => {
  return new RegExp(`<${tag}>(.*?)</${tag}>`, flags)
}

export const isHeading2Start = (str: string): boolean => {
  return str.indexOf('## ') === 0
}

export const extractTag = (tag: string): ((string: string) => string) =>
  flow(match(tagRgx(tag)), prop(1))

export const extractTags = (tag: string): ((string: string) => string[]) =>
  flow(matchAll(tagRgx(tag, 'g')), map(prop(1)))

export const includesStr = (str: string) => (target: string) =>
  target.includes(str)

export const byProcessCode =
  (resolve, reject, errorMsg: string) => (code: number) => {
    if (code === 0) return resolve()
    if (code === 1) {
      boxLog(
        [
          errorMsg,
          'Please check the above logs for detailed error information ',
        ],
        { title: '%Generate Doc Error%' },
      )
      return reject()
    }

    return reject(`unhandled code ${code}`)
  }
