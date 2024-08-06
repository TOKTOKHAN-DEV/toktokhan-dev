# @toktokhan-dev/cli-plugin-gen-icon-rn

[@toktokhan-dev/cli](../../cli/README.md) 의 plugin 입니다.
특정 폴더에 있는 svg icon 을 기반으로 named icon component 를 생성해주는 플러그인 입니다. 자세한 내용은 [Tokdocs 공식 문서]()에서 확인 할 수 있습니다.

## Preview

```
@/assets
├── arrow.svg
├── landing
│   └── arrow.svg
```

위의 폴더 구조의 svg 아이콘들은 아래의 named icon component 로 변환됩니다.

```ts
export { default as ArrowIcon } from '@/assets/arrow.svg'
export { default as LandingArrowIcon } from '@/assets/landing/arrow.svg'
```

## Installation

```bash
npm i -D @toktokhan-dev/cli @toktokhan-dev/cli-plugin-gen-icon-rn
```

## Register Plugin

`tok-cli.config.ts` 에서 config 정의가 가능합니다.<br/>
각 plugin 별로 option 을 정의하고, 해당 plugin 을 등록하여 사용할 수 있습니다.
자세한 내용은 [Tokdocs 공식 문서]()에서 확인 할 수 있습니다.

```ts
// tok-cli.config.ts
import { genIcon } from '@toktokhan-dev/cli-plugin-gen-icon-rn'

const config: RootConfig<{
  plugins: [typeof genIcon]
}> = {
  plugins: [genIcon],
  'gen:icon': {
    input: 'src/assets/icons',
    output: 'src/generated/Icon.ts',
  },
}
```

## Run Script

`tokript2` 명령어로 각 플러그인으로 등록된 기능들을 사용할 수 있습니다.

```bash
npx tokript2 gen:icon
```
