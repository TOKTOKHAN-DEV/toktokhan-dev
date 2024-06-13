import { or } from './or'

describe('or', () => {
  it('should return the value if it is not null or undefined', () => {
    expect(or(0, 5)).toBe(5)
  })

  it('should return the default value if the value is null', () => {
    expect(or(0, null)).toBe(0)
  })

  it('should return the default value if the value is undefined', () => {
    expect(or(0, undefined)).toBe(0)
  })

  it('should return the value if it is not null or undefined (curried)', () => {
    const orZero = or(0)
    expect(orZero(5)).toBe(5)
  })

  it('should return the default value if the value is null (curried)', () => {
    const orZero = or(0)
    expect(orZero(null)).toBe(0)
  })

  it('should return the default value if the value is undefined (curried)', () => {
    const orZero = or(0)
    expect(orZero(undefined)).toBe(0)
  })
})
