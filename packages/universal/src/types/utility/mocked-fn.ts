/**
 * `MockedFn`은 Jest의 mock 함수를 타입으로 나타내는 유틸리티 타입입니다.
 
 * @category Types/Utility
 * @typeParam T - 어떤 매개변수를 받고 어떤 값을 반환하는 함수의 타입
 *
 * 이 타입은 `T` 타입의 함수와 같은 매개변수를 받고 같은 타입의 값을 반환하는 Jest의 mock 함수의 타입을 나타냅니다.
 * 이 타입은 Jest의 mock 함수를 타입 체크할 때 사용할 수 있습니다.
 *
 * @example
 * ```typescript
 * const mockFn: MockedFn<(a: number, b: number) => number> = jest.fn((a, b) => a + b);
 * ```
 */
export type MockedFn<T extends (...params: any) => any> = jest.Mock &
  ((...args: Parameters<T>) => ReturnType<T>)
