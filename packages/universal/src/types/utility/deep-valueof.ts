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
export type DeepValueOf<T, K extends DeepKeyOf<T> | (string & {})> =
  K extends `${infer Key}.${infer Rest}` ?
    Key extends keyof T ?
      DeepValueOf<T[Key], Rest>
    : never
  : K extends keyof T ? T[K]
  : never
