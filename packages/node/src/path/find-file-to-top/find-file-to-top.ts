import path from 'path'

import { findFile } from '../find-file'

/**
 * 주어진 디렉터리부터 상위 디렉터리까지 파일을 검색하여 해당 파일의 경로를 반환하는 함수입니다.
 *
 * @category Utils/Path
 *
 * @param dir - 검색을 시작할 디렉터리의 경로
 * @param filename - 검색할 파일의 이름
 * @returns 해당 파일의 경로, 찾지 못한 경우 null 반환
 *
 * @example
 * ```typescript
 * // 주어진 디렉터리부터 상위 디렉터리까지 파일을 검색하는 예시
 * const filePath = findFileToTop('src/components', 'index.js');
 * ```
 */
export const findFileToTop = (dir: string, filename: string): string | null => {
  const found = findFile(dir, filename)
  if (found) {
    return found
  }

  const parentDir = path.resolve(dir, '..')
  if (parentDir === dir) {
    return null
  }
  return findFileToTop(parentDir, filename)
}
