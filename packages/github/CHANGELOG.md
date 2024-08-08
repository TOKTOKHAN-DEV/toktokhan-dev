# @toktokhan-dev/universal

## 0.0.11

### Patch Changes

- 98ee403: add LICENSE, README, improve package.json

  각 패키지별 LICENSE 와 README 파일을 추가하고, Package.json 을 개선했습니다.

- 6226ed6: - `publishFilesToNewRepo`와 `updateExistRepo` 메소드의 공통 로직을 `createNewCommit` 메서드로 분리하였습니다. 이로 인해 각 메서드의 파라미터가 통일되었습니다.
  - 메서드의 첫 스코프에서 소유자 접근 권한을 확인하여 유효하지 않은 토큰일 경우 에러를 던지도록 수정되었습니다.
  - `removeCollaborator` 메서드의 API 호출이 `addCollaborator` API로 되어있던 문제를 수정하였습니다.
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

- Updated dependencies [94e2b25]
  - @toktokhan-dev/universal@0.0.8
  - @toktokhan-dev/node@0.0.9

## 0.0.10

### Patch Changes

- 6fbb7a7: # createRepo 메소드에 isPublic 파라미터 추가

  GitHubManager 클래스의 createRepo 메소드가 선택적인 isPublic 파라미터를 받습니다. isPublic이 true인 경우 생성된 저장소는 공개됩니다. 그렇지 않으면 비공개로 설정됩니다.

## 0.0.9

### Patch Changes

- 3bd1aa2: - GitHub의 updateExistRepo 메서드에서 앱 인증 로직을 제거했습니다. 해당 API는 JWT로만 인증할 수 있으며, 세분화된 개인 액세스 토큰(fine-grained personal access token)으로는 인증이 되지 않습니다. 인증 과정은 getUser 메서드로 대체했습니다.

  - checkTokenValidity => checkAppAuthWithJWT 메서드 명 변경

- Updated dependencies [f414a7f]
  - @toktokhan-dev/universal@0.0.7
  - @toktokhan-dev/node@0.0.8

## 0.0.8

### Patch Changes

- Updated dependencies [aa2b844]
  - @toktokhan-dev/universal@0.0.6
  - @toktokhan-dev/node@0.0.7

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

- 5eabdd9: # 릴리즈 노트

  ## 변경 사항

  `tokit`을 통한저장소 생성 로직이 개선되었습니다. 기존에는 조직에 한해서만 원격 저장소 생성 및 연결 기능을 사용할 수 있었지만, 이제 저장소를 생성할 때, 소유자(owner)정보를 통해 조직인지 개인 사용자인지를 확인합니다. 이에 따라 적절한 API 호출이 이루어져, 조직 또는 개인 사용자에게 적합한 방식으로 저장소가 생성됩니다.

## 0.0.3

### Patch Changes

- Updated dependencies [7ebbf37]
  - @toktokhan-dev/universal@0.0.3
  - @toktokhan-dev/node@0.0.3

## 0.0.2

### Patch Changes

- Updated dependencies [70acba8]
  - @toktokhan-dev/universal@0.0.2
  - @toktokhan-dev/node@0.0.2

## 0.0.1

### Patch Changes

- b2b2e4c: Octokit을 사용하여 Github Api를 쉽게 사용할 수 있도록 하는 모듈입니다. 레포지토리 생성, 컨텐츠 업로드 등의 메서드가 있습니다.

  [Docs:Github](https://toktokhan-dev-docs.vercel.app/docs/github)

- Updated dependencies [6c928f0]
- Updated dependencies [6f42208]
  - @toktokhan-dev/node@0.0.1
  - @toktokhan-dev/universal@0.0.1

## 1.0.1

### Patch Changes

- Updated dependencies [0f43837]
  - @toktokhan-dev/node@2.0.0

## 1.0.0

### Major Changes

- f8d2b7e: update tokit, publish github

## 1.3.1

### Patch Changes

- bb60ca7: ignore sourcemap file

## 1.3.0

### Minor Changes

- 7baac8a: test version up

## 1.2.0

### Minor Changes

- ea08e81: update temp

## 1.1.0

### Minor Changes

- b75ab4c: update

## 1.0.2

### Patch Changes

- c260db0: update

## 1.0.1

### Patch Changes

- 1636561: creation react packages
