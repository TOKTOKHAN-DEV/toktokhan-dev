import path from 'path'

import { vol } from 'memfs'

import { findFileToBottom } from './find-file-to-bottom'

jest.mock('fs')

describe('findFileToBottom', () => {
  beforeEach(() => {
    vol.fromNestedJSON({
      root: {
        'file1.txt': '',
        subdir1: {
          'file2.txt': '',
          subdir2: {
            'file3.txt': '',
          },
        },
      },
    })
  })

  test('find file in root directory', () => {
    // Given
    const root = 'root'
    const filename = 'file1.txt'
    const expectedPath = path.resolve(root, filename)

    // When
    const result = findFileToBottom(root, filename)

    // Then
    expect(result).toEqual(expectedPath)
  })

  test('find file in subdirectory', () => {
    // Given
    const root = 'root'
    const filename = 'file2.txt'
    const expectedPath = path.resolve(root, 'subdir1', filename)

    // When
    const result = findFileToBottom(root, filename)

    // Then
    expect(result).toEqual(expectedPath)
  })

  test('find file in nested subdirectories', () => {
    // Given
    const root = 'root'
    const filename = 'file3.txt'
    const expectedPath = path.resolve(root, 'subdir1', 'subdir2', filename)

    // When
    const result = findFileToBottom(root, filename)

    // Then
    expect(result).toEqual(expectedPath)
  })

  test('return null if file not found', () => {
    // Given
    const root = 'root'
    const filename = 'non-existent.txt'

    // When
    const result = findFileToBottom(root, filename)

    // Then
    expect(result).toBeNull()
  })
})
