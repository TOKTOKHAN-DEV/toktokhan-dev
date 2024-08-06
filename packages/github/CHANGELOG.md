# @toktokhan-dev/universal

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
