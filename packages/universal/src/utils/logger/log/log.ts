import { curry } from 'lodash'

/**
 * 주어진 값을 로깅하고 반환합니다.
 *
 * @category Utils/Logger
 *
 * @typeParam T - 로깅할 값의 타입
 * @param title - 로그 제목
 * @param value - 로깅할 값
 * @returns 주어진 값
 *
 * @example
 * ```typescript
 * const result = log('Result:', 42); // Result: 42
 * const result = log('Result:')(42); // Result: 42
 *
 * const ex = flow(
 *  add(1),
 *  log('debug:'), // debug
 *  add(2)
 * )
 *
 * ex(1) debug: 2
 *
 * ```
 *
 * @curried
 */
export const log: {
  <T>(title: string, value: T): T
  <T>(title: string): (value: T) => T
} = curry(<T>(title: string, value: T): T => {
  console.log(title, value)
  return value
})
