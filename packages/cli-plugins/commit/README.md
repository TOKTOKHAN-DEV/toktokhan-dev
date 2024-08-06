# @toktohan-dev/cli-plugin-commit

[@toktokhan-dev/cli](../cli/README.md) 의 plugin 입니다.
대화형 cli 를 통해 commit message 를 일관된 형식으로 작성할 수 있도록 도와주는 플러그인 입니다. 자세한 내용은 [Tokdocs 공식 문서]()에서 확인 할 수 있습니다.

## Preview

```
? Pick Commit Type …
🚀 deploy:     프로젝트 배포
🤖 chore:      자잘한 수정
📝 docs:       문서 관련
🎸 feat:       새로운 기능, 페이지 추가
🐛 fix:        버그 수정
👽 perf:       성능 개선
💡 refactor:   코드 리팩토링
💍 test:       테스트 관련
🎨 style:      스타일링 관련

✔ Pick Commit Type · feat
✔ Pick Change Scope(skip by: Enter) · CartPage
✔ What did you do? · add Component 'List'
✔ has BREAKING CHANGE for major update?(skip by: Enter) ·
? has detail?(skip by: Enter) › ...

```

## Installation

```
npm i -D @toktokhan-dev/cli @toktokhan-dev/cli-plugin-commit
```

## Run Script

`tokript2` 명령어로 각 플러그인으로 등록된 기능들을 사용할 수 있습니다.

```
npx tokript2
```

command 를 입력하면 해당 스크립트가 바로 실행됩니다.

<CodeBlock language="bash">{`npx tokript commit`}</CodeBlock>

<TipPackageScript cmd="commit" run="tokript commit" />

## Configuration

`tok-cli.config.ts` 에서 config 정의가 가능합니다.<br/>
각 plugin 별로 option 을 정의하고, 해당 plugin 을 등록하여 사용할 수 있습니다.

```ts
// npm 에 등록된 플러그인을 사용할 경우
import { genTheme } from '@toktokhan-dev/cli-plugin-gen-theme-chakra'

// 로컬에 정의한 플러그인을 사용할 경우
import { print } from './plugin/print'

const config: RootConfig<{
  plugins: [typeof print, typeof genTheme] // option 타입 정의
}> = {
  // 플러그인 등록
  plugins: [print, genTheme],
  // 각 pulgin option 설정
  print: {
    text: 'config text',
  },
  'gen:theme': {
    input: 'public/token.json',
    output: 'src/generated/theme',
    tokenMode: {
      light: 'mode_1', // tokenMode 키 값 변경이 필요할 경우 추가해주세요.
    },
  },
}

export default config
```

## Run Plugin

`config` 에 따로 설정값이 존재 하지 않고 아무런 `argument` 를 넘기지 않을 경우 플러그인 내부적으로 정의된 `default` 값으로 실행됩니다.

<CodeBlock language="bash">{`tokript print\n\n//output: default text`}</CodeBlock>

`config` 에 따로 설정값이 존재 하고 아무런 `argument` 를 넘기지 않을 경우 `config` 값으로 실행됩니다.

<CodeBlock language="bash">{`tokript print\n\n//output: config text`}</CodeBlock>

`argument` 를 넘길 경우 `argument` 값으로 실행됩니다.

<CodeBlock language="bash">{`tokript print --text 'hello world'\n\n//output: hello world`}</CodeBlock>

`alias` 가 등록 되어있는 경우, `alias` 로도 실행이 가능합니다.

<CodeBlock language="bash">{`tokript print -t 'hello world'`}</CodeBlock>

모든 command 는 `help` 커멘드를 통해 `description`, `options`, `default`, `alias` 에 대한 정보를 확인 할 수 있습니다.

<CodeBlock language="bash">{`tokript help print`}</CodeBlock>

## Create Plugin

plugin 을 `defineCommand` api 를 사용하여 쉽게 정의할 수 있습니다.

```ts title="plugin/print.ts"
import { defineCommand } from '@toktokhan-dev/cli'

export interface PrintConfig {
  text: string
}

export const print = defineCommand<'print', GenImageConfig>({
  name: 'print',
  description: 'print text',
  cliOptions: [
    {
      name: 'text',
      alias: 't',
      type: 'string',
      description: 'text to print',
    },
  ],
  default: {
    text: 'default text',
  },
  run: (config) => {
    console.log(config.text)
  },
})
```

:::info
`defineCommand` api 에 대한 정보는 [`defineCommand` Api 문서](/docs/cli.definecommand)를 참고해주세요.<br/>
더 자세한 plugin 제작에 관련한 정보는 [Plugin Development](https://toktokhan-dev.github.io/cli/)를 참고해주세요.
:::

## Welcome To Tokript

@toktokhan-dev 패키지에는 gen:img, gen:route, gen:api 와 같은 이미 정의되어 있는 다양한 플러그인이 있습니다.

플러그인을 사용하여 프로젝트를 더욱 효율적으로 관리해보세요.

프로젝트내에서 사용했던 유용한 스크립트를, 간단한 설정으로 config, cli option, help 커멘드와 함께 다른 사람들에게 제공해보세요
