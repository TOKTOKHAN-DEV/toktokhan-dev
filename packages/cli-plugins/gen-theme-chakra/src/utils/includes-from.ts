import { includes } from 'lodash/fp'

/**
 * 배열로 부터 문자열이 포함되어 있는지 확인하는 함수를 반환합니다.
 */
export const includesFrom = (arr: string[]) => (str: string) =>
  includes(str, arr)
