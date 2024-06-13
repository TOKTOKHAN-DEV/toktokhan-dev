import { Mutable } from './mutable'

/**
 * 객체의 모든 속성에서 readonly 를 제거해줍니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - 객체 타입
 * @returns 모든 속성 readonly 가 제거 된 객체의 타입
 *
 * @example
 * ```tsx
 * type Example = DeepMutable<{
 *  readonly a: number;
 *  readonly b: { readonly c: number; readonly d: string };
 *  }>;
 *
 *  // type Example = {
 *  // a: number;
 *  // b: { c : number; d : string };
 *  // }
 * ```
 */
export type DeepMutable<T extends Record<any, any> | undefined> = Mutable<{
  [K in keyof T]: T[K] extends Record<any, any> | undefined ? Mutable<T[K]>
  : T[K]
}>
