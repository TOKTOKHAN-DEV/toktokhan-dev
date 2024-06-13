import { compact, curry } from 'lodash'

import { RecursiveObj } from '../../../types/utility/recursive-obj'

/**
 * `flatObject` 함수의 매개변수 타입입니다.
 *
 * @typeParam T - 재귀적으로 중첩된 객체의 타입
 * @typeParam V - 중첩된 객체의 값의 타입
 *
 * @property separator - 객체의 키를 연결할 때 사용할 구분자
 * @property filter - 객체의 값을 필터링하는 함수. 이 함수가 `true`를 반환하면 해당 값이 결과에 포함됩니다.
 */
export type FlatObjectParams<
  T extends RecursiveObj<any>,
  V = T extends RecursiveObj<infer U> ? U : never,
> = {
  isValueType?: (value: T | V) => boolean
  formatKey?: (parentKey: string | null, currentKey: string) => string
  formatValue?: (data: { key: string; value: V }) => any
}

const _flatObject = <
  T extends RecursiveObj<any>,
  V = T extends RecursiveObj<infer U> ? U : never,
>(
  params: FlatObjectParams<T, V>,
  obj: T,
): Record<string, V> => {
  const result: Record<string, V> = {}

  const setResult = (object: T, parentKey: null | string = null) => {
    Object.entries(object).forEach(([key, value]) => {
      const generatedKey =
        params?.formatKey ?
          params?.formatKey(parentKey, key)
        : compact([parentKey, key]).join('.')

      const isValue =
        params?.isValueType ?
          params.isValueType(value)
        : typeof value !== 'object'

      if (isValue) {
        const v =
          params?.formatValue ? params.formatValue({ key, value }) : value

        result[generatedKey] = v
      } else {
        setResult(value, generatedKey)
      }
    })
  }

  setResult(obj)

  return result
}

/**
 * 재귀적으로 중첩된 객체를 평탄화하는 함수입니다.
 *
 * @category Utils/Object
 *
 * @typeParam T - 재귀적으로 중첩된 객체의 타입
 * @typeParam V - 중첩된 객체의 값의 타입
 *
 * @param params - 평탄화 작업에 필요한 매개변수
 * @param obj - 평탄화할 객체
 * @returns 평탄화된 객체. 키는 문자열이고 값은 V 타입입니다.
 *
 * @example
 * ```typescript
 * const nestedObj = { a: { b: { c: 1 } } };
 * const flatObj = flatObject({}, nestedObj);
 * console.log(flatObj); // Outputs: { 'a.b.c': 1 }
 * ```
 *
 * 또는 커링을 사용하여 함수를 반환할 수 있습니다.
 *
 * @param params - 평탄화 작업에 필요한 매개변수
 * @returns 평탄화 작업을 수행하는 함수. 이 함수는 T 타입의 객체를 받아 평탄화된 객체를 반환합니다.
 *
 * @example
 * ```typescript
 * const flatten = flatObject({});
 * const nestedObj = { a: { b: { c: 1 } } };
 * const flatObj = flatten(nestedObj);
 * console.log(flatObj); // Outputs: { 'a.b.c': 1 }
 * ```
 */

export const flatObject: {
  <
    T extends RecursiveObj<any>,
    V = T extends RecursiveObj<infer U> ? U : never,
  >(
    params: FlatObjectParams<T, V>,
    obj: T,
  ): Record<string, V>
  <
    T extends RecursiveObj<any>,
    V = T extends RecursiveObj<infer U> ? U : never,
  >(
    params: FlatObjectParams<T, V>,
  ): (obj: T) => Record<string, V>
} = curry(_flatObject)
