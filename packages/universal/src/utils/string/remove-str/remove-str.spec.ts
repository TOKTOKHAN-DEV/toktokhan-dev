import { removeStr } from './remove-str'

describe('removeStr', () => {
  it('should remove specified string from the input string', () => {
    const removedStr1 = removeStr('a', 'banana')
    expect(removedStr1).toBe('bnn')

    const removeA = removeStr('a')
    const removedStr2 = removeA('apple')
    expect(removedStr2).toBe('pple')

    const removedStr3 = removeStr(' ', 'hello world')
    expect(removedStr3).toBe('helloworld')
  })

  it('should work correctly in curried form', () => {
    const removedStr1 = removeStr('a')('banana')
    expect(removedStr1).toBe('bnn')

    const removeA = removeStr('a')
    const removedStr2 = removeA('apple')
    expect(removedStr2).toBe('pple')

    const removedStr3 = removeStr(' ')('hello world')
    expect(removedStr3).toBe('helloworld')
  })
})
