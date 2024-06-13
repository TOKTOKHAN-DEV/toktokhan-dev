/**
 * 주어진 데이터를 반환하는 함수를 생성합니다.
 *
 * @category Utils/Fn
 *
 * @typeParam T - 반환할 데이터의 타입
 * @param data - 반환할 데이터
 * @returns 주어진 데이터를 반환하는 함수
 *
 * @example
 * ```typescript
 * const data = { id: 1, name: 'John' };
 * const getData = pass(data);
 * const result = getData(); // { id: 1, name: 'John' }
 * ```
 */
export const pass =
  <T>(data: T) =>
  (): T =>
    data
