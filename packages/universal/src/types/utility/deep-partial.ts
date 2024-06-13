import { Obj } from './obj'

/**
 * 객체의 모든 속성을 옵셔널하게 만듭니다
 *
 * @category Types/Utility
 *
 * @typeParam T - 객체의 타입
 * @returns 모든 속성이 옵셔널하게 만들어진 객체의 타입
 *
 * @example
 * ```tsx
 * type Example = DeepPartial<{
 *    a: number;
 *    b: { c : number; d : string };
 * }>;
 *
 * Example = {
 *    a?: number;
 *    b?: { c? : number; d? : string };
 * }
 * ```tsx
 */
export type DeepPartial<T extends Obj | undefined> = Partial<{
  [K in keyof T]: T[K] extends Obj | undefined ? Partial<T[K]> : T[K]
}>
