import { AsyncFn } from './async-fn'

/**
 * 비동기 함수의 반환값 타입을 추출합니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - 비동기 함수의 타입
 * @returns 비동기 함수의 반환값의 타입
 *
 * @example
 * ```tsx
 * type Example = AsyncFnReturn<() => Promise<number>>;
 * // type Example = number
 * ```
 */
export type AsyncFnReturn<T extends AsyncFn> = Awaited<ReturnType<T>>
