/**
 * @description use{str}에서 use를 제거합니다.
 * @param str hook의 이름입니다.
 */
export const removeUse = (str: string) => {
  if (str.startsWith('use')) {
    return str.slice(3)
  }
  return str
}
