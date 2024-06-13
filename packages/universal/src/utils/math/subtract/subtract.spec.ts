import { subtract } from './subtract'

describe('subtract', () => {
  it('subtracts two numbers', () => {
    expect(subtract(1, 2)).toBe(-1)
  })

  it('subtracts two numbers:curried', () => {
    expect(subtract(1)(2)).toBe(-1)
  })

  it('subtracts two demical', () => {
    expect(subtract(0.1, 0.2)).toBe(-0.1)
  })
})
