import { multiply } from './multiply'

describe('multiply', () => {
  it('multiplys two numbers', () => {
    expect(multiply(6, 3)).toBe(18)
  })

  it('multiplys two numbers:curried', () => {
    expect(multiply(6)(3)).toBe(18)
  })

  it('multiplys two demical', () => {
    expect(multiply(0.1, 0.2)).toBe(0.02)
  })
})
