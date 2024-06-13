import fs from 'fs'
import path from 'path'

import { curry } from 'lodash'

const _forEachFiles = (
  param: {
    each: (file: fs.Dirent) => void
    recursive?: boolean
    filter?: (file: fs.Dirent) => boolean
  },
  TPath: string,
) => {
  const { each, recursive = true, filter = () => true } = param

  const targetFiles = fs.readdirSync(TPath, { withFileTypes: true })

  targetFiles.forEach((file) => {
    const filePath = path.resolve(TPath, file.name)
    if (recursive && file.isDirectory()) {
      _forEachFiles({ recursive, filter, each }, filePath)
    }
    if (!filter(file)) return
    each(file)
  })
}

/**
 * 주어진 디렉터리 내의 모든 파일 및 디렉터리에 대해 지정된 작업을 수행하는 함수입니다.
 *
 * @category Utils/Path
 *
 * @param param - 각 파일 또는 디렉터리에 대해 실행할 작업과 설정
 * @param TPath - 작업을 수행할 디렉터리의 경로
 *
 * @example
 * ```typescript
 * // 주어진 디렉터리 내의 모든 파일 및 디렉터리에 대해 작업을 수행하는 예시
 * forEachFiles({
 *   each: (file) => console.log(file.name),
 *   recursive: true,
 *   filter: (file) => file.isDirectory(),
 * }, 'src');
 * ```
 */
export const forEachFiles: {
  (
    param: {
      each: (file: fs.Dirent) => void
      recursive?: boolean
      filter?: (file: fs.Dirent) => boolean
    },
    TPath: string,
  ): void
  (
    param: {
      each: (file: fs.Dirent) => void
      recursive?: boolean
      filter?: (file: fs.Dirent) => boolean
    },
    path: string,
  ): void
  (param: {
    each: (file: fs.Dirent) => void
    recursive?: boolean
    filter?: (file: fs.Dirent) => boolean
  }): (TPath: string) => void
} = curry(_forEachFiles)
