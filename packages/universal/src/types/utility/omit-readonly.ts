import { ReadonlyKeysOf } from './readonly-keys-of'

import { Obj } from '..'

/**
 * 객체에서 읽기 전용 속성을 제거합니다
 *
 * @category Types/Utility
 *
 * @typeParam T - 객체의 타입
 * @returns 읽기 전용 속성이 제거된 객체의 타입
 *
 * @example
 * ```tsx
 * type Example = OmitReadOnly<{
 *    readonly a: number;
 *    b: string;
 *    readonly c: string;
 * }>;
 *
 * // type Example = { b : string; }
 * ```
 */
export type OmitReadOnly<T extends Obj> = Omit<T, ReadonlyKeysOf<T>>
