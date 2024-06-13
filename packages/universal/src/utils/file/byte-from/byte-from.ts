import { curry } from 'lodash/fp'

import { ByteUnit } from '../../../types/static/byte-unit'
import { multiply } from '../../math'

/**
 * @category Utils/File
 *
 * 특정 바이트 단위를 바이트로 변환합니다.
 *
 * @param from - 변환할 바이트 단위
 * @param value - 변환할 값
 *
 * @returns 변환된 바이트 값
 *
 * @example
 * ```ts
 * byteFrom('KB', 1) // 1024
 * byteFrom('KB')(1) // 1024
 * ```
 */
export const byteFrom: {
  (from: ByteUnit, value: number): number
  (from: ByteUnit): (value: number) => number
} = curry((from: ByteUnit, value: number): number => {
  switch (from) {
    case 'B':
      return value
    case 'KB':
      return multiply(value, 1024)
    case 'MB':
      return multiply(value, 1024 ** 2)
    case 'GB':
      return multiply(value, 1024 ** 3)
    case 'TB':
      return multiply(value, 1024 ** 4)
    default:
      return value
  }
})
