import { devide } from './devide'

describe('devide', () => {
  it('devides two numbers', () => {
    expect(devide(6, 3)).toBe(2)
  })

  it('devides two numbers:curried', () => {
    expect(devide(6)(3)).toBe(2)
  })

  it('devides two demical', () => {
    expect(devide(0.1, 0.2)).toBe(0.5)
  })
})
