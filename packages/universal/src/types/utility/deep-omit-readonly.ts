import { Obj } from './obj'
import { ReadonlyKeysOf } from './readonly-keys-of'

/**
 * 객체의 모든 읽기 전용 속성을 제거하는 타입을 정의합니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - 읽기 전용 속성을 제거할 객체의 타입
 * @returns 모든 읽기 전용 속성이 제거된 객체의 타입
 *
 * @example
 * ```typescript
 * type MutablePerson = DeepOmitReadOnly<{
 *   readonly name: string;
 *   readonly age: number;
 *   address: {
 *     readonly city: string;
 *     postalCode: number;
 *   };
 * }>;
 * // type MutablePerson = {
 * //   address: {
 * //     postalCode: number;
 * //   };
 * // }
 * ```
 */
export type DeepOmitReadOnly<T extends Obj | undefined> = Omit<
  {
    [P in keyof T]: T[P] extends Obj | undefined ?
      DeepOmitReadOnly<NonNullable<T[P]>>
    : T[P]
  },
  ReadonlyKeysOf<NonNullable<T>>
>
