---
'@toktokhan-dev/tokit': patch
---

- Window 운영체제 대응 업데이트

  - **Child Process Spawn 수정**: Windows 환경에서 childProcess의 `spawn` 사용 시, `shell: true` 설정을 통해 명령어가 제대로 실행되도록 개선했습니다.
  - **`rm -rf` 명령어 대체**: Windows 환경에서는 `rm -rf`가 지원되지 않으므로, `git clean -fdx`로 대체하여 모든 파일과 디렉토리를 삭제하도록 수정했습니다.
