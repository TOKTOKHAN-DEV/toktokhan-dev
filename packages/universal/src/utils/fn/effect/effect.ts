import { curry } from 'lodash'

/**
 *
 * 함수를 실행하고, 인자를 그대로 반환합니다.
 * 컴포넌트 합성시(lodash.flow) 함수의 응닶값에 영향을 미치지 않고 특정 함수를 실행시키고 싶을 경우 유용합니다.
 *
 * @category Utils/Fn
 *
 * @typeParam T - 함수에 전달할 인자의 타입
 * @param fn - 실행할 함수
 * @param x - 실행할 함수에 전달할 인자
 * @returns 실행할 함수에 전달한 인자
 *
 * @example
 * ```ts
 * effect(console.log, 'hello') // 'hello'를 출력하고 'hello'를 반환합니다.
 *
 * effect(console.log)('hello') // 'hello'를 출력하고 'hello'를 반환합니다.
 *
 * const log = effect(console.log)
 * log('hello') // 'hello'를 출력하고 'hello'를 반환합니다.
 *
 * const dotToDash = flow(split("."), effect(console.log), join('-'))
 * dotToDash('a.b.c') // ['a', 'b', 'c'] 를 출력하고 'a-b-c'를 반환합니다.
 * ```
 * @curried
 */
export const effect: {
  <T>(fn: (x: T) => void, x: T): T
  <T>(fn: (x: T) => void): (x: T) => T
} = curry(<T>(fn: (x: T) => void, x: T) => {
  fn(x)
  return x
})
