---
'@toktokhan-dev/tokit': patch
---

fix(tokit): 🐛 원격 레포 생성 시 package.json 과 동기화되지 않은 lock 파일이 push 되어 Vercel 빌드가 실패하던 문제 수정

- `cacheToLocal`에서 `package.json`의 `@changesets/cli`, `@changesets/changelog-github`를 제거한 뒤, 템플릿 원본 `pnpm-lock.yaml`이 그대로 첫 커밋에 포함되어 push 되고 있었습니다. 이 때문에 "원격 레포 생성: Yes"로 만든 프로젝트를 그대로 배포하면 CI(Vercel 등)의 `frozen-lockfile` 설치가 `ERR_PNPM_OUTDATED_LOCKFILE`로 실패했습니다.
- 패키지 설치를 원격 레포 생성·push 보다 먼저 실행하도록 순서를 바꿔, 갱신된 lock 파일이 첫 커밋에 포함되도록 했습니다.
- 기존 설치는 `spawn`을 기다리지 않는 fire-and-forget 방식이었으므로, 설치 프로세스가 종료될 때까지 기다리도록 변경했습니다. 설치가 실패하면 원격 레포를 만들거나 push 하지 않고 종료합니다.
