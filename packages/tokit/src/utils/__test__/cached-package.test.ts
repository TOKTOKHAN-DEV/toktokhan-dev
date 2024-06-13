import path from 'path'

import { CACHE_PATH } from '../../constants'
import { cachedPackage } from '../cached-package'

describe('cachedPackage', () => {
  const packageName = 'example-package'
  const packageVersion = '1.0.0'
  const expectedPath = path.resolve(
    CACHE_PATH,
    packageName,
    `v${packageVersion}`,
  )

  test('returns the correct cached package path', () => {
    expect(cachedPackage(packageName, packageVersion)).toBe(expectedPath)
  })
})
