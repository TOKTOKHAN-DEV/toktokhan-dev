/**
 * 주어진 객체에서 빈 객체를 제거하는 함수입니다.
 *
 * @category Utils/Object
 * @typeParam T - 어떤 키와 값을 가진 객체의 타입
 *
 * @param obj - 빈 객체를 제거할 대상 객체
 * @returns 빈 객체가 제거된 새로운 객체
 *
 * @example
 * ```typescript
 * const obj = { a: { b: {} }, c: 1 };
 * const result = removeEmptyObject(obj);
 * console.log(result); // Outputs: { c: 1 }
 * ```
 */
export const removeEmptyObject = <T extends Record<any, any>>(obj: T): T =>
  Object.entries(obj).reduce(
    (prev, [key, value]) => {
      const updated = { ...prev }
      const hasValue = value !== undefined && value !== null
      const isObject = hasValue && typeof value === 'object'

      if (!hasValue) return updated
      if (isObject) {
        const cleanedValue = removeEmptyObject(value)
        const isEmpty = Object.keys(cleanedValue).length === 0
        if (!isEmpty) updated[key] = cleanedValue
        return updated
      }
      updated[key] = value

      return updated
    },
    {} as Record<any, any>,
  ) as T
