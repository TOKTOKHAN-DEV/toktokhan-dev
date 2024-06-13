import path from 'path'

import { vol } from 'memfs'

import { findFile } from './find-file'

jest.mock('fs')

describe('findFile', () => {
  beforeEach(() => {
    vol.fromNestedJSON({
      root: {
        'file1.txt': '',
        subdir: {
          'file2.txt': '',
        },
      },
    })
  })

  test('find file in same directory', () => {
    // Given
    const dir = 'root'
    const filename = 'file1.txt'
    const expectedPath = path.resolve(dir, filename)

    // When
    const result = findFile(dir, filename)

    // Then
    expect(result).toEqual(expectedPath)
  })

  test('find file in subdirectory', () => {
    // Given
    const dir = path.resolve('root', 'subdir')
    const filename = 'file2.txt'
    const expectedPath = path.resolve(dir, filename)

    // When
    const result = findFile(dir, filename)

    // Then
    expect(result).toEqual(expectedPath)
  })

  test('return null if file not found', () => {
    // Given
    const dir = 'root'
    const filename = 'non-existent.txt'

    // When
    const result = findFile(dir, filename)

    // Then
    expect(result).toBeNull()
  })
})
