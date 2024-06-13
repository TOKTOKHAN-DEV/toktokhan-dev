import { prefix } from './prefix'

describe('prefix', () => {
  it('should add prefix to the string', () => {
    const prefixedStr1 = prefix('pre-', 'string')
    expect(prefixedStr1).toBe('pre-string')

    const prefixWithHello = prefix('Hello, ')
    const prefixedStr2 = prefixWithHello('world!')
    expect(prefixedStr2).toBe('Hello, world!')

    const prefixedStr3 = prefix('1. ')('First item')
    expect(prefixedStr3).toBe('1. First item')
  })

  it('should work correctly in curried form', () => {
    const prefixedStr1 = prefix('pre-')('string')
    expect(prefixedStr1).toBe('pre-string')

    const prefixWithHello = prefix('Hello, ')
    const prefixedStr2 = prefixWithHello('world!')
    expect(prefixedStr2).toBe('Hello, world!')

    const prefixedStr3 = prefix('1. ')('First item')
    expect(prefixedStr3).toBe('1. First item')
  })
})
