import path from 'path'

import { vol } from 'memfs'

import { createPackageRoot } from './package-root'

jest.mock('fs')

describe('createPackageRoot', () => {
  beforeAll(() => {
    vol.fromNestedJSON({
      root: {
        'package.json': '{}',
        src: {
          components: {
            Button: '',
          },
        },
      },
      root_empty: {
        src: {
          components: {
            Button: '',
          },
        },
      },
    })
  })

  afterAll(() => {
    vol.reset()
  })

  test('create directory relative to package.json', () => {
    const packageRoot = createPackageRoot(
      path.join('root', 'src', 'components'),
    )

    expect(packageRoot('src')).toBe(path.resolve('root', 'src'))
  })

  test('throw error if package.json not found', () => {
    const packageRoot = createPackageRoot(
      path.join('root_empty', 'src', 'components'),
    )

    expect(() => packageRoot('src')).toThrowError('package.json not found')
  })
})
