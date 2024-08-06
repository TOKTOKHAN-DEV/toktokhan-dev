---
'@toktokhan-dev/github': patch
'@toktokhan-dev/tokit': patch
---

각 메소드에서 `owner`와 `repo` 정보를 선택적으로 받을 수 있도록 수정하였습니다. 이 변경을 통해, 사용자는 메소드 호출 시 인스턴스의 `owner`와 `repo` 값을 참조하지 않고, 특정 상황에 맞게 메소드 인자로 주입할 수 있게 되었습니다. 우선순위는 다음과 같습니다:

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
