import { runIfFn } from './run-if-fn'

describe('runIfFn', () => {
  it('should execute the function with provided arguments and return the result if the value is a function', () => {
    const add = (a: number, b: number) => a + b
    const result = runIfFn(add, 2, 3)
    expect(result).toBe(5)
  })

  it('should return the value itself if it is not a function', () => {
    const value = 5
    const result = runIfFn(value, 2, 3)
    expect(result).toBe(value)
  })
})
