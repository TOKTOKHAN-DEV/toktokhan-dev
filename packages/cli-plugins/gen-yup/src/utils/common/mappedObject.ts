type Obj = Record<string, string>
type ReturnObj = {
  name: string
  value: string
}

/**
 * @description 배열에 담긴 Object를 반환합니다.
 * @param object Record<string, string>
 */
export const mappedObject = (object: Obj) => {
  return Object.entries(object).reduce(
    (acc: ReturnObj[], [name, value]) => [...acc, { name, value }],
    [],
  )
}
