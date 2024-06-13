import { paginate } from './paginate'

// Adjust the import path as needed

describe('paginate', () => {
  test('should return an empty array when input array is empty', () => {
    const result = paginate(3, [])
    expect(result).toEqual([])
  })

  test('should return the same array when the limit is greater than array length', () => {
    const arr = [1, 2, 3]
    const result = paginate(5, arr)
    expect(result).toEqual([arr])
  })

  test('should paginate the array correctly when limit is smaller than array length', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const result = paginate(3, arr)
    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  })

  test('should handle arrays that are not perfectly divisible by the limit', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = paginate(2, arr)
    expect(result).toEqual([[1, 2], [3, 4], [5]])
  })

  test('should handle a limit of 1 correctly', () => {
    const arr = [1, 2, 3]
    const result = paginate(1, arr)
    expect(result).toEqual([[1], [2], [3]])
  })

  test('should handle a limit equal to the length of the array', () => {
    const arr = [1, 2, 3]
    const result = paginate(3, arr)
    expect(result).toEqual([[1, 2, 3]])
  })

  test('should handle a limit equal to the length of the array', () => {
    const arr = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ]
    const result = paginate(2, arr)
    expect(result).toEqual([
      [
        [1, 1, 1],
        [1, 1, 1],
      ],
      [[1, 1, 1]],
    ])
  })
})
