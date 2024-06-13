import { NullAble } from './nullable'
import { Obj } from './obj'

/**
 * 객체의 모든 속성을 null 가능하게 만드는 타입을 정의합니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - null 가능한 속성을 추출할 객체의 타입
 * @returns 모든 속성이 null 가능한 객체의 타입
 *
 * @example
 * ```typescript
 * type NullablePerson = DeepNullable<{
 *   name: string;
 *   age: number;
 *   address: {
 *     city: string;
 *     postalCode: number;
 *   };
 * }>;
 * // type NullablePerson = {
 * //   name: string | null;
 * //   age: number | null;
 * //   address: {
 * //     city: string | null;
 * //     postalCode: number | null;
 * //   } | null;
 * // }
 * ```
 */
export type DeepNullAble<T extends Obj | undefined> = NullAble<{
  [K in keyof T]: T[K] extends Obj | undefined ? NullAble<T[K]> : T[K]
}>
