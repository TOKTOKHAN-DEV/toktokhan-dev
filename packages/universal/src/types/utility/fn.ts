/**
 * 함수의 타입을 정의합니다.
 *
 * @category Types/Utility
 *
 * @typeParam P - 함수에 전달될 매개변수의 타입 배열
 * @typeParam R - 함수의 반환값의 타입
 * @param params - 함수에 전달될 매개변수들
 * @returns 함수의 반환값
 *
 * @example
 * ```typescript
 * // 함수의 타입 정의
 * type AddFn = Fn<[x: number, y: number], number>;
 *
 * // 함수의 사용 예시
 * const add: AddFn = (x, y) => x + y;
 * ```
 */
export type Fn<P extends any[] = any[], R = any> = (...params: P) => R
