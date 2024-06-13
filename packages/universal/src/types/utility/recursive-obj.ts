/**
 * 재귀하는 타입을 가지는 객체를 정의합니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - 객체의 타입입니다.
 * @returns 재귀하는 타입을 가지는 객체의 타입
 *
 * @example
 *
 * ```typescirpt
 *
 * const Object: RecursiveObj<{ src: string; alt: string }> = {
 *     a: {
 *       alt: 'a.alt',
 *       src: 'a.src',
 *     },
 *     b: {
 *       c: {
 *         alt: 'c.alt',
 *         src: 'c.src',
 *       },
 *       d: {
 *         alt: 'd.alt',
 *         src: 'd.src',
 *       },
 *     },
 *   }
 * ```
 */
export type RecursiveObj<T> = {
  [x in string]: T | RecursiveObj<T>
}
