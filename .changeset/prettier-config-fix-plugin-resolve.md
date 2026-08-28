---
"@toktokhan-dev/prettier-config": patch
---

fix(prettier-config): 🐛 pnpm 10+ 엄격한 격리 환경에서 플러그인 resolve 실패 대응

`base.js`의 `plugins`에 `'@trivago/prettier-plugin-sort-imports'`를 패키지 이름 문자열로 넘기던 것을 `require.resolve(...)`로 바꿔, 이 설정을 cosmiconfig로 auto-discover하는 쪽(이 패키지를 직접 의존하지 않는 소비 프로젝트)에서도 pnpm 10 이상의 엄격한 의존성 격리 환경에서 항상 resolve 되도록 수정했습니다.

이 패키지를 npm 배포판(`^0.0.1`)으로 설치해 쓰는 `next-page-init`/`next-app-init` 템플릿 등에서, pnpm 10+ 사용 시 `prettier --write`/pre-commit 훅이 플러그인을 resolve하지 못해 실패하던 문제가 해결됩니다.
