import { curry } from 'lodash'

/**
 * @category Utils/Fn
 *
 * Promise 를 받아 resolve 된 값으로 함수를 실행합니다.
 *
 * @example
 * ```ts
 * const double = (x: number) => x * 2
 * const target = 5
 * const targetPromise = Promise.resolve(5)
 *
 * const result = awaited(double, target) // 10
 * const resultPromise = awaited(double, targetPromise) // 10
 *
 * // curried
 * flow(() => Promise.resolve(5), awaited(double))
 * ```
 */
export const awaited: {
  <P, R>(fn: (p: P) => R, data: P | PromiseLike<P>): R
  <P, R>(fn: (p: P) => R): (data: P | PromiseLike<P>) => R
} = curry(<P, R>(fn: (p: P) => R, data: P | PromiseLike<P>) => {
  if (data instanceof Promise) {
    return data.then(fn)
  }
  return fn(data as P)
})
