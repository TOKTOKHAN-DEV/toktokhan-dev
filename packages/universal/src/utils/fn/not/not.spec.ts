import { not } from './not'

describe('not', () => {
  it('should return the negation of the given function result', () => {
    const isPositive = (x: number) => x > 0
    const isNegative = not(isPositive)

    const result1 = isNegative(5)
    const result2 = isNegative(-5)

    expect(result1).toBe(false)
    expect(result2).toBe(true)
  })
})
