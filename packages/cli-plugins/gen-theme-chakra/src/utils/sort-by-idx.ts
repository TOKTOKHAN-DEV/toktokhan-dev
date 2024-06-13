/**
 * 넘겨진 배열의 순서대로 정렬하는 함수를 반환합니다.
 */
export const sortByIdx =
  <T>(arr: T[]) =>
  (a: T, b: T) =>
    arr.indexOf(a) - arr.indexOf(b)
