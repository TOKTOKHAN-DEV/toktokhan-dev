import { curry } from 'lodash'

/**
 * 배열을 Record로 변환합니다. 각 요소는 지정된 키 선택기 함수를 통해 매핑됩니다.
 *
 * @curried
 * @category Utils/Array
 *
 * @typeParam T - 배열 요소의 타입
 * @typeParam K - Record의 키 타입 (string, number, symbol)
 *
 * @param keySelector - 배열 요소를 Record의 키로 변환하는 함수
 * @param arr - 변환할 배열
 *
 * @returns 배열의 각 요소를 Record으로 매핑한 결과
 *
 * @example
 * ```ts
 * const arr = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 3, name: 'Charlie' },
 * ];
 *
 * const record = arrayToRecord((item) => item.id , arr);
 * // or
 * const record = arrayToRecord((item) => item.id)(arr);
 * // or
 * const recordById = arrayToRecord((item) => item.id);
 * const record = recordById(arr);
 *
 * console.log(record)
 * // {
 * //   1: { id: 1, name: 'Alice' },
 * //   2: { id: 2, name: 'Bob' },
 * //   3: { id: 3, name: 'Charlie' },
 * // }
 *```
 */
export const arrayToRecord: {
  <T, K extends string | number | symbol>(
    keySelector: (data: T) => K,
    arr: T[],
  ): Record<K, T>
  <T, K extends string | number | symbol>(
    keySelector: (data: T) => K,
  ): (arr: T[]) => Record<K, T>
} = curry(
  <T, K extends string | number | symbol>(
    keySelector: (data: T) => K,
    arr: T[],
  ): Record<K, T> => {
    return arr.reduce(
      (prev, cur) => {
        const key = keySelector(cur)
        return { ...prev, [key]: cur } // 현재 요소를 Record에 추가
      },
      {} as Record<K, T>, // 초기 빈 Record
    )
  },
)
