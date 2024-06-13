/**
 * 설정 객체의 유형을 설명하는 타입입니다.
 *
 * @category Types
 *
 * @typeParam Config - 설정 객체의 타입입니다.
 */
export type ConfigType<Config> = {
  /**
   * 설정 객체의 각 키에 대한 속성을 정의합니다.
   */
  [key in keyof Config]?: {
    /**
     * 설정 객체의 키 이름입니다.
     */
    name: key
    /**
     * 설정 객체의 키에 대한 별칭입니다.
     */
    alias?: string
    /**
     * 설정 객체의 값의 유형을 설명합니다.
     */
    type?: NonNullable<Config[key]> extends string ? 'string'
    : NonNullable<Config[key]> extends boolean ? 'boolean'
    : NonNullable<Config[key]> extends number ? 'number'
    : NonNullable<Config[key]> extends string[] ? 'string[]'
    : NonNullable<Config[key]> extends boolean[] ? 'boolean[]'
    : NonNullable<Config[key]> extends number[] ? 'number[]'
    : NonNullable<Config[key]> extends any[][] ? 'array[]'
    : NonNullable<Config[key]> extends Record<any, any>[] ? 'object[]'
    : NonNullable<Config[key]> extends Record<any, any> ? 'object'
    : 'any'
    /**
     * 설정 객체의 키에 대한 설명입니다.
     */
    description?: string
  }
}

/**
 * 사용자 정의 명령어를 나타내는 인터페이스입니다.
 *
 * @category Types
 *
 * @typeParam Config - 명령어의 구성을 나타내는 설정 객체의 타입입니다. 기본값은 `any`입니다.
 * @typeParam Name - 명령어의 이름의 타입입니다. 기본값은 `string`입니다.
 */
export interface MyCommand<Config = any, Name extends string = string> {
  /**
   * 명령어의 이름입니다.
   */
  name: Name
  /**
   * 명령어의 설명입니다.
   */
  description: string
  /**
   * 명령어의 기본 구성입니다.
   */
  default: Partial<Config>
  /**
   * 명령어를 실행하는 함수입니다.
   *
   * @param config - 명령어의 구성을 나타내는 설정 객체입니다.
   */
  run: (config: Config) => void
  /**
   * 명령어의 CLI 옵션 목록입니다.
   */
  cliOptions?: ConfigType<Config>[keyof Config][]
}
