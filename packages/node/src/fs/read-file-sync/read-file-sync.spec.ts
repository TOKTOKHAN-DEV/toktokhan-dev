import { vol } from 'memfs'

import { readFileSync } from './read-file-sync'

jest.mock('fs')

describe('readFileSync', () => {
  beforeEach(() => {
    vol.fromJSON({
      'example.txt': 'This is an example text file.',
    })
  })

  test('read file synchronously with specified encoding', () => {
    const content = readFileSync('utf-8', 'example.txt')
    const content2 = readFileSync('utf-8')('example.txt')
    expect(content).toEqual('This is an example text file.')
    expect(content2).toEqual('This is an example text file.')
  })
})
