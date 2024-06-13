/**
 * @category Utils/Fn
 *
 * arguments 를 배열로써 반환합니다.
 *
 * @param args - arguments
 *
 * @returns arguments 를 배열로써 반환합니다.
 *
 * @example
 * ```ts
 * collect(1, 2, 3) // [1, 2, 3]
 * ```
 */
export const collect = <T>(...args: T[]): T[] => args
