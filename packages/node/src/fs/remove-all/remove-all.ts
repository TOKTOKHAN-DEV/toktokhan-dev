import { rmSync } from 'fs'

/**
 * 주어진 경로의 디렉터리 또는 파일을 재귀적으로 제거하는 함수입니다.
 * @category Utils/Fs
 *
 * @param path - 제거할 디렉터리 또는 파일의 경로
 */
export const removeAll = (path: string) => {
  rmSync(path, { recursive: true, force: true })
}
