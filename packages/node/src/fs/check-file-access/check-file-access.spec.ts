import { checkFileAccess } from './check-file-access'

describe('checkFileAccess', () => {
  test('file is only included', () => {
    const include = ['dir/**/*.txt']

    const result = checkFileAccess({ filename: 'dir/file.txt', include })
    const result2 = checkFileAccess({ filename: 'dir/file.json', include })

    expect(result).toBe(true)
    expect(result2).toBe(false)
  })

  test('file is only ignored', () => {
    const ignored = ['dir/**/*.txt']

    const result = checkFileAccess({ filename: 'dir/file.txt', ignored })
    const result2 = checkFileAccess({ filename: 'dir/file.json', ignored })

    expect(result).toBe(false)
    expect(result2).toBe(true)
  })

  test('file is included and not ignored', () => {
    const filename = 'dir/file.txt'
    const include = ['dir/**/*.txt']
    const ignored = ['dir/subdir/**']

    const result = checkFileAccess({ filename, include, ignored })

    expect(result).toBe(true)
  })

  test('file is not included', () => {
    const filename = 'dir/subdir/file2.txt'
    const include = ['dir/**/*.md']
    const ignored = ['dir/subdir/**']

    const result = checkFileAccess({ filename, include, ignored })

    expect(result).toBe(false)
  })

  test('file is included but ignored', () => {
    const filename = 'dir/subdir/file2.txt'
    const include = ['dir/**/*.txt']
    const ignored = ['dir/subdir/**']

    const result = checkFileAccess({ filename, include, ignored })

    expect(result).toBe(false)
  })

  test('file is neither included nor ignored', () => {
    const filename = 'dir/file.txt'
    const include = ['dir/**/*.md']
    const ignored = ['dir/subdir/**']

    const result = checkFileAccess({ filename, include, ignored })

    expect(result).toBe(false)
  })
})
