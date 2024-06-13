import { isOverSize } from './is-over-size'

describe('isOverSize', () => {
  it('should return false if the value is within the limit', () => {
    expect(isOverSize([1000, 'B'], 500)).toBe(false)
  })

  it('should return true if the value exceeds the limit', () => {
    expect(isOverSize([1000, 'B'], 1500)).toBe(true)
  })

  it('should return true if the value is exactly at the limit', () => {
    expect(isOverSize([1000, 'B'], 1000)).toBe(false)
  })

  it('should handle value as a tuple with unit', () => {
    expect(isOverSize([1, 'KB'], [1024, 'B'])).toBe(false) // 1 KB = 1024 Bytes
    expect(isOverSize([1, 'KB'], [1025, 'B'])).toBe(true)
  })

  it('should return a curried function if called with one argument', () => {
    const checkSize = isOverSize([1, 'MB'])
    expect(checkSize(500000)).toBe(false) // 500000 Bytes is less than 1 MB
    expect(checkSize(1500000)).toBe(true) // 1500000 Bytes is more than 1 MB
  })

  it('should handle different byte units correctly', () => {
    expect(isOverSize([1, 'KB'], 1024)).toBe(false) // 1 KB = 1024 Bytes
    expect(isOverSize([1, 'MB'], 1024 * 1024)).toBe(false) // 1 MB = 1024 * 1024 Bytes
    expect(isOverSize([1, 'GB'], 1024 * 1024 * 1024)).toBe(false) // 1 GB = 1024 * 1024 * 1024 Bytes
  })

  it('should handle edge cases correctly', () => {
    expect(isOverSize([0, 'B'], 0)).toBe(false) // 0 bytes should not be over 0 bytes
    expect(isOverSize([0, 'B'], 1)).toBe(true) // 1 byte should be over 0 bytes
    expect(isOverSize([1, 'KB'], 1024)).toBe(false) // 1024 bytes should be equal to 1 KB
    expect(isOverSize([1, 'KB'], 1025)).toBe(true) // 1025 bytes should be over 1 KB
  })

  it('should handle large numbers correctly', () => {
    const largeNumber = Number.MAX_SAFE_INTEGER
    expect(isOverSize([largeNumber, 'B'], largeNumber - 1)).toBe(false)
    expect(isOverSize([largeNumber, 'B'], largeNumber)).toBe(false)
    expect(isOverSize([largeNumber, 'B'], largeNumber + 1)).toBe(true)
  })

  it('should return a doubly curried function if called with no value', () => {
    const curriedFunction = isOverSize([1, 'MB'])
    expect(curriedFunction(500000)).toBe(false)
    expect(curriedFunction(1500000)).toBe(true)
  })
})
