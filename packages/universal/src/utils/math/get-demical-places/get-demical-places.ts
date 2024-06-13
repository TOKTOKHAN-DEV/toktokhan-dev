import { flow, map, prop, split, spread, toString } from 'lodash/fp'

import { or } from '../../fn'

const collect = <T>(...args: T[]): T[] => args

/**
 * @category Utils/Math
 *
 * 숫자들의 소수점 자리수중 가장 긴 소수점 자리의 길이를 구합니다.
 *
 * @param numnbers - 소수점 자리수를 구할 숫자들
 *
 * @returns 소수점 자리수
 * @example
 * ```ts
 * getDecimalPlaces(0.1, 0.2) // 1
 * getDecimalPlaces(0.1, 0.02, 0.3) // 2
 * getDecimalPlaces(0.1, 0.2, 0.333, 0.4) // 3
 */
export const getDecimalPlaces: (...numnbers: number[]) => number = flow(
  collect,
  map(flow(toString, split('.'), prop(1), or(''), prop('length'))),
  spread(Math.max),
)
