/**
 * 배열 또는 읽기 전용 배열의 요소 타입을 추출하는 타입을 정의합니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - 요소 타입을 추출할 배열의 타입
 * @returns 배열의 요소 타입
 *
 * @example
 * ```typescript
 * // 배열의 요소 타입 추출
 * type Element = ItemOf<[string, number, boolean]>;
 * // type Element = string | number | boolean
 * ```
 */
export type ItemOf<T extends Array<any> | readonly any[]> = T[number]
