import { curry } from 'lodash'

/**
 * 배열을 Map으로 변환합니다. 각 요소는 지정된 키 선택기 함수를 통해 매핑됩니다.
 *
 * @curried
 * @category Utils/Array
 *
 * @typeParam T - 배열 요소의 타입
 * @typeParam K - Map의 키 타입
 *
 * @param keySelector - 배열 요소를 Map의 키로 변환하는 함수
 * @param arr - 변환할 배열
 *
 * @returns 배열의 각 요소를 Map으로 매핑한 결과
 *
 * @example
 * ```ts
 * const arr = [
 *  { id: 1, name: 'Alice' },
 *  { id: 2, name: 'Bob' },
 *  { id: 3, name: 'Charlie' },
 * ];
 *
 * const map = arrayToMap((item) => item.id , arr);
 * // or
 * const map = arrayToMap((item) => item.id)(arr);
 * // or
 * const mapById = arrayToMap((item) => item.id);
 * const map = mapById(arr);
 *
 * console.log(map)
 * // Map {
 * //   1 => { id: 1, name: 'Alice' },
 * //   2 => { id: 2, name: 'Bob' },
 * //   3 => { id: 3, name: 'Charlie' },
 * // }
 *```
 */
export const arrayToMap: {
  <T, K>(keySelector: (data: T) => K, arr: T[]): Map<K, T>
  <T, K>(keySelector: (data: T) => K): (arr: T[]) => Map<K, T>
} = curry(<T, K>(keySelector: (data: T) => K, arr: T[]): Map<K, T> => {
  return arr.reduce((prev, cur) => {
    const key = keySelector(cur)
    return prev.set(key, cur)
  }, new Map())
})
