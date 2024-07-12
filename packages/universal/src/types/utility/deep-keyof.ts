import { DeepNonNullAble } from './deep-non-nullable'
import { Indices } from './indices'

import { Obj } from '..'

/**
 * 객체의 깊은 키를 나타내는 타입을 추출합니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - 깊은 키를 추출할 객체의 타입
 * @returns 객체의 깊은 키를 나타내는 타입
 *
 * @example
 * ```typescript
 * type DeepKeys = DeepKeyOf<{
 *   a: {
 *     b: number;
 *     c: {
 *       d: string[];
 *     };
 *   };
 * }>;
 * // type DeepKeys = 'a' | 'a.b' | 'a.c' | 'a.c.d' | `a.c.d.${number}`
 * ```
 */
export type DeepKeyOf<T, ExactT = DeepNonNullAble<T>> =
  ExactT extends Array<any> ?
    {
      [K in Indices<ExactT>]: K extends number | string ?
        ExactT[K] extends Obj | Array<any> ?
          K | `${K}.${DeepKeyOf<ExactT[K]>}`
        : K
      : K
    }[Indices<ExactT>]
  : ExactT extends Obj ?
    {
      [K in keyof ExactT]: K extends string | number ?
        | K
        | `${ExactT[K] extends Obj | Array<any> ? `${K}.${DeepKeyOf<ExactT[K]>}` : never}`
      : never
    }[keyof ExactT]
  : never
