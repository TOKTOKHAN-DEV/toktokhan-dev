import { MyCommand } from './my-command'

/**
 * 루트 구성을 정의하는 타입입니다.
 *
 * @category Types
 *
 * @typeParam P - 플러그인 명령어 배열을 포함하는 객체의 타입입니다. 기본값은 `{ plugins: MyCommand[] }` 입니다.
 *
 * @typeParam P['plugins'] - 플러그인 명령어 배열의 타입입니다.
 *
 */
export type RootConfig<
  P extends {
    plugins: MyCommand[]
  } = {
    plugins: MyCommand[]
  },
> = {
  basePath?: string
  plugins?: MyCommand[]
} & {
  [key in P['plugins'][number]['name']]?: Extract<
    P['plugins'][number],
    { name: key }
  >['default']
}
