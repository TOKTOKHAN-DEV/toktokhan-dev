import { readFileSync as _readFileSync } from 'fs'

import { curry } from 'lodash'

/**
 * 동기적으로 파일을 읽어오는 함수입니다.
 *
 * @category Utils/Fs
 *
 * @param encoding - 파일의 인코딩 유형
 * @param path - 읽을 파일의 경로
 * @returns 파일의 내용을 문자열로 반환합니다.
 *
 * @example
 * ```typescript
 * // 파일을 동기적으로 읽어오는 예시
 * const content = readFileSync('utf-8', 'example.txt');
 * const content = readFileSync('utf-8')('example.txt');
 *
 * ```
 */
export const readFileSync: {
  (encoding: BufferEncoding, path: string): string
  (encoding: BufferEncoding): (path: string) => string
} = curry((encoding: BufferEncoding, path: string) =>
  _readFileSync(path, { encoding }),
)
