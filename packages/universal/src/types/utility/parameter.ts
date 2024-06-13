/**
 * 함수의 첫번째 인자 타입을 가져옵니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - 함수 타입
 * @returns 함수의 첫번째 인자 타입
 *
 * @example
 * ```tsx
 * type Example = Parameter<(value: number) => void>
 * // type Example = number
 * ```
 */
export type Parameter<T> = T extends (param: infer U) => any ? U : never
