/**
 * 객체의 모든 속성에서 readonly 를 제거합니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - 객체의 타입
 * @returns 모든 속성의 readonly 가 제거된 객체의 타입
 *
 * @example
 * ```typescript
 * // 모든 속성의 readonly 가 제거된 객체의 타입 정의
 * type MutablePerson = Mutable<{
 *   readonly name: string;
 *   readonly age: number;
 * }>;
 *
 * type MutablePerson = {
 *  name: string;
 *  age: number;
 * }
 * ```
 */
export type Mutable<T extends Record<any, any> | undefined> = {
  -readonly [key in keyof T]: T[key]
}
