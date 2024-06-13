import fs from 'fs'

import { vol } from 'memfs'

import { forEachFiles } from './for-each-files'

jest.mock('fs')

describe('forEachFiles', () => {
  beforeAll(() => {
    vol.fromNestedJSON({
      '/root': {
        'file1.txt': 'Hello',
        'file2.txt': 'World',
        dir1: {
          'file3.txt': 'foo',
          'file4.txt': 'bar',
        },
        dir2: {},
      },
    })
  })

  afterAll(() => {
    vol.reset()
  })

  test('iterate through all files and directories recursively', () => {
    const visited: string[] = []
    const callback = (file: fs.Dirent) => visited.push(file.name)
    forEachFiles({ each: callback, recursive: true }, '/root')

    expect(visited.sort()).toEqual(
      [
        'file1.txt',
        'file2.txt',
        'dir1',
        'file3.txt',
        'file4.txt',
        'dir2',
      ].sort(),
    )
  })

  test('iterate through directories only', () => {
    const visited: string[] = []
    const callback = (file: fs.Dirent) => visited.push(file.name)
    forEachFiles(
      { each: callback, recursive: true, filter: (file) => file.isDirectory() },
      '/root',
    )
    expect(visited.sort()).toEqual(['dir1', 'dir2'].sort())
  })

  test('iterate through files only', () => {
    const visited: string[] = []
    const callback = (file: fs.Dirent) => visited.push(file.name)
    forEachFiles(
      { each: callback, recursive: true, filter: (file) => file.isFile() },
      '/root',
    )
    expect(visited.sort()).toEqual(
      ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'].sort(),
    )
  })
})
