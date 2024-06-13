import path from 'path'

import { findFileToTop } from '../find-file-to-top'

/**
 * 주어진 디렉터리부터 상위 디렉터리에 있는 package.json 파일의 경로를 기준으로
 * 상대 경로를 사용하여 디렉터리를 생성하는 함수를 반환합니다.
 *
 * @category Utils/Path
 *
 * @param dir - 상위 디렉터리에 있는 package.json 파일을 찾을 시작 디렉터리의 경로
 * @returns 생성된 디렉터리의 경로를 반환하는 함수
 *
 * @example
 * ```typescript
 * // 주어진 디렉터리부터 상위 디렉터리의 package.json 파일을 찾아 상대 경로를 사용하여 디렉터리를 생성하는 함수를 생성하는 예시
 * const createRootDir = createPackageRoot(__dirname);
 * const myDir = createRootDir('src', 'components', 'Button');
 * ```
 */
export const createPackageRoot =
  (dir: string) =>
  (...paths: string[]): string => {
    const packageJson = findFileToTop(dir, 'package.json')
    if (!packageJson) throw new Error('package.json not found')

    const root = path.dirname(packageJson)

    return path.resolve(root, ...paths)
  }

/**
 *
 * @category Utils/Path
 *
 * 현재 모듈의 디렉터리를 기준으로 package.json 파일의 상위 디렉터리에 있는 package.json 파일의 경로를 기준으로
 * 상대 경로를 사용하여 디렉터리를 생성하는 함수입니다.
 *
 * @example
 * ```typescript
 * // 현재 모듈의 디렉터리를 기준으로 디렉터리를 생성하는 함수를 생성하는 예시
 * const myDir = packageRoot('src', 'components', 'Button');
 * ```
 */
export const packageRoot = createPackageRoot(__dirname)
