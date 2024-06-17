# @toktokhan-dev/cli-plugin-commit

## 0.0.3

### Patch Changes

- Updated dependencies [7ebbf37]
  - @toktokhan-dev/universal@0.0.3
  - @toktokhan-dev/cli@0.0.4
  - @toktokhan-dev/node@0.0.3

## 0.0.2

### Patch Changes

- Updated dependencies [70acba8]
  - @toktokhan-dev/universal@0.0.2
  - @toktokhan-dev/cli@0.0.3
  - @toktokhan-dev/node@0.0.2

## 0.0.1

### Patch Changes

- 9a72655: first release

  tokript 의 내장되어 있던 기능인 commit command 가 plugin 으로 분리 되었습니다.

  분리되면서 몇가지 변경점이 있습니다.

  ### scope 지정 방식

  ```
  type(scope):message
  ```

  의 scope 에 해당하던 부분이 `file search 방식`에서 `input 방식` 으로 변경되었습니다. 파일갯수가 많은 프로젝트에서의 성능이슈와 스코프 설정이 자유롭지 않음에서 오는 불편함이 해소될것으로 기대합니다.

  ### changeset 대응

  changeset 을 프로젝트 내에서 사용하게 될시, changeset 에서 작성한 내용을 commit 에서 그대로 작성하는 불편함이 생길 수 있습니다.

  commit 과정에서 staging 된 파일 중 .changset 폴더의 md 파일이 존재한다면 첫번째로 검색되는 파일을 기반으로 메시지 로그를 추천해줍니다.

  changeset 의 summary 는 git commit 의 제목으로, 하단에 작성된 상세 내용은 commit 의 detail 으로 들어갑니다.

  ### commit type 개선

  - commit type 의 정렬을 개선했습니다.
  - commit type 에 style type 을 추가했습니다.
  - commit type 을 커스텀 할 수 있습니다.

  ```typescript
  import { RootConfig } from '@toktokhan-dev/cli'
  import { commit } from '@toktokhan-dev/cli-plugin-commit'

  const config: RootConfig<{ plugins: [typeof commit] }> = {
    plugins: [commit],
    basePath: process.cwd(),
    commit: {
      types: [
        {
          name: 'feat',
          description: 'A new feature',
        },
      ],
      // or
      types: (prev) =>
        prev.concat([
          {
            name: 'feat',
            description: 'A new feature',
          },
        ]),
    },
  }

  export default config
  ```

- Updated dependencies [515de8f]
  - @toktokhan-dev/cli@0.0.2
