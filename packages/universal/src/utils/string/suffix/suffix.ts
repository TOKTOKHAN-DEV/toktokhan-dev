import { curry } from 'lodash'

/**
 * 문자열에 접미사를 추가합니다.
 *
 * @category Utils/String
 *
 * @param suf - 접미사로 사용될 문자열
 * @param str - 접미사를 추가할 대상 문자열
 * @returns 접미사가 추가된 문자열
 *
 * @example
 * ```typescript
 * const suffixedStr1 = suffix('-post', 'string'); // 'string-post'
 * console.log(suffixedStr1);
 *
 * const suffixWithDot = suffix('.'); // 부분 적용
 * const suffixedStr2 = suffixWithDot('extension'); // 'extension.'
 * console.log(suffixedStr2);
 *
 * const suffixedStr3 = suffix('!', 'Hello'); // 'Hello!'
 * console.log(suffixedStr3);
 * ```
 *
 * @curried
 */
export const suffix: {
  (suf: string, str: string): string
  (suf: string): (str: string) => string
} = curry((suf: string, str: string): string => {
  return str + suf
})
