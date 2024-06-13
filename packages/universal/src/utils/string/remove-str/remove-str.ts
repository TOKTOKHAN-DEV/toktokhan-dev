import { curry } from 'lodash'

/**
 * 문자열에서 지정된 문자열을 제거합니다.
 *
 * @category Utils/String
 *
 * @param str - 제거할 문자열
 * @param s - 대상 문자열
 * @returns 지정된 문자열이 제거된 결과 문자열
 *
 * @example
 * ```typescript
 * const removedStr1 = removeStr('a', 'banana'); // 'bnn'
 * console.log(removedStr1);
 *
 * const removeA = removeStr('a'); // 부분 적용
 * const removedStr2 = removeA('apple'); // 'pple'
 * console.log(removedStr2);
 *
 * const removedStr3 = removeStr(' ', 'hello world'); // 'helloworld'
 * console.log(removedStr3);
 * ```
 *
 * @curried
 */
export const removeStr: {
  (str: string | RegExp, s: string): string
  (str: string | RegExp): (s: string) => string
} = curry((str: string | RegExp, s: string) => s.replaceAll(str, ''))
