/**
 * @description i: fooBar / o: FOO_BAR
 * @param str camelCase 문자열
 */
export function addUnderscoreToCamelCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()
}
