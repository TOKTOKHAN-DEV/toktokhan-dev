import fs from 'fs'
import path from 'path'

import { removeEmptyObject } from '@toktokhan-dev/universal'

import { camelCase, curry, snakeCase, startCase } from 'lodash'

import { checkFileAccess } from '../../fs/check-file-access'

type Options<T = string> = {
  includingPattern?: string[]
  ignoredPattern?: string[]
  recursive?: boolean
  basePath?: string
  formatKey?: (
    str: string,
    util: {
      toUpperSnakeCase: (str: string) => string
      toPascalCase: (str: string) => string
    },
  ) => string
  formatValue?: (data: {
    key: string
    path: string
    wholePath: string
    info: path.ParsedPath
  }) => T
}

type PathObj<T = string> = {
  [x in string]: T | PathObj<T>
}

export const _convertFilePathToObject = <T>(
  params: Options<T>,
  targetPath: string,
): PathObj<T> => {
  const {
    includingPattern = [],
    ignoredPattern = [],
    recursive = true,
    basePath = '',
    formatKey = toUpperSnakeCase,
    formatValue,
  } = params || {}

  const result = {}

  const setFile = (TPath: string, obj: PathObj) => {
    fs.readdirSync(TPath, { withFileTypes: true }) //
      .forEach((file) => {
        const targetFile = path.join(TPath, file.name)
        const targetFileInfo = path.parse(targetFile)

        const isTargetFile = checkFileAccess({
          filename: targetFile,
          ignored: ignoredPattern,
          include: includingPattern,
        })

        const key = formatKey(targetFileInfo.name, {
          toUpperSnakeCase,
          toPascalCase,
        })

        if (isTargetFile && !file.isDirectory()) {
          let resolvedPath = targetFile.replace(targetPath + '/', '')

          resolvedPath = path.join(basePath, resolvedPath)

          obj[key] =
            formatValue?.({
              key,
              path: resolvedPath,
              wholePath: targetFile,
              info: targetFileInfo,
            }) || resolvedPath

          return
        }
        if (recursive && file.isDirectory()) {
          obj[key] = {}

          setFile(targetFile, obj[key] as PathObj)
        }
      })
  }
  setFile(targetPath, result)
  return removeEmptyObject(result)
}

export const convertFilePathToObject: {
  <T>(params: Options<T>, targetPath: string): PathObj<T>
  <T>(params: Options<T>): (targetPath: string) => PathObj<T>
} = curry(_convertFilePathToObject)

function toUpperSnakeCase(str: string) {
  return snakeCase(str).toUpperCase()
}

function toPascalCase(str: string) {
  return startCase(camelCase(str)).replace(/ /g, '')
}
