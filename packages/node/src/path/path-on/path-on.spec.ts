import path from 'path'

import { pathOn } from './path-on'

describe('pathOn', () => {
  test('combine base path and target path', () => {
    const resolvePath = pathOn('home', 'file.txt')
    const expected = path.join('home', 'file.txt')

    expect(resolvePath).toBe(expected)
  })

  test('combine base path and target path (curried)', () => {
    const resolvePath = pathOn('home')
    const expected = path.join('home', 'file.txt')

    expect(resolvePath('file.txt')).toBe(expected)
  })
})
