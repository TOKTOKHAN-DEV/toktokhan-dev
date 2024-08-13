/**
 * @description i: Foo / o: foo
 * @param str 문자열
 */
export function convertLowerCase(str: string) {
  return `${str.charAt(0).toLowerCase()}${str.slice(1)}`
}
