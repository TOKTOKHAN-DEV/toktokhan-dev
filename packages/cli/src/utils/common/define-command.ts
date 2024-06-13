import { MyCommand } from '../../types/my-command'

/**
 * 명령어를 정의하는 함수입니다.
 *
 * @category Utils
 *
 * @typeParam Name - 명령어의 이름 타입입니다.
 * @typeParam Config - 명령어의 구성 타입입니다.
 *
 * @param config - 명령어의 설정입니다.
 * @returns 정의된 명령어 설정을 반환합니다.
 */

export const defineCommand = <
  Name extends string,
  Config extends Record<string, any>,
>(
  config: MyCommand<Config, Name>,
) => {
  return config
}
