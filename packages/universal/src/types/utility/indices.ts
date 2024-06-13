/**
 * 배열의 인덱스 타입을 추출하는 타입을 정의합니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - 인덱스 타입을 추출할 배열의 타입
 * @returns 배열의 인덱스 타입
 *
 * @example
 * ```typescript
 * // 배열의 인덱스 타입 추출
 * type Index = Indices<[string, number, boolean]>;
 * // type Index = 0 | 1 | 2
 * ```
 */
export type Indices<T extends readonly any[]> =
  Extract<keyof T, `${number}`> extends never ? number
  : Extract<keyof T, `${number}`>
