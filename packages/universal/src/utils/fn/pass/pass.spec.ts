import { pass } from './pass'

describe('pass', () => {
  it('should return a function that returns the provided data', () => {
    const data = { id: 1, name: 'John' }
    const getData = pass(data)

    const result = getData()

    expect(result).toEqual(data)
  })
})
