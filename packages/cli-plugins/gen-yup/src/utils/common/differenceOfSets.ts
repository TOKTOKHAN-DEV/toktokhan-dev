type Obj = Record<string, string>

/**
 * @description object 2개의 차집합을 반환합니다.
 * @param objA Record<string, string>
 * @param objB Record<string, string>
 */
export const differenceOfSets = (objA: Obj, objB: Obj) => {
  const keysA = Object.keys(objA)
  const keysB = new Set(Object.keys(objB))

  const differenceKeys = keysA.filter((key) => !keysB.has(key))

  const result: Obj = {}

  for (const key of differenceKeys) {
    result[key] = objA[key]
  }

  return result
}
