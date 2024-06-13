import { vol } from 'memfs'

import { removeAll } from './remove-all'

jest.mock('fs')

describe('removeAll', () => {
  beforeEach(() => {
    vol.fromNestedJSON({
      dir1: {
        'file1.txt': 'contents',
        dir2: {
          'file2.txt': 'contents',
          dir3: {},
        },
      },
    })
  })

  test('remove directory recursively', () => {
    const path = 'dir1'

    removeAll(path)

    expect(vol.existsSync(path)).toBe(false)
  })

  test('remove file', () => {
    const path = 'dir1/file1.txt'
    const path2 = 'dir1/dir2/file2.txt'

    removeAll(path)

    expect(vol.existsSync(path)).toBe(false)
    expect(vol.existsSync(path2)).toBe(true)
  })

  test('remove non-existent file or directory', () => {
    const path = '/non-existent'

    expect(() => {
      removeAll(path)
    }).not.toThrowError()
  })
})
