import path from 'path'

import { curry } from 'lodash'

/**
 * 주어진 기준 경로를 대상 경로와 결합하여 새 경로를 생성합니다.
 *
 * @category Utils/Path
 *
 * @param base - 기준 경로입니다.
 * @param target - 대상 경로입니다.
 * @returns 기준 경로와 대상 경로를 결합한 새 경로를 반환합니다.
 *
 * @example
 * ```typescript
 * // 주어진 기준 경로를 대상 경로와 결합하여 새 경로를 생성하는 예시
 * const resolvePath = pathOn('/home/user');
 * const result = resolvePath('file.txt'); // '/home/user/file.txt'
 * ```
 */
export const pathOn: {
  (base: string): (target: string) => string
  (base: string, target: string): string
} = curry((base: string, target: string) => path.join(base, target))
