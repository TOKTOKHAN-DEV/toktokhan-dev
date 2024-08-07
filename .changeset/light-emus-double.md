---
'@toktokhan-dev/github': patch
---

- `publishFilesToNewRepo`와 `updateExistRepo` 메소드의 공통 로직을 `createNewCommit` 메서드로 분리하였습니다. 이로 인해 각 메서드의 파라미터가 통일되었습니다.
- 메서드의 첫 스코프에서 소유자 접근 권한을 확인하여 유효하지 않은 토큰일 경우 에러를 던지도록 수정되었습니다.
- `removeCollaborator` 메서드의 API 호출이 `addCollaborator` API로 되어있던 문제를 수정하였습니다.
