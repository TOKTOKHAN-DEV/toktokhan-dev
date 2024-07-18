import { awaited } from './awaited'

describe('awaited', () => {
  it('should apply the function to the value if the value is not a promise', () => {
    const double = (x: number) => x * 2
    const result = awaited(double, 5)
    expect(result).toBe(10)
  })

  it('should apply the function to the resolved value of the promise if the value is a promise', async () => {
    const doubleAsync = async (x: number) => x * 2
    const promise = Promise.resolve(5)
    const result = await awaited(doubleAsync, promise)
    expect(result).toBe(10)
  })

  it('should work correctly in curried form', async () => {
    const doubleAsync = async (x: number) => x * 2
    const promise = Promise.resolve(5)
    const thenDoubleAsync = awaited(doubleAsync)
    const result = await thenDoubleAsync(promise)
    expect(result).toBe(10)
  })
})
