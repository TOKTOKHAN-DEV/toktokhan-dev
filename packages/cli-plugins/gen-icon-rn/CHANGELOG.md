# @toktokhan-dev/cli-plugin-gen-icon-rn

## 0.0.6

### Patch Changes

- Updated dependencies [ce6c6eb]
  - @toktokhan-dev/node@0.0.10
  - @toktokhan-dev/cli@0.0.11

## 0.0.5

### Patch Changes

- 94e2b25: add LICENSE, README, improve package.json

  각 패키지별 LICENSE 와 README 파일을 추가하고, Package.json 을 개선했습니다.

- Updated dependencies [98ee403]
- Updated dependencies [94e2b25]
  - @toktokhan-dev/cli@0.0.10
  - @toktokhan-dev/universal@0.0.8
  - @toktokhan-dev/node@0.0.9

## 0.0.4

### Patch Changes

- Updated dependencies [f414a7f]
  - @toktokhan-dev/universal@0.0.7
  - @toktokhan-dev/cli@0.0.9
  - @toktokhan-dev/node@0.0.8

## 0.0.3

### Patch Changes

- Updated dependencies [aa2b844]
  - @toktokhan-dev/universal@0.0.6
  - @toktokhan-dev/cli@0.0.8
  - @toktokhan-dev/node@0.0.7

## 0.0.2

### Patch Changes

- Updated dependencies [af1668a]
- Updated dependencies [4f0b03f]
- Updated dependencies [9493f66]
  - @toktokhan-dev/universal@0.0.5
  - @toktokhan-dev/cli@0.0.7
  - @toktokhan-dev/node@0.0.6

## 0.0.1

### Patch Changes

- df781bd: new package

  react native 에서 사용하기 위한 rn 용 gen-icon 플러그인 입니다.
  gen-icon-chakra 플러그인과 옵션은 모두 동일합니다.

  ### 생성 예시

  ```ts
  export { default as GithubIcon } from '@/assets/github.svg'
  export { default as PlusIcon } from '@/assets/plus.svg'
  export { default as NestedPlusIcon } from '@/assets/nested/plus.svg'
  export { default as TestArrowRightIcon } from '@/assets/test/ArrowRight.svg'
  ```
