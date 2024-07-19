export type AssertItemOf = <T>(
  arr: T[] | readonly T[],
  type: unknown,
  message?: string,
) => asserts type is T

export const assertItemOf: AssertItemOf = (array, item, msg) => {
  const emptyMsg = `array is empty`
  if (!array.length) throw new Error(msg || emptyMsg)

  const defMsg = `must be one of ${array.join(', ')} but got ${JSON.stringify(item)}`
  if (!array.find((i) => i === item)) throw new Error(msg || defMsg)
}
