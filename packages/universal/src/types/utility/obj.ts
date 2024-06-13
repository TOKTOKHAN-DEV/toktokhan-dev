/**
 * 키와 값의 타입이 있는 객체의 타입을 정의합니다.
 *
 * @category Types/Utility
 *
 * @typeParam K - 객체의 키 타입
 * @typeParam V - 객체의 값 타입
 *
 * @example
 * ```typescript
 * // 객체의 타입 정의
 * type Person = Obj<'name' | 'age', string | number>;
 *
 * // 객체의 사용 예시
 * const person: Person = {
 *   name: 'Alice',
 *   age: 30,
 * };
 * ```
 */
export type Obj<
  K extends string | number | symbol = string | number | symbol,
  V = unknown,
> = Record<K, V>
