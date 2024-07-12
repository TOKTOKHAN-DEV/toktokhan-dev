import { DeepKeyOf } from './deep-keyof'

/**
 * 객체의 깊은 속성 값을 추출하는 타입을 정의합니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - 깊은 속성 값을 추출할 객체의 타입
 * @typeParam K - 추출할 속성의 경로를 나타내는 타입
 * @returns 객체의 깊은 속성 값의 타입
 *
 * @example
 * ```typescript
 * type Example = {
 *   a: {
 *     b: number;
 *     c: {
 *       d: string[];
 *     };
 *   };
 * }
 *
 * // 객체의 깊은 속성 값 타입 추출
 * type Value = DeepValueOf<Example, 'a.c.d'>;
 * // type Value = string[]
 * ```
 */
export type DeepValueOf<T, K extends DeepKeyOf<T> | (string & {}) | number> =
  K extends keyof T ? T[K]
  : K extends `${infer Key}.${infer Rest}` ?
    T extends Array<any> ?
      Key extends `${number}` ?
        DeepValueOf<T[`${number}`], Rest>
      : never
    : Key extends keyof T ?
      undefined extends T[Key] ?
        DeepValueOf<NonNullable<T[Key]>, Rest> | undefined //
      : null extends T[Key] ?
        DeepValueOf<NonNullable<T[Key]>, Rest> | undefined //
      : DeepValueOf<T[Key], Rest>
    : never
  : never
