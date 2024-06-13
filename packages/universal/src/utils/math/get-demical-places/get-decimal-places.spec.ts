import { getDecimalPlaces } from '.'

describe('getDecimalPlaces', () => {
  it('returns 2 for 3.14', () => {
    const result = getDecimalPlaces(3.14)
    expect(result).toBe(2)
  })

  it('returns 0 for 100', () => {
    const result = getDecimalPlaces(100)
    expect(result).toBe(0)
  })

  it('returns 4 for 0.0001', () => {
    const result = getDecimalPlaces(0.0001)
    expect(result).toBe(4)
  })

  it('returns max for many', () => {
    const result = getDecimalPlaces(0.12, 0.123, 0.1234)
    expect(result).toBe(4)
  })
})
