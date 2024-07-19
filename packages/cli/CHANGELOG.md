# @toktokhan-dev/cli

## 0.0.7

### Patch Changes

- Updated dependencies [af1668a]
- Updated dependencies [4f0b03f]
- Updated dependencies [9493f66]
  - @toktokhan-dev/universal@0.0.5
  - @toktokhan-dev/node@0.0.6

## 0.0.6

### Patch Changes

- Updated dependencies [d96ea33]
  - @toktokhan-dev/universal@0.0.4
  - @toktokhan-dev/node@0.0.5

## 0.0.5

### Patch Changes

- Updated dependencies [b895311]
  - @toktokhan-dev/node@0.0.4

## 0.0.4

### Patch Changes

- Updated dependencies [7ebbf37]
  - @toktokhan-dev/universal@0.0.3
  - @toktokhan-dev/node@0.0.3

## 0.0.3

### Patch Changes

- Updated dependencies [70acba8]
  - @toktokhan-dev/universal@0.0.2
  - @toktokhan-dev/node@0.0.2

## 0.0.2

### Patch Changes

- 515de8f: commit move to plugin

  기존 내장되어 있던 command 'commit' 이 plugin 으로 분리되었습니다.

  # Installation

  ```
  npm i -D @toktokhan-dev/cli-plugin-commit
  ```

  # Configuration

  ```typescript
  //tok-cli.config.ts
  import { RootConfig } from '@toktokhan-dev/cli'
  import { commit } from '@toktokhan-dev/cli-plugin-commit'

  const config: RootConfig<{ plugins: [typeof commit] }> = {
    plugins: [commit],
    basePath: process.cwd(),
  }

  export default config
  ```

## 0.0.1

### Patch Changes

- 7f14e85: 똑똑한 개발자의 플러그인을 사용할 수 있는 CLI TOOL입니다. gen:api, gen:theme, gen:route, gen:sitemap 등 다양한 플러그인을 지원하며, 사용자가 개발한 스크립트를 플러그인으로 등록할 수 있습니다.
- Updated dependencies [6c928f0]
- Updated dependencies [6f42208]
  - @toktokhan-dev/node@0.0.1
  - @toktokhan-dev/universal@0.0.1

## 1.4.4

### Patch Changes

- Updated dependencies [0f43837]
  - @toktokhan-dev/node@2.0.0

## 1.4.3

### Patch Changes

- Updated dependencies [bb60ca7]
  - @toktokhan-dev/universal@1.3.1
  - @toktokhan-dev/node@1.3.1

## 1.4.2

### Patch Changes

- 5b8176f: ignore sourcemap files

## 1.4.1

### Patch Changes

- 246b9a2: export file

## 1.4.0

### Minor Changes

- 7baac8a: test version up

### Patch Changes

- Updated dependencies [7baac8a]
  - @toktokhan-dev/node@1.3.0
  - @toktokhan-dev/universal@1.3.0

## 1.3.0

### Minor Changes

- 36d6b72: bin name tokript -> tokript2

## 1.2.0

### Minor Changes

- ea08e81: update temp

### Patch Changes

- Updated dependencies [ea08e81]
  - @toktokhan-dev/node@1.2.0
  - @toktokhan-dev/universal@1.2.0

## 1.1.0

### Minor Changes

- b75ab4c: update

### Patch Changes

- Updated dependencies [b75ab4c]
  - @toktokhan-dev/node@1.1.0

## 1.0.1

### Patch Changes

- Updated dependencies [c260db0]
  - @toktokhan-dev/node@1.0.1
