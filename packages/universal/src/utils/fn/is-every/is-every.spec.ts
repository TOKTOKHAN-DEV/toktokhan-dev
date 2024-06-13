import { isEvery } from './is-every'

describe('isEvery', () => {
  it('should return true if all functions return true for the given argument', () => {
    const isPositive = (x: number) => x > 0
    const isEven = (x: number) => x % 2 === 0
    const isGreaterThanTen = (x: number) => x > 10

    const conditions = [isPositive, isEven, isGreaterThanTen]

    const result = isEvery(conditions)(12)

    expect(result).toBe(true)
  })

  it('should return false if any function returns false for the given argument', () => {
    const isPositive = (x: number) => x > 0
    const isEven = (x: number) => x % 2 === 0
    const isGreaterThanTen = (x: number) => x > 10

    const conditions = [isPositive, isEven, isGreaterThanTen]

    const result = isEvery(conditions)(4)

    expect(result).toBe(false)
  })
})
