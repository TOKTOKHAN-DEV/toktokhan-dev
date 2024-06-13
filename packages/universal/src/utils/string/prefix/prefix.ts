import { curry } from 'lodash'

/**
 * 문자열에 접두사를 추가합니다.
 *
 * @category Utils/String
 * @param pre - 접두사로 사용될 문자열
 * @param str - 접두사를 추가할 대상 문자열
 * @returns 접두사가 추가된 문자열
 *
 * @example
 * ```typescript
 * const prefixedStr1 = prefix('pre-', 'string'); // 'pre-string'
 * console.log(prefixedStr1);
 *
 * const prefixWithHello = prefix('Hello, '); // 부분 적용
 * const prefixedStr2 = prefixWithHello('world!'); // 'Hello, world!'
 * console.log(prefixedStr2);
 *
 * const prefixedStr3 = prefix('1. ')('First item'); // '1. First item'
 * console.log(prefixedStr3);
 * ```
 *
 * @curried
 */
export const prefix: {
  (pre: string, str: string): string
  (pre: string): (str: string) => string
} = curry((pre: string, str: string): string => {
  return pre + str
})
