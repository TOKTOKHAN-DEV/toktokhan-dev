# @toktokhan-dev/tokit

## 0.0.14

### Patch Changes

- bde73ba: template 다운받을 때 ./scripts 경로 삭제해줍니다.

## 0.0.13

### Patch Changes

- 98ee403: add LICENSE, README, improve package.json

  각 패키지별 LICENSE 와 README 파일을 추가하고, Package.json 을 개선했습니다.

- 992d1fb: - infolog 수정 (collaborator 추가후 로그 출력)
  - 불필요한 로그 삭제
  - Package.json 개선
- f5b67bc: 각 메소드에서 `owner`와 `repo` 정보를 선택적으로 받을 수 있도록 수정하였습니다. 이 변경을 통해, 사용자는 메소드 호출 시 인스턴스의 `owner`와 `repo` 값을 참조하지 않고, 특정 상황에 맞게 메소드 인자로 주입할 수 있게 되었습니다. 우선순위는 다음과 같습니다:

  1. 메소드 인자, 2. 인스턴스 값.

  예를 들어, 아래의 경우 addCollaborator 메소드에서는 메소드 인자로 주입한 `owner`와 `repo` 값을 사용합니다.

  ```ts
  const github = new GitHubManager({
    token: '<your-token>',
    owner: '<your-owner>',
    repo: '<your-repo>',
  })

  await github.addCollaborator({
    username: '<your-username>',
    owner: '<your-other-owner>',
    repo: '<your-other-repo>',
  })
  ```

  이를 통해, 메소드 호출 시 인스턴스 값에 의존하지 않고, 상황에 따라 `owner`와 `repo` 값을 유연하게 지정할 수 있게 되었습니다.

- Updated dependencies [98ee403]
- Updated dependencies [6226ed6]
- Updated dependencies [94e2b25]
- Updated dependencies [f5b67bc]
  - @toktokhan-dev/github@0.0.11
  - @toktokhan-dev/universal@0.0.8
  - @toktokhan-dev/node@0.0.9

## 0.0.12

### Patch Changes

- Updated dependencies [6fbb7a7]
  - @toktokhan-dev/github@0.0.10

## 0.0.11

### Patch Changes

- Updated dependencies [3bd1aa2]
- Updated dependencies [f414a7f]
  - @toktokhan-dev/github@0.0.9
  - @toktokhan-dev/universal@0.0.7
  - @toktokhan-dev/node@0.0.8

## 0.0.10

### Patch Changes

- 8703d69: consider package manager, remove un-using files

  - 선택한 package manager 에 따라, npm scripts, husky 등이 수정된 상태로 clone 되도록 수정되었습니다.
  - 프로젝트에선 쓰이지 않는 .changeset, .github 과 같은 파일을 제거하고, @changeset/cli 도 devDependencies 에서 제거된 상태로 clone 되도록 수정되었습니다.

- 02833b3: # '@toktokhan-dev/tokit'

  github api를 조회할 때 토큰이 주입되지 않아 개인화되지 않은 요청을 하고 있었습니다. 개인화 되지 않은 요청은 1시간 60번 제한이 있습니다.
  [GitHub REST API의 요청 제한에 대한 자세한 정보는 여기에서 확인할 수 있습니다.](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28)

  # '@toktokhan-dev/react-web':

  react-query 패키지가 불필요하게 설치되는 이유로 삭제했습니다.

## 0.0.9

### Patch Changes

- Updated dependencies [aa2b844]
  - @toktokhan-dev/universal@0.0.6
  - @toktokhan-dev/github@0.0.8
  - @toktokhan-dev/node@0.0.7

## 0.0.8

### Patch Changes

- af1668a: awaitted 함수명 오타 변경 => awaited
- Updated dependencies [af1668a]
- Updated dependencies [4f0b03f]
- Updated dependencies [9493f66]
  - @toktokhan-dev/universal@0.0.5
  - @toktokhan-dev/github@0.0.7
  - @toktokhan-dev/node@0.0.6

## 0.0.7

### Patch Changes

- 7612466: remove unlink pnpm lock file

## 0.0.6

### Patch Changes

- Updated dependencies [d96ea33]
  - @toktokhan-dev/universal@0.0.4
  - @toktokhan-dev/github@0.0.6
  - @toktokhan-dev/node@0.0.5

## 0.0.5

### Patch Changes

- Updated dependencies [b895311]
  - @toktokhan-dev/node@0.0.4
  - @toktokhan-dev/github@0.0.5

## 0.0.4

### Patch Changes

- 5eabdd9: # 릴리즈 노트

  ## 변경 사항

  `tokit`을 통한저장소 생성 로직이 개선되었습니다. 기존에는 조직에 한해서만 원격 저장소 생성 및 연결 기능을 사용할 수 있었지만, 이제 저장소를 생성할 때, 소유자(owner)정보를 통해 조직인지 개인 사용자인지를 확인합니다. 이에 따라 적절한 API 호출이 이루어져, 조직 또는 개인 사용자에게 적합한 방식으로 저장소가 생성됩니다.

- Updated dependencies [5eabdd9]
  - @toktokhan-dev/github@0.0.4

## 0.0.3

### Patch Changes

- Updated dependencies [7ebbf37]
  - @toktokhan-dev/universal@0.0.3
  - @toktokhan-dev/github@0.0.3
  - @toktokhan-dev/node@0.0.3

## 0.0.2

### Patch Changes

- 713655d: version up of universal package
- Updated dependencies [70acba8]
  - @toktokhan-dev/universal@0.0.2
  - @toktokhan-dev/github@0.0.2
  - @toktokhan-dev/node@0.0.2

## 0.0.1

### Patch Changes

- 75e8cc7: Tokit 은 똑똑한개발자에서 관리하는 프론트엔드 보일러 템플릿을 관리하고, 로컬 환경에 설치 하기 위한 CLI tool 입니다.
  create-react-app 처럼 커멘드라인 한줄로 쉽게 설치가 가능하며 원격 저장소에 생성하고, 연동 시킬 수 있는 옵션이 있습니다.
- Updated dependencies [6c928f0]
- Updated dependencies [b2b2e4c]
- Updated dependencies [6f42208]
  - @toktokhan-dev/node@0.0.1
  - @toktokhan-dev/github@0.0.1
  - @toktokhan-dev/universal@0.0.1

## 1.0.3

### Patch Changes

- b642631: git init

## 1.0.2

### Patch Changes

- Updated dependencies [0f43837]
  - @toktokhan-dev/node@2.0.0
  - @toktokhan-dev/github@1.0.1

## 1.0.1

### Patch Changes

- f99b491: fix bug

## 1.0.0

### Major Changes

- f8d2b7e: update tokit, publish github

### Patch Changes

- Updated dependencies [f8d2b7e]
  - @toktokhan-dev/github@1.0.0
