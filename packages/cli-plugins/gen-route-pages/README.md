# @toktokhan-dev/cli-plugin-gen-route-pages

[@toktokhan-dev/cli](../../cli/README.md) 의 plugin 입니다.
nextjs 프로젝트의 pages 폴더의 경로를 기반으로 route 객체를 생성해주는 플러그인 입니다. 자세한 내용은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-route-next-page)에서 확인 할 수 있습니다.

## Preview

```
pages
├── index.tsx
├── auth
│   └── index.tsx
├── login
│   └── index.tsx
└── social
    └── callback.tsx
```

위의 폴더 구조의 이미지는 아래의 객체로 변환됩니다.

```ts
export const ROUTES = {
  AUTH_MAIN: '/auth',
  MAIN: '/',
  LOGIN_MAIN: '/login',
  SOCIAL_CALLBACK: '/social/callback',
}
```

## Installation

```bash
npm i -D @toktokhan-dev/cli @toktokhan-dev/cli-plugin-gen-route-pages
```

## Register Plugin

`tok-cli.config.ts` 에서 config 정의가 가능합니다.<br/>
각 plugin 별로 option 을 정의하고, 해당 plugin 을 등록하여 사용할 수 있습니다.
자세한 내용은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-route-next-page)에서 확인 할 수 있습니다.

```ts
// tok-cli.config.ts
import { genRoute } from '@toktokhan-dev/cli-plugin-gen-route-pages'

const config: RootConfig<{
  plugins: [typeof genRoute]
}> = {
  plugins: [genRoute],
  'gen:route': {
    output: 'src/generated/routes.ts',
  },
}
```

## Run Script

`tokript2` 명령어로 각 플러그인으로 등록된 기능들을 사용할 수 있습니다.

```bash
npx tokript2 gen:route
```
