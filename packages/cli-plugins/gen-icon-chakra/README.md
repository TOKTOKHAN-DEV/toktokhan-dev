# @toktokhan-dev/cli-plugin-gen-icon-chakra

[@toktokhan-dev/cli](../../cli/README.md) 의 plugin 입니다.
특정 폴더에 있는 svg icon 을 기반으로 chakra icon component 를 생성해주는 플러그인 입니다. 자세한 내용은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-icon-chakra)에서 확인 할 수 있습니다.

## Preview

```
public/example
├── arrow.svg
├── landing
│   └── arrow.svg
```

위의 폴더 구조의 svg 아이콘들은 아래의 chakra icon component 로 변환됩니다.

```tsx
import { Icon, IconProps } from '@chakra-ui/react'

export const ArrowIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.966 10.8H6.93L12.381 5.34899C12.4939 5.23789 12.5837 5.10554 12.6452 4.95956C12.7068 4.81358 12.7388 4.65687 12.7394 4.49847C12.74 4.34006 12.7093 4.18309 12.649 4.03662C12.5887 3.89014 12.5 3.75706 12.3879 3.64505C12.2759 3.53304 12.1428 3.44431 11.9964 3.38399C11.8499 3.32367 11.6929 3.29294 11.5345 3.29359C11.3761 3.29423 11.2194 3.32624 11.0734 3.38775C10.9275 3.44926 10.7951 3.53907 10.684 3.65199L3.184 11.152C3.181 11.154 3.18 11.158 3.177 11.161C3.01249 11.3289 2.9009 11.5414 2.8561 11.7722C2.8113 12.0029 2.83526 12.2417 2.925 12.459C2.985 12.602 3.07 12.729 3.177 12.839L3.184 12.849L10.684 20.349C10.919 20.583 11.226 20.699 11.532 20.699C11.7693 20.699 12.0012 20.6286 12.1985 20.4968C12.3958 20.365 12.5496 20.1777 12.6405 19.9585C12.7313 19.7393 12.7552 19.4981 12.709 19.2654C12.6628 19.0327 12.5487 18.8189 12.381 18.651L6.931 13.2H20.967C21.2853 13.2 21.5905 13.0736 21.8155 12.8485C22.0406 12.6235 22.167 12.3182 22.167 12C22.167 11.6817 22.0406 11.3765 21.8155 11.1515C21.5905 10.9264 21.2853 10.8 20.967 10.8"
      fill="currentColor"
    />
  </Icon>
)

export const LandingArrowIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.966 10.8H6.93L12.381 5.34899C12.4939 5.23789 12.5837 5.10554 12.6452 4.95956C12.7068 4.81358 12.7388 4.65687 12.7394 4.49847C12.74 4.34006 12.7093 4.18309 12.649 4.03662C12.5887 3.89014 12.5 3.75706 12.3879 3.64505C12.2759 3.53304 12.1428 3.44431 11.9964 3.38399C11.8499 3.32367 11.6929 3.29294 11.5345 3.29359C11.3761 3.29423 11.2194 3.32624 11.0734 3.38775C10.9275 3.44926 10.7951 3.53907 10.684 3.65199L3.184 11.152C3.181 11.154 3.18 11.158 3.177 11.161C3.01249 11.3289 2.9009 11.5414 2.8561 11.7722C2.8113 12.0029 2.83526 12.2417 2.925 12.459C2.985 12.602 3.07 12.729 3.177 12.839L3.184 12.849L10.684 20.349C10.919 20.583 11.226 20.699 11.532 20.699C11.7693 20.699 12.0012 20.6286 12.1985 20.4968C12.3958 20.365 12.5496 20.1777 12.6405 19.9585C12.7313 19.7393 12.7552 19.4981 12.709 19.2654C12.6628 19.0327 12.5487 18.8189 12.381 18.651L6.931 13.2H20.967C21.2853 13.2 21.5905 13.0736 21.8155 12.8485C22.0406 12.6235 22.167 12.3182 22.167 12C22.167 11.6817 22.0406 11.3765 21.8155 11.1515C21.5905 10.9264 21.2853 10.8 20.967 10.8"
      fill="currentColor"
    />
  </Icon>
)
```

## Installation

```bash
npm i -D @toktokhan-dev/cli @toktokhan-dev/cli-plugin-gen-icon-chakra
```

## Register Plugin

`tok-cli.config.ts` 에서 config 정의가 가능합니다.<br/>
각 plugin 별로 option 을 정의하고, 해당 plugin 을 등록하여 사용할 수 있습니다.
자세한 내용은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-icon-chakra)에서 확인 할 수 있습니다.

```ts
// tok-cli.config.ts
import { genIcon } from '@toktokhan-dev/cli-plugin-gen-icon-chakra'

const config: RootConfig<{
  plugins: [typeof genIcon]
}> = {
  plugins: [genIcon],
  'gen:icon': {
    input: 'public/icons',
    output: 'src/generated/Icon.ts',
  },
}
```

## Run Script

`tokript2` 명령어로 각 플러그인으로 등록된 기능들을 사용할 수 있습니다.

```bash
npx tokript2 gen:icon
```
