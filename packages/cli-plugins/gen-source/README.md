# @toktokhan-dev/cli-plugin-gen-img

[@toktokhan-dev/cli](../../cli/README.md) 의 plugin 입니다.
특정 폴더의 경로를 이미지 객체로 만들어 생성해주는 플러그인 입니다. 자세한 내용은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-img)에서 확인 할 수 있습니다.

## Preview

```
public/example
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
  EXAMPLE_BANNER: { src: 'example/banner.png', alt: 'banner' },
  EXAMPLE_DETAIL_DOG: { src: 'example/detail/dog.png', alt: 'dog' },
  EXAMPLE_LANDING_CAT: { src: 'example/landing/cat.jpg', alt: 'cat' },
  EXAMPLE_LOGO: { src: 'example/logo.png', alt: 'logo' },
  EXAMPLE_MAIN_BIRD: { src: 'example/main/bird.png', alt: 'bird' },
}
```

## Installation

```bash
npm i -D @toktokhan-dev/cli @toktokhan-dev/cli-plugin-gen-img
```

## Register Plugin

`tok-cli.config.ts` 에서 config 정의가 가능합니다.<br/>
각 plugin 별로 option 을 정의하고, 해당 plugin 을 등록하여 사용할 수 있습니다.
자세한 내용은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-img)에서 확인 할 수 있습니다.

```ts
// tok-cli.config.ts
import { genImg } from '@toktokhan-dev/cli-plugin-gen-img'

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
