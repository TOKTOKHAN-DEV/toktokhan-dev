import { byteFromTo } from './byte-from-to'

describe('byteTo', () => {
  it('curried', () => {
    expect(byteFromTo('B', 'KB', 1024)).toBe(1)
    expect(byteFromTo('B')('KB', 1024)).toBe(1)
    expect(byteFromTo('B', 'KB')(1024)).toBe(1)
    expect(byteFromTo('B')('KB')(1024)).toBe(1)
  })

  it('B to kb', () => {
    const B2KB = byteFromTo('B', 'KB')
    expect(B2KB(1024)).toBe(1)
  })

  it('kb to B', () => {
    const KB2B = byteFromTo('KB', 'B')
    expect(KB2B(1)).toBe(1024)
  })

  it('mb to gb', () => {
    const MB2GB = byteFromTo('MB', 'GB')
    expect(MB2GB(1024)).toBe(1)
  })
})
