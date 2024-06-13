import { isFunction } from 'lodash'

/**
 * 주어진 값이 함수인 경우 주어진 인자들을 사용하여 실행하고, 그렇지 않으면 주어진 값을 그대로 반환합니다.
 *
 * @category Utils/Fn
 *
 * @typeParam T - 반환할 값의 타입
 * @typeParam U - 함수의 매개변수의 타입
 * @param valueOrFn - 실행할 함수 또는 반환할 값
 * @param args - 함수에 전달할 매개변수
 * @returns 주어진 값이 함수인 경우 주어진 인자들을 사용하여 실행한 결과를 반환하고, 그렇지 않으면 주어진 값을 그대로 반환합니다.
 *
 * @example
 * ```ts
 * const add = (a: number, b: number) => a + b;
 * runIfFn(add, 2, 3); // 5 - add 함수를 실행하여 결과를 반환합니다.
 * runIfFn(5, 2, 3); // 5 - 주어진 값이 함수가 아니므로 주어진 값을 그대로 반환합니다.
 * ```
 */
export function runIfFn<T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}
