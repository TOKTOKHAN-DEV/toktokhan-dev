import { curry, flow, isArray } from 'lodash/fp'

import { ByteUnit } from '../../../types/static/byte-unit'
import { pass } from '../../fn/pass'
import { byteFrom } from '../byte-from'

/**
 * @category Utils/File
 * 주어진 파일 크기가 최대 크기를 초과하는지 확인하는 함수입니다.
 *
 * @example
 * ```ts
 * // 값이 500바이트인 경우
 * isOverSize([1000, 'B'], 500); // false
 *
 * // 커링 사용 예
 * const isOver1MB = isOverSize([1, 'MB']);
 * isOver1MB(500000); // true
 * ```
 *
 * @param maxSize - 파일의 최대 크기
 * @param value - 검사할 값. 바이트 단위의 숫자 또는 크기와 단위를 포함하는 배열
 * @returns 값이 최대 크기를 초과하면 true, 그렇지 않으면 false
 */

export const isOverSize: {
  (
    maxSize: [value: number, unit: ByteUnit],
    value: number | [value: number, unit: ByteUnit],
  ): boolean
  (
    maxSize: [value: number, unit: ByteUnit],
  ): (value: number | [value: number, unit: ByteUnit]) => boolean
} = curry(
  (
    maxSize: [value: number, unit: ByteUnit],
    value: number | [value: number, unit: ByteUnit],
  ): boolean =>
    flow(
      pass(maxSize[0]),
      byteFrom(maxSize[1]),
      (maxSize) => [
        maxSize,
        isArray(value) ? byteFrom(value[1], value[0]) : byteFrom('B', value),
      ],
      ([maxSize, target]) => maxSize < target,
    )(),
)
