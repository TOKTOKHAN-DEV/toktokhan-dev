import path from 'path'

import { pathOf } from './path-of'

describe('pathOf', () => {
  test('combine target path and base path', () => {
    const resolvePath = pathOf('file.txt', 'home')
    const expected = path.join('home', 'file.txt')

    expect(resolvePath).toBe(expected)
  })

  test('combine target path and base path (curried)', () => {
    const resolvePath = pathOf('file.txt')
    const expected = path.join('home', 'file.txt')

    expect(resolvePath('home')).toBe(expected)
  })
})
