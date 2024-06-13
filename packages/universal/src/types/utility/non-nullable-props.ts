import { Obj } from './obj'

/**
 * 객체에서 모든 property 가 NonNullable 타입이 되도록 합니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - NonNullable 타입으로 만들 객체의 타입
 * @returns 모든 property 가 NonNullable 타입이 되도록 만들어진 객체의 타입
 *
 * @example
 * type Example = NonNullableProps<{ a: 1 | null; b?: 1 }>;
 * // type Example = { a: 1; b: 1 }
 */
export type NonNullableProps<T extends Obj> = Omit<T, keyof T> & {
  [P in keyof T]-?: NonNullable<T[P]>
}
