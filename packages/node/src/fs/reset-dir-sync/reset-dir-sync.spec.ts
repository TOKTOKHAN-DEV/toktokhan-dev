import { vol } from 'memfs'

import { resetDirSync } from './reset-dir-sync'

jest.mock('fs')

describe('resetDirSync', () => {
  beforeEach(() => {
    vol.fromNestedJSON({
      existingDir: {
        'file1.txt': 'contents',
        subDir: {
          'file2.txt': 'contents',
        },
      },
      emptyDir: {},
    })
  })

  test('reset existing directory', () => {
    const path = '/existingDir'
    resetDirSync(path)

    expect(vol.existsSync(path)).toBe(true)
    expect(vol.readdirSync(path)).toEqual([])
  })

  test('reset empty directory', () => {
    const path = '/emptyDir'
    resetDirSync(path)

    expect(vol.existsSync(path)).toBe(true)
    expect(vol.readdirSync(path)).toEqual([])
  })

  test('reset non-existent directory', () => {
    const path = '/nonExistentDir'
    resetDirSync(path)

    expect(vol.existsSync(path)).toBe(true)
    expect(vol.readdirSync(path)).toEqual([])
  })
})
