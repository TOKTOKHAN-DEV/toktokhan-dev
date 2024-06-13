import { add } from './add'

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toBe(3)
  })

  it('adds two numbers:curried', () => {
    expect(add(1)(2)).toBe(3)
  })

  it('adds two demical', () => {
    expect(add(0.1, 0.2)).toBe(0.3)
  })
})
