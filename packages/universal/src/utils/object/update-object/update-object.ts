import { cloneDeep, curry, get, isFunction, set } from 'lodash'

import { DeepKeyOf, DeepValueOf } from '../../../types'

type DataOrFn<T, D> = T | ((prev: T, origin: D) => T)

function runIfFn<T, U extends any[]>(
  valueOrFn: T | ((...fnArgs: U) => T),
  ...args: U
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}

/**
 * @deprecated
 * use `update` instead
 *
 * 객체의 지정된 깊은 위치에 값을 설정하거나 업데이트합니다.
 *
 * @category Utils/Object
 *
 * @typeParam T - 입력 객체의 타입
 * @typeParam K - 설정 또는 업데이트할 속성의 깊은 경로를 나타내는 키
 * @param key - 설정 또는 업데이트할 속성의 깊은 경로를 나타내는 키
 * @param value - 설정할 값 또는 값을 반환하는 함수
 * @param obj - 값을 설정 또는 업데이트할 객체
 * @returns 값을 설정 또는 업데이트한 객체
 *
 * @example
 * ```typescript
 * const data = { nested: { prop: 42 } };
 *
 * // 객체의 깊은 경로에 값을 설정
 * const updated1 = updateObj('nested.prop', 100, data); // { nested: { prop: 100 } }
 *
 * // 함수를 사용하여 값을 설정
 * const updated2 = updateObj('nested.prop', (prev) => prev + 1, data); // { nested: { prop: 43 } }
 *
 * // 원본 객체의 다른 값을 참조하여 값을 설정
 * const updated3 = updateObj('nested.prop', (prev, obj) => prev + obj.nested.prop, data); // { nested: { prop: 84 } }
 *
 * // 함수를 부분 적용하여 사용
 * const updater = updateObj('nested.prop');
 * const updated4 = updater(200)(data); // { nested: { prop: 200 } }
 * ```
 *
 *
 * @curried
 */
export const updateObj: {
  <T, K extends DeepKeyOf<T> = DeepKeyOf<T>>(
    key: K,
    value: DataOrFn<DeepValueOf<T, K>, T>,
    obj: T,
  ): T
  <T, K extends DeepKeyOf<T> = DeepKeyOf<T>>(
    key: K,
  ): (value: DataOrFn<DeepValueOf<T, K>, T>) => (obj: T) => T
  <T, K extends DeepKeyOf<T> = DeepKeyOf<T>>(
    key: K,
    value: DataOrFn<DeepValueOf<T, K>, T>,
  ): (obj: T) => T
} = curry(
  <T, K extends DeepKeyOf<T>>(
    key: K,
    value: DataOrFn<DeepValueOf<T, K>, T>,
    obj: T,
  ): T => {
    const updated = cloneDeep(obj)
    return set(
      updated as object,
      `${key}`.split('.'),
      runIfFn(value, get(updated as object, `${key}`.split('.')), obj),
    ) as T
  },
)
