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
export type DeepKeyOf<T> =
  T extends Array<any> ?
    {
      [K in Indices<T>]: K extends number | string ?
        T[K] extends Obj | Array<any> ?
          K | `${K}.${DeepKeyOf<T[K]>}`
        : K
      : K
    }[Indices<T>]
  : T extends Obj ?
    {
      [K in keyof T]: `${K extends string | number ?
        | K
        | (T[K] extends Obj | Array<any> ?
            DeepKeyOf<T[K]> extends string | number ?
              `${K}.${DeepKeyOf<T[K]>}`
            : never
          : K)
      : never}`
    }[keyof T]
  : never
