import { vol } from 'memfs'

import { yaml } from './yaml'

jest.mock('fs')

describe('yaml', () => {
  beforeEach(() => {
    vol.fromJSON({
      'data.yaml': 'name: John\nage: 30',
      'empty.yaml': '',
    })
  })

  test('read and parse YAML file', () => {
    const data = yaml('data.yaml')

    expect(data).toEqual({ name: 'John', age: 30 })
  })

  test('read and parse empty YAML file', () => {
    const data = yaml('empty.yaml')

    expect(data).toEqual(null)
  })

  test('read and parse non-existent file', () => {
    expect(() => {
      yaml('non-exist.yaml')
    }).toThrowError()
  })
})
