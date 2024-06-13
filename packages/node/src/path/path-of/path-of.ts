import path from 'path'

import { curry } from 'lodash'

/**
 * 주어진 대상 경로를 기준 경로와 결합하여 새 경로를 생성합니다.
 *
 * @category Utils/Path
 *
 * @param target - 대상 경로입니다.
 * @param base - 기준 경로입니다.
 * @returns 대상 경로와 기준 경로를 결합한 새 경로를 반환합니다.
 *
 * @example
 * ```typescript
 * // 주어진 대상 경로를 기준 경로와 결합하여 새 경로를 생성하는 예시
 * const resolvePath = pathOf('file.txt');
 * const result = resolvePath('/home/user'); // '/home/user/file.txt'
 * ```
 */
export const pathOf: {
  (target: string): (base: string) => string
  (target: string, base: string): string
} = curry((target: string, base: string) => path.join(base, target))
