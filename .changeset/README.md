# Changesets

## 배포 및 버전 관리

[github action](.github/workflows/release.yml) 과 [chageset](https://github.com/changesets/changesets) 을 사용하여 베포하고, 버전을 관리합니다.

1. 변경사항 커밋전에, `pnpm changset` 명령어로 changeset 을 실행 시킵니다.
2. 변경사항이 있는 패키지를 선택합니다.
3. 변경사항에 대한 패치 범위를 선택합니다.
   패치 범위는 다음과 같습니다.
   - `patch` : 최신 버전에 대한 버그 수정 (ex: 1.0.0 -> 1.0.1)
   - `minor` : 최신 버전에 대한 기능 추가 (ex: 1.0.0 -> 1.1.0)
   - `major` : 최신 버전에 대한 주요 변경 (ex: 1.0.0 -> 2.0.0)
4. 간단한 변경사항을 작성합니다.
5. cli 가 마무리 되면 .changset 폴더에 markdown 파일이 생성됩니다.
6. 필요에 의해 추가적인 설명을 작성합니다.
7. 생성된 markdown 파일과 함께 변경사항을 commit 합니다.
8. main branch 에 push 하게 되면, github action 으로 인해, 패키지 별 CHANGELOG 가 생성되고 버전이 올라가는 PR 이 생성 됩니다.
9. 해당 PR 을 머지하게 되면, 다시 github action 을 통해, 버전이 올라가고, 패키지가 배포됩니다.
10. 배포가 완료되면 [script/slack.ts](../scripts/slack.ts) 스크립트를 통해 똑똑한 개발자 프론트 채널로 메시지가 전송됩니다.

자세한 내용은 [chageset](https://github.com/changesets/changesets) 을 확인해보세요
