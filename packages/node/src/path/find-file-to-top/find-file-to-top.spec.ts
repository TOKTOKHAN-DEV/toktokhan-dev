import path from 'path'

import { vol } from 'memfs'

import { findFileToTop } from './find-file-to-top'

jest.mock('fs')

describe('findFileToTop', () => {
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
  test('find file in same directory', () => {
    // Given
    const root = 'root'
    const filename = 'file1.txt'
    const expectedPath = path.resolve(root, filename)

    // When
    const result = findFileToTop(root, filename)

    // Then
    expect(result).toEqual(expectedPath)
  })

  test('find file in parent directory', () => {
    // Given
    const root = 'root/subdir1/subdir2'
    const filename = 'file1.txt'
    const expectedPath = path.resolve(root, '..', '..', filename)

    // When
    const result = findFileToTop(root, filename)

    // Then
    expect(result).toEqual(expectedPath)
  })

  test('return null if file not found', () => {
    // Given
    const root = 'root/subdir1/subdir2'
    const filename = 'non-existent.txt'

    // When
    const result = findFileToTop(root, filename)

    // Then
    expect(result).toBeNull()
  })
})
