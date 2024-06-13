import { IfEquals } from './if-equals'

/**
 * 객체의 readonly 한 속성의 키를 추출합니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - 객체의 타입
 * @returns 객체의 readonly 한 속성의 키들의 유니온 타입
 *
 * @example
 * ```tsx
 * type Example = ReadonlyKeysOf<{
 *   readonly a: number;
 *   b: string;
 *   readonly c: string;
 * }>;
 *
 * // type Example = "a" | "c"
 * ```
 */
export type ReadonlyKeysOf<T extends object> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >
}[keyof T]
