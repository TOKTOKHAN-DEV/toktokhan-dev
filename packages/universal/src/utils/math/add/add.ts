import { curry } from 'lodash/fp'

import { getDecimalPlaces } from '../get-demical-places'

/**
 * @category Utils/Math
 *
 * 두개의 숫자를 더합니다. 부정확 할 수 있는 부동 소수점 연산을 보정합니다.
 * @param a - 첫번째 숫자
 * @param b - 두번째 숫자
 *
 * @returns 두 숫자를 더한 결과
 *
 * @example
 * ```ts
 * add(0.1, 0.2) // 0.3
 * add(0.1)(0.2) // 0.3
 * ```
 */
export const add: {
  (a: number, b: number): number
  (a: number): (b: number) => number
} = curry((a: number, b: number) => {
  const dem = getDecimalPlaces(a, b)
  const multiplier = 10 ** dem || 1

  return (a * multiplier + b * multiplier) / multiplier
})
