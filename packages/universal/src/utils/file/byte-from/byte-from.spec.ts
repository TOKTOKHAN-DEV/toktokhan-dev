import { byteFrom } from './byte-from'

describe('byteFrom', () => {
  it('curried', () => {
    expect(byteFrom('B')(1024)).toBe(1024)
    expect(byteFrom('B', 1024)).toBe(1024)
  })

  it('KB to Byte', () => {
    expect(byteFrom('KB', 1)).toBe(1024)
  })

  it('MB to Byte', () => {
    expect(byteFrom('MB', 1)).toBe(1024 ** 2)
  })

  it('GB to Byte', () => {
    expect(byteFrom('GB', 1)).toBe(1024 ** 3)
  })
})
