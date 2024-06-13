import { Obj } from './obj'

/**
 * 객체의 모든 속성을 nullable 하게 합니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - nullable 한 속성을 추출할 객체의 타입
 * @returns 모든 속성이 nullable 한 객체의 타입
 * @example
 * ```tsx
 * type Example = NullAble<{ a: 1; b: 1 }>;
 * // type Example = { a: 1 | null; b: 1  | null}
 * ```
 */
export type NullAble<T extends Obj | undefined> = {
  [P in keyof T]: T[P] | null
}
