import { curry, flow, reduce } from 'lodash/fp'

export type ObjSelector<T, N = any> = (prev: T) => N

export type ObjSelectorMap<T> = Record<string, ObjSelector<T>>

export type ObjSelectorMapResult<T, M extends ObjSelectorMap<T>> = {
  [K in keyof M]: ReturnType<M[K]>
}

/**
 * 객체에서 선택된 속성을 기반으로 새로운 객체를 생성합니다.
 * @category Utils/Object
 * @typeParam T - 입력 객체의 타입
 * @typeParam N - 생성된 객체의 각 속성 값의 타입
 * @typeParam M - 선택된 속성과 반환값의 매핑
 * @param mapper - 선택된 속성과 각 속성 값의 생성 함수로 이루어진 매핑 객체
 * @param prev - 입력 객체
 * @returns 선택된 속성을 기반으로 생성된 객체
 *
 * @example
 * ```typescript
 * const data = { a: 1, b: 2, c: 3 };
 * const selectors = {
 *   sum: ({ a, b, c }) => a + b + c,
 *   product: ({ a, b, c }) => a * b * c,
 * };
 *
 * const result = createObjBySelector(selectors, data);
 * const result = createObjBySelector(selectors)(data);
 *
 * console.log(result); // { sum: 6, product: 6 }
 * ```
 *
 * @curried
 */
export const createObjBySelector: {
  <T, M extends ObjSelectorMap<T> = ObjSelectorMap<T>>(
    mapper: M,
    prev: T,
  ): ObjSelectorMapResult<T, M>
  <T, M extends ObjSelectorMap<T> = ObjSelectorMap<T>>(
    mapper: M,
  ): (prev: T) => ObjSelectorMapResult<T, M>
} = curry((mapper: any, prev: any) => {
  const create = flow(
    Object.entries,
    reduce(
      (acc, [key, selector]) => ({ ...acc, [key]: selector(prev) }),
      {} as any,
    ),
  )
  return create(mapper)
})
