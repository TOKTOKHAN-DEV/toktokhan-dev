import { suffix } from './suffix'

describe('suffix', () => {
  it('should add suffix to the string', () => {
    const suffixedStr1 = suffix('-post', 'string')
    expect(suffixedStr1).toBe('string-post')

    const suffixWithDot = suffix('.')
    const suffixedStr2 = suffixWithDot('extension')
    expect(suffixedStr2).toBe('extension.')

    const suffixedStr3 = suffix('!', 'Hello')
    expect(suffixedStr3).toBe('Hello!')
  })

  it('should work correctly in curried form', () => {
    const suffixedStr1 = suffix('-post')('string')
    expect(suffixedStr1).toBe('string-post')

    const suffixWithDot = suffix('.')
    const suffixedStr2 = suffixWithDot('extension')
    expect(suffixedStr2).toBe('extension.')

    const suffixedStr3 = suffix('!')('Hello')
    expect(suffixedStr3).toBe('Hello!')
  })
})
