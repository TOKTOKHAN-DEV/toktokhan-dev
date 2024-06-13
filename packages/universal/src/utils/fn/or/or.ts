import { curry } from 'lodash'

/**
 * 주어진 값이 null 또는 undefined인 경우 기본값을 반환하고, 그렇지 않으면 주어진 값을 반환합니다.
 *
 * @category Utils/Fn
 *
 * @typeParam T - 반환할 값의 타입
 * @param def - 기본값
 * @param value - 확인할 값
 * @returns 주어진 값이 null 또는 undefined인 경우 기본값을 반환하고, 그렇지 않으면 주어진 값을 반환합니다.
 *
 * @example
 * ```ts
 * or(0, 5); // 5 - 5는 null 또는 undefined가 아니므로 그대로 반환됩니다.
 * or(0, null); // 0 - null이므로 기본값 0이 반환됩니다.
 * or(0, undefined); // 0 - undefined이므로 기본값 0이 반환됩니다.
 *
 * or(0)(5) // 5
 * or(0)(null) // 0
 * or(0)(undefined) // 0
 *
 * const isEven = (x: number) => x % 2 === 0;
 *
 * const isOddOrZero = flow(
 *   not(isEven), // 짝수가 아닌 값들을 거름
 *   or(0) // null 또는 undefined인 경우 0으로 대체
 * );
 *
 * // 예시
 * console.log(isOddOrZero(5)); // 5 - 홀수는 그대로 반환됩니다.
 * console.log(isOddOrZero(10)); // 0 - 짝수는 0으로 대체됩니다.
 * console.log(isOddOrZero(null)); // 0 - null은 0으로 대체됩니다.
 * ```
 *
 * @curried
 */
export const or: {
  <T>(def: T, value: T | null | undefined): T
  <T>(def: T): (value: T | null | undefined) => T
} = curry(<T>(def: T, value: T | null | undefined): T => value ?? def)
