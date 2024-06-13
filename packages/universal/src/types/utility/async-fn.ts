import { Fn } from './fn'

/**
 * 비동기 함수의 타입을 정의합니다.
 *
 * @category Types/Utility
 *
 * @typeParam P - 함수에 전달될 매개변수의 타입 배열
 * @typeParam R - 함수의 반환값의 타입
 * @returns 비동기 함수의 반환값을 나타내는 Promise를 반환하는 함수 타입
 *
 * @example
 * ```typescript
 * // 비동기 함수의 타입 정의
 * type FetchData = AsyncFn<[url: string], string>;
 *
 * // 비동기 함수의 사용 예시
 * const fetchData: FetchData = async (url) => {
 *   const response = await fetch(url);
 *   return response.text();
 * };
 * ```
 */
export type AsyncFn<P extends any[] = any[], R = any> = Fn<P, Promise<R>>
