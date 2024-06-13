/**
 * 여러 함수들이 모두 주어진 인자에 대해 true를 반환하는지 확인합니다.
 * 주어진 함수 배열(fns)에 대해 모든 함수가 인자를 받아들여 true를 반환하는지 여부를 검사합니다.
 *
 * @category Utils/Fn
 *
 * @typeParam T - 함수에 전달할 인자의 타입
 * @param fns - 평가할 함수들의 배열
 * @returns 모든 함수가 인자를 받아들여 true를 반환하는 경우 true를 반환하고, 그렇지 않으면 false를 반환합니다.
 *
 * @example
 * ```ts
 * const isPositive = (x: number) => x > 0;
 * const isEven = (x: number) => x % 2 === 0;
 * const isGreaterThanTen = (x: number) => x > 10;
 *
 * const conditions = [isPositive, isEven, isGreaterThanTen];
 *
 * isEvery(conditions)(4); // false - 4는 isGreaterThanTen의 조건을 만족하지 않습니다.
 * isEvery(conditions)(12); // true - 모든 조건을 만족합니다.
 * ```
 * @curried
 */
export const isEvery =
  <T extends any[]>(fns: ((...param: T) => boolean)[]) =>
  (...param: T): boolean => {
    return fns.every((fn) => fn(...param))
  }
