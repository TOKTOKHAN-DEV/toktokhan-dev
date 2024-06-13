import { Obj } from '..'

/**
 * 객체의 모든 속성의 타입을 추출합니다
 *
 * @category Types/Utility
 *
 * @typeParam T - 객체의 타입
 * @returns 객체의 모든 속성의 타입
 *
 * @example
 * ```tsx
 * type Example = ValueOf<{ a: number; b: string }>;
 *
 * // type Example = number | string
 * ```
 */
export type ValueOf<T> = T extends Obj ? T[keyof T] : unknown
