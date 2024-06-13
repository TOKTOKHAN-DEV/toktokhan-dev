import path from 'path'

/**
 * 현재 작업 디렉터리(CWD)의 경로를 계산하여 반환하는 함수입니다.
 *
 * @category Utils/Path
 *
 * @param paths - 작업 디렉터리에 추가될 하위 경로들
 * @returns 현재 작업 디렉터리(CWD)의 경로
 *
 * @example
 * ```typescript
 * // 현재 작업 디렉터리의 경로를 계산하는 예시
 * const filePath = cwd('src', 'components', 'Button');
 * ```
 */
export const cwd = (...paths: string[]) => {
  return path.resolve(process.cwd(), ...paths)
}
