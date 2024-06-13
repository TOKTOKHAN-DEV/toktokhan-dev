/**
 * 객체의 값이 null 또는 undefined인지 검사하고, 넘겨진 에러 메시지를 throw 하는 함수를 반환합니다.
 */
export const assertNullish =
  (message: string) =>
  <T>(val: T): NonNullable<T> => {
    if (val == null || typeof val === 'undefined') throw new Error(message)

    return val
  }
