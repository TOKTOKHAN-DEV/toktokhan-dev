import { snakeCase } from 'lodash'
import { vol } from 'memfs'

import { convertFilePathToObject } from './convert-file-path-to-object'

jest.mock('fs')

describe('convertFilePathToObject', () => {
  beforeEach(() => {
    vol.fromNestedJSON({
      dir: {
        'file1.txt': '',
        'file2.txt': '',
        subdir: {
          'file3.txt': '',
          'file4.txt': '',
          'file5.json': '',
        },
      },
    })
  })

  test('by include', () => {
    const result = convertFilePathToObject(
      { includingPattern: ['**/*.txt'] },
      'dir',
    )

    expect(result).toEqual({
      FILE_1: 'file1.txt',
      FILE_2: 'file2.txt',
      SUBDIR: {
        FILE_3: 'subdir/file3.txt',
        FILE_4: 'subdir/file4.txt',
      },
    })
  })

  test('by include', () => {
    const result = convertFilePathToObject(
      { includingPattern: ['**/*.json'] },
      'dir',
    )

    expect(result).toEqual({
      SUBDIR: {
        FILE_5: 'subdir/file5.json',
      },
    })
  })

  test('by include and exclude', () => {
    const result = convertFilePathToObject(
      { includingPattern: ['**/*.txt'], ignoredPattern: ['**/file4.txt'] },
      'dir',
    )

    expect(result).toEqual({
      FILE_1: 'file1.txt',
      FILE_2: 'file2.txt',
      SUBDIR: {
        FILE_3: 'subdir/file3.txt',
      },
    })
  })

  test('with custom format key and value', () => {
    const result = convertFilePathToObject({
      includingPattern: ['**/*.txt'],
      formatKey: (str) => snakeCase(str).toLowerCase(),
      formatValue: ({ path }) => path.toUpperCase(),
    })('dir')

    expect(result).toEqual({
      file_1: 'FILE1.TXT',
      file_2: 'FILE2.TXT',
      subdir: {
        file_3: 'SUBDIR/FILE3.TXT',
        file_4: 'SUBDIR/FILE4.TXT',
      },
    })
  })

  test('with base path', () => {
    const result = convertFilePathToObject({
      includingPattern: ['**/*.txt'],
      formatKey: (str) => snakeCase(str).toLowerCase(),
      formatValue: ({ path }) => path.toUpperCase(),
      basePath: 'base-path',
    })('dir')

    expect(result).toEqual({
      file_1: 'BASE-PATH/FILE1.TXT',
      file_2: 'BASE-PATH/FILE2.TXT',
      subdir: {
        file_3: 'BASE-PATH/SUBDIR/FILE3.TXT',
        file_4: 'BASE-PATH/SUBDIR/FILE4.TXT',
      },
    })
  })
})
