/**
 * 주어진 함수의 부정값을 반환합니다.
 * 주어진 함수를 실행하고 그 결과를 부정하여 반환합니다.
 *
 * @category Utils/Fn
 *
 * @typeParam T - 함수의 매개변수와 반환값의 타입
 * @param fn - 부정할 함수
 * @param args - 함수에 전달할 매개변수
 * @returns 주어진 함수의 부정값을 반환합니다.
 *
 * @example
 * ```ts
 * const isPositive = (x: number) => x > 0;
 * const isNegative = not(isPositive);
 *
 * isNegative(5); // false - isPositive(5)의 부정값이므로 false를 반환합니다.
 * isNegative(-5); // true - isPositive(-5)의 부정값이므로 true를 반환합니다.
 * ```
 * @curried
 */
export const not =
  <T extends (...params: any[]) => any>(fn: T) =>
  (...args: Parameters<T>): boolean =>
    !fn(...args)
