import { minimatch } from 'minimatch'

export interface CheckFileAccessParam {
  /**
   * 체크할 파일 경로
   */
  filename: string
  /**
   * 포함할 파일 경로 glob 패턴
   */
  include?: string[]
  /**
   * 제외할 파일 경로 glob 패턴
   */
  ignored?: string[]
}

/**
 * 파일 접근 권한을 확인합니다.
 *
 * @category Utils/Fs
 */
export const checkFileAccess = ({
  filename,
  include,
  ignored,
}: CheckFileAccessParam): boolean => {
  const check = (patterns: string[], path: string) => {
    return patterns.some((pattern) => minimatch(path, pattern))
  }

  if (!include?.length && !ignored?.length) return true
  if (!include?.length) return !check(ignored || [], filename)
  if (!ignored?.length) return check(include, filename)
  return check(include, filename) && !check(ignored || [], filename)
}
