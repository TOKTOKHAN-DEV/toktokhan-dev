# @toktohan-dev/cli

tok-cli.config.ts 파일을 읽어, 등록된 tokript 스크립트를 실행시키는 cli 입니다. 스크립트를 생성하는 `definePlugin` 함수를 제공합니다. 자세한 내용은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Overview)에서 확인 할 수 있습니다.

## Installation

```
npm i -D @oktokhan-dev/cli
```

## Preview

`tokript2` 명령어로 아무 인자 없이 실행할 경우, 대화형모드로 플러그인으로 등록된 기능들을 사용할 수 있습니다.

```bash
npx tokript2

 _             _             _           _
 | |_    ___   | | __  _ __  (_)  _ __   | |_
 | __|  / _ \  | |/ / | '__| | | | '_ \  | __|
 | |_  | (_) | |   <  | |    | | | |_) | | |_
  \__|  \___/  |_|\_\ |_|    |_| | .__/   \__|
                                 |_|
Usage: tokript [options] [command]

CLI to help tok's working

Options:
  -V, --version        output the version number
  -c, --config         config file path
  -h, --help           display help for command

Commands:
  gen:img [options]    Generate image object from image files in the folder.
  gen:route [options]  Generate route object from page files in the folder.
  gen:api              swagger schema 를 기반으로 api 를 생성합니다.
  gen:theme [options]  theme json 파일기반으로 Chakra theme token 생성합니다. theme json 은 피그마 플러그인으로 부터 생성된 json 파일입니다.
  gen:icon [options]   Generate Chakra-UI Icon Component from svg files in the folder.
  commit [options]     대화형 cli 를 통해 일관된 형식의 커밋 메시지 작성을 도와주는 플러그인 입니다.
  help [command]       display help for command


? Pick Resolver …
gen:img
gen:route
gen:api
gen:theme
gen:icon
commit
```

`command` 와 `Option` 을 인자로 넣어 바로 실행 할 수 있습니다.

```
tokript2 gen:img --input 'public/images'
```

#### Offical plugins

똑똑한 개발자가 제공하는 Official Plugin 은 [여기]()서 확인할 수 있습니다.

```ts
// tok-cli.config.ts

import { genImg } from '@toktokhan-dev/cli-plugin-gen-img'

const config: RootConfig<{
  plugins: [typeof genImg]
}> = {
  plugins: [genImg],
  'gen:img': {
    ...
  },
}

export default config

```

#### Plugin Development

플러그인 개발에 대한 자세한 내용은 [여기](https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Plugin%20Development)서 확인 할 수 있습니다.

```ts
import fs from 'fs'
import path from 'path'

import { defineCommand } from '@toktokhan-dev/cli'

/**
 * 플러그인의 config 타입을 정의합니다.
 *
 * - tok-cli.config.ts 에서 해당 플러그인의 option 을 정의할 때 사용됩니다.
 * - config 파일은 js, ts 이기 때문에, 옵션 객체의 각 property 는 함수, 배열 등 어떤 타입이든 정의 가능합니다.
 * - run 함수의 인자 type 으로 사용됩니다.
 */
export type GenTxtConfig = {
  output: string
}

export const genTxt = defineCommand<'gen:txt', GenTxtConfig>({
  /**
   * 플러그인의 이름을 정의합니다.
   *
   * - tokript {command} 로 실행됩니다.
   * - tok-cli.config 에서 옵션 정의시 해당 옵션의 key 값으로 사용됩니다.
   */
  name: 'gen:txt',
  /**
   * 플러그인의 설명을 정의합니다.
   *
   * - tokript help 실행시 표기됩니다.
   */
  description: '텍스트 파일을 생성합니다.',
  /**
   * 플러그인 실행시 사용할 config 의 기본값을 정의합니다.
   *
   * - 특정 옵션이 `--output` 과 같은 `cli option` 이나 `tok-cli.config.ts` 에 정의 되지 않았을 때 사용됩니다.
   */
  default: {
    output: path.resolve('generated', 'my.txt'),
  },
  /**
   * --output, -o 와 같은 cli option 을 정의합니다.
   *
   * - cli option 에 정의되지 않은 옵션은 오직 config 파일에서만 정의 가능합니다.
   * - cli option 은 원시값, 원시값 배열과 같은 간단한 값만 사용 가능합니다. ex) string, string[]
   * - tokript help {command} 시 정의한 alias, 설명, 기본값을 확인할 수 있습니다.
   */
  cliOptions: [
    {
      name: 'output',
      alias: 'o',
      description: '텍스트 파일 생성 경로',
      type: 'string',
    },
  ],
  /**
   * 플러그인 실행 함수를 정의합니다.
   *
   * - config: GenTxtConfig 타입의 config 객체가 인자로 넘어옵니다.
   * - config 객체는 default, cli option, tok-cli.config.ts 에 정의된 값들이 합쳐진 값입니다.
   * - config 우선순위는 cli option > tok-cli.config.ts > default 입니다.
   * - run 함수는 플러그인의 실제 동작을 정의합니다.
   */
  run: (config) => {
    fs.writeFileSync(config.output, 'hello world')
  },
})
```
