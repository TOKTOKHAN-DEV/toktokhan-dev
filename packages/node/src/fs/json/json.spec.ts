import { vol } from 'memfs'

import { json } from './json'

jest.mock('fs')

describe('json', () => {
  beforeEach(() => {
    vol.fromJSON({
      'data.json': '{"name": "John", "age": 30}',
      'empty.json': '{}',
    })
  })

  test('read and parse JSON file', () => {
    const data = json('data.json')

    expect(data).toEqual({ name: 'John', age: 30 })
  })

  test('read and parse empty JSON file', () => {
    const data = json('empty.json')

    expect(data).toEqual({})
  })

  test('read and parse non-existent file', () => {
    expect(() => {
      json('non-exist.json')
    }).toThrowError()
  })
})
