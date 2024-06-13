import { byteTo } from './byte-to'

describe('byteTo', () => {
  it('should return the same value for bytes', () => {
    expect(byteTo('B', 1024)).toBe(1024)
  })

  it('should convert bytes to kilobytes', () => {
    expect(byteTo('KB', 1024)).toBe(1)
  })

  it('should convert bytes to megabytes', () => {
    expect(byteTo('MB', 1024 ** 2)).toBe(1)
  })

  it('should convert bytes to gigabytes', () => {
    expect(byteTo('GB', 1024 ** 3)).toBe(1)
  })

  it('should convert bytes to terabytes', () => {
    expect(byteTo('TB', 1024 ** 4)).toBe(1)
  })

  it('should return a curried function when called with one argument', () => {
    const toKb = byteTo('KB')
    expect(toKb(1024)).toBe(1)
  })
})
