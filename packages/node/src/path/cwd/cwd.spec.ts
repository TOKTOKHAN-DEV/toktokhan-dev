import path from 'path'

import { cwd } from './cwd'

describe('cwd', () => {
  test('calculate current working directory path', () => {
    // Given
    const expectedPath = path.resolve(
      process.cwd(),
      'src',
      'components',
      'Button',
    )

    // When
    const result = cwd('src', 'components', 'Button')

    // Then
    expect(result).toEqual(expectedPath)
  })

  test('calculate current working directory path with single path', () => {
    // Given
    const expectedPath = path.resolve(process.cwd(), 'src')

    // When
    const result = cwd('src')

    // Then
    expect(result).toEqual(expectedPath)
  })

  test('calculate current working directory path without additional paths', () => {
    // Given
    const expectedPath = process.cwd()

    // When
    const result = cwd()

    // Then
    expect(result).toEqual(expectedPath)
  })
})
