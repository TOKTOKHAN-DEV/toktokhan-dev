import { curry, flow, reduce } from 'lodash/fp'

import { pass } from '../../fn'

/**
 * @category Utils/Array
 *
 * 배열을 특정 갯수로 나누어주는 함수입니다.
 *
 * @param limit - 배열을 나눌 갯수입니다.
 * @param arr - 나눌 배열입니다.
 *
 * @returns 나누어진 배열을 반환합니다.
 *
 * @example
 *
 * ```ts
 * const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * const result = paginate(3, arr)
 *
 * console.log(result)
 *
 * // [
 * //   [1, 2, 3],
 * //   [4, 5, 6],
 * //   [7, 8, 9],
 * // ]
 * ```
 */
export const paginate: {
  <T>(limit: number, arr: T[]): T[][]
  <T>(limit: number): (arr: T[]) => T[][]
} = curry(<T>(limit: number, arr: T[]): T[][] =>
  flow(
    pass(arr),
    reduce((acc: T[][], cur: T) => {
      if (acc.length === 0) {
        return acc.concat([[cur]])
      }
      if (acc[acc.length - 1].length === limit) {
        return acc.concat([[cur]])
      }

      return acc.slice(0, -1).concat([acc[acc.length - 1].concat([cur])])
    }, []),
  )(),
)
