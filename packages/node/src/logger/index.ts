import boxen, { Options } from 'boxen'
import chalk from 'chalk'
import { curry } from 'lodash'

/**
 * 성공 메시지를 생성하는 함수입니다.
 *
 * @category Utils/Logger
 *
 * @param value - 성공 메시지에 추가할 값
 * @returns 성공 메시지 문자열
 *
 * @example
 * ```typescript
 * // 성공 메시지를 생성하는 예시
 * const message = success('Operation completed successfully.');
 * ```
 */
export const success = (value: string): string => {
  return chalk.green(`${chalk.green.bold('success')}:${value}`)
}

/**
 * 오류 메시지를 생성하는 함수입니다.
 *
 * @category Utils/Logger
 *
 * @param value - 오류 메시지에 추가할 값
 * @returns 오류 메시지 문자열
 *
 * @example
 * ```typescript
 * // 오류 메시지를 생성하는 예시
 * const message = error('An error occurred.');
 * ```
 */
export const error = (value: string): string => {
  return chalk.red(`${chalk.red.bold('error')}:${value}`)
}

/**
 * 정보 메시지를 생성하는 함수입니다.
 *
 * @category Utils/Logger
 *
 * @param value - 정보 메시지에 추가할 값
 * @returns 정보 메시지 문자열
 *
 * @example
 * ```typescript
 * // 정보 메시지를 생성하는 예시
 * const message = info('Additional information.');
 * ```
 */
export const info = (value: string): string => {
  return chalk.blue(`${chalk.blue.bold('info')}:${value}`)
}

/**
 * 성공 로그를 출력하는 함수입니다.
 *
 * @category Utils/Logger
 *
 * @param title - 로그 제목
 * @param value - 로그 값
 * @returns 입력된 값
 *
 * @example
 * ```typescript
 * // 성공 로그를 출력하는 예시
 * successLog('Operation', result);
 * successLog('Operation')(result);
 * ```
 */
export const successLog: {
  <T>(title: string, value: T): T
  <T>(title: string): (value: T) => T
} = curry((title: string, value: any) => {
  console.log(success(title), value)
  return value
})

/**
 * 오류 로그를 출력하는 함수입니다.
 *
 * @category Utils/Logger
 *
 * @param title - 로그 제목
 * @param value - 로그 값
 * @returns 입력된 값
 *
 * @example
 * ```typescript
 * // 오류 로그를 출력하는 예시
 * errorLog('Error', errorMessage);
 * errorLog('Error')(errorMessage);
 * ```
 */
export const errorLog: {
  <T>(title: string, value: T): T
  <T>(title: string): (value: T) => T
} = curry((title: string, value: any) => {
  console.log(error(title), value)
  return value
})

/**
 * 정보 로그를 출력하는 함수입니다.
 *
 * @category Utils/Logger
 *
 * @param title - 로그 제목
 * @param value - 로그 값
 * @returns 입력된 값
 *
 * @example
 * ```typescript
 * // 정보 로그를 출력하는 예시
 * infoLog('Information', infoMessage);
 * infoLog('Information')(infoMessage);
 * ```
 */
export const infoLog: {
  <T>(title: string, value: T): T
  <T>(title: string): (value: T) => T
} = curry((title: string, value: any) => {
  console.log(info(title), value)
  return value
})

/**
 * 존재 로그를 출력하는 함수입니다.
 *
 * @category Utils/Logger
 *
 * @param value - 존재 로그에 추가할 값
 * @returns -
 *
 * @example
 * ```typescript
 * // 존재 로그를 출력하는 예시
 * existLog('File exists.');
 * ```
 */
export const existLog = (value: string) => {
  console.log(chalk.black.bgYellow('EXIST'), value)
}

/**
 * 생성 로그를 출력하는 함수입니다.
 *
 * @category Utils/Logger
 *
 * @param value - 생성 로그에 추가할 값
 * @returns -
 *
 * @example
 * ```typescript
 * // 생성 로그를 출력하는 예시
 * generateLog('File generated successfully.');
 * ```
 */
export const generateLog = (value: string) => {
  console.log(chalk.black.bgGreen('GENERATE'), value)
}

/**
 * Prettier 로그를 출력하는 함수입니다.
 *
 * @category Utils/Logger
 *
 * @param value - Prettier 로그에 추가할 값
 * @returns -
 *
 * @example
 * ```typescript
 * // Prettier 로그를 출력하는 예시
 * prettierLog('Code formatted successfully.');
 * ```
 */
export const prettierLog = (value: string) => {
  console.log(chalk.bgBlue('PRETTIER'), value)
}

/**
 * box형태의 로그를 출력하는 함수입니다.
 *
 * @category Utils/Logger
 * @param value - box 로그에 추가할 값
 *
 * @returns -
 *
 * @example
 * ```typescript
 * // Box 로그를 출력하는 예시
 * boxLog(['box log 1', 'box log 2'], {title: 'Toktokhan'})
 * ┌ Toktokhan_Dev ┐
 * │               │
 * │   box log 1   │
 * │   box log 2   │
 * │               │
 * └───────────────┘
 * ```
 */
export const boxLog = (value: string[], options: Options) => {
  console.log(
    boxen(value.join('\n'), {
      titleAlignment: 'center',
      padding: 1,
      ...options,
      title: chalk.green.bold(options.title),
    }),
  )
}
