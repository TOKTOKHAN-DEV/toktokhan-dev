import {
  ChildProcess,
  SpawnSyncOptionsWithBufferEncoding,
  spawn,
} from 'child_process'

/**
 * execa를 사용하여 주어진 명령어를 실행합니다.
 *
 * @category Utils/Process
 *
 * @param cmd - 실행할 명령어입니다.
 * @param args - 명령어에 전달할 인수들입니다.
 * @param options - execa 옵션입니다.
 * @returns execaChildProcess 객체를 반환합니다.
 *
 * @example
 * ```typescript
 * // execa를 사용하여 명령어를 실행하는 예시
 * const result = $(cmd, args, options);
 * ```
 */
export function $(
  cmd: string,
  args: string[],
  options?: SpawnSyncOptionsWithBufferEncoding,
): ChildProcess {
  return spawn(cmd, args, { stdio: 'inherit', ...options })
}
