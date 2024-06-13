import ora, { Ora } from 'ora'

import { error, success } from '../..'

/**
 * 로딩 상태를 보여주면서 비동기 작업을 실행합니다.
 *
 * @category Utils/Process
 *
 * @param title - 로딩 상태 메시지의 제목입니다.
 * @param description - 로딩 상태 메시지의 설명입니다.
 * @param callback - 비동기 작업을 수행하는 함수입니다. 로딩 상태를 갱신하기 위해 `spinner` 객체를 전달받습니다.
 * @param options - 옵션 객체로, 오류 발생 시 처리 방법을 지정합니다.
 * @param options.onError - 오류가 발생했을 때 실행할 콜백 함수입니다.
 * @returns 비동기 작업의 결과를 반환합니다.
 *
 * @example
 * ```typescript
 * // 로딩 상태를 보여주면서 비동기 작업을 실행하는 예시
 * const result = await withLoading(
 *   'Loading',
 *   'Some description',
 *   async (spinner) => {
 *     // 비동기 작업 수행
 *   },
 *   {
 *     onError: (err) => {
 *       // 오류 처리
 *     },
 *   }
 * );
 * ```
 */
export async function withLoading<T, E = any>(
  title: string,
  description: string,
  callback: (spinner: Ora) => T,
  options?: {
    onError: (err: E) => void
  },
) {
  const spinner = ora().start(`${title}\n`)
  try {
    const res = await callback(spinner)
    spinner
      .succeed(`${success(title)} ${description}`)
      .stop()
      .clear()
    return res
  } catch (err) {
    console.error(err)
    options?.onError?.(err as E)
    spinner.fail(`${error(title)} ${description}`).clear()
  }
}
