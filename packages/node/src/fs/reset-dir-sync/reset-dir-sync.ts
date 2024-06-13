import { mkdirSync, rmSync } from 'fs'

/**
 * 주어진 경로에 해당하는 디렉터리를 재설정하는 함수입니다.
 * 주어진 경로의 디렉터리를 먼저 재귀적으로 제거한 후, 새로운 디렉터리를 생성합니다.
 *
 * @category Utils/Fs
 *
 * @param path - 디렉터리를 재설정할 경로
 */
export const resetDirSync = (path: string): void => {
  rmSync(path, { recursive: true, force: true })
  mkdirSync(path, { recursive: true })
}
