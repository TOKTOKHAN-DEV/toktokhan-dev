# @toktokhan-dev/cli-plugin-gen-img-rn

[@toktokhan-dev/cli](../../cli/README.md) 의 plugin 입니다.
특정 폴더의 경로를 이미지 객체로 만들어 생성해주는 플러그인 입니다. 자세한 내용은 [Tokdocs 공식 문서]()에서 확인 할 수 있습니다.

## Preview

```
@/assets/example
├── logo.png
├── detail
│   └── dog.png
├── landing
│   └── cat.jpg
└── main
    └── bird.png
```

위의 폴더 구조의 이미지는 아래의 객체로 변환됩니다.

```ts
export const MY_IMAGES = {
  EXAMPLE_BANNER: require('@/assets/example/banner.png'),
  EXAMPLE_DETAIL_DOG: require('@/assets/example/detail/dog.png'),
  EXAMPLE_LANDING_CAT: require('@/assets/example/landing/cat.jpg'),
  EXAMPLE_LOGO: require('@/assets/example/logo.png'),
  EXAMPLE_MAIN_BIRD: require('@/assets/example/main/bird.png'),
}
```

## Installation

```bash
npm i -D @toktokhan-dev/cli @toktokhan-dev/cli-plugin-gen-img-rn
```

## Register Plugin

`tok-cli.config.ts` 에서 config 정의가 가능합니다.<br/>
각 plugin 별로 option 을 정의하고, 해당 plugin 을 등록하여 사용할 수 있습니다.
자세한 내용은 [Tokdocs 공식 문서]()에서 확인 할 수 있습니다.

```ts
// tok-cli.config.ts
import { genImg } from '@toktokhan-dev/cli-plugin-gen-img-rn'

const config: RootConfig<{
  plugins: [typeof genImg]
}> = {
  plugins: [genImg],
  'gen:img': {
    input: 'public/images',
    output: 'src/generated/images.ts',
  },
}
```

## Run Script

`tokript2` 명령어로 각 플러그인으로 등록된 기능들을 사용할 수 있습니다.

```bash
npx tokript2 gen:img
```
