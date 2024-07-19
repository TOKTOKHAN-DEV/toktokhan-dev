import { assertItemOf } from './assert-item-of'

describe('assertItemOf', () => {
  it('should not throw an error if the item is in the array', () => {
    const array = [1, 2, 3]
    const value = 2

    expect(() => assertItemOf(array, value)).not.toThrow()
  })

  it('should throw an error if the item is not in the array', () => {
    const array = [1, 2, 3]
    const value = 4

    expect(() => assertItemOf(array, value)).toThrow()
  })

  it('should throw an error with a custom message if the item is not in the array', () => {
    const array = [1, 2, 3]
    const value = 4
    const customMessage = 'Custom error message'

    expect(() => assertItemOf(array, value, customMessage)).toThrow(
      customMessage,
    )
  })

  it('should not throw an error if the item is in the readonly array', () => {
    const array = [1, 2, 3] as const
    const value = 3

    expect(() => assertItemOf(array, value)).not.toThrow()
  })

  it('should narrow the type correctly', () => {
    const array = ['a', 'b', 'c']
    const value = 'b'

    assertItemOf(array, value)

    // TypeScript should understand that `value` is now one of 'a', 'b', 'c'
    const testFunction = (arg: 'a' | 'b' | 'c') => arg
    expect(testFunction(value)).toBe('b')
  })

  it('should handle empty array correctly', () => {
    const array: string[] = []
    const value = 'a'

    expect(() => assertItemOf(array, value)).toThrow()
  })

  it('should handle array with different types correctly', () => {
    const array = [1, 'a', true]
    const value = 'a'

    expect(() => assertItemOf(array, value)).not.toThrow()
  })

  it('should handle undefined type correctly', () => {
    const array = [1, 2, 3]
    const value = undefined

    expect(() => assertItemOf(array, value)).toThrow(
      'must be one of 1, 2, 3 but got undefined',
    )
  })

  it('should handle undefined type correctly', () => {
    const array = [1, 2, 3]
    const value = undefined

    expect(() => assertItemOf(array, value)).toThrow(
      'must be one of 1, 2, 3 but got undefined',
    )
  })
})
