/**
 * 데이터 또는 함수를 나타내는 타입입니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - 데이터 또는 함수의 타입
 * @param prev - 이전 값을 받아 새로운 값을 반환하는 함수
 * @returns 데이터 또는 함수
 *
 * @example
 * ```tsx
 * const data: DataOrFn<number> = 42; // 데이터
 * const fn: DataOrFn<number> = (prev) => prev + 1; // 함수
 * ```
 */
export type DataOrFn<T> = T | ((prev: T) => T)
