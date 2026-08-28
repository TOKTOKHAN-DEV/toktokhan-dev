# @toktokhan-dev/prettier-config

## 0.0.2

### Patch Changes

- [#106](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/pull/106) [`f9b1563`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/f9b1563dad38b224988aa513ecbc63fdc20faf4e) Thanks [@Eunkyung-Son](https://github.com/Eunkyung-Son)! - fix(prettier-config): 🐛 pnpm 10+ 엄격한 격리 환경에서 플러그인 resolve 실패 대응

  `base.js`의 `plugins`에 `'@trivago/prettier-plugin-sort-imports'`를 패키지 이름 문자열로 넘기던 것을 `require.resolve(...)`로 바꿔, 이 설정을 cosmiconfig로 auto-discover하는 쪽(이 패키지를 직접 의존하지 않는 소비 프로젝트)에서도 pnpm 10 이상의 엄격한 의존성 격리 환경에서 항상 resolve 되도록 수정했습니다.

  이 패키지를 npm 배포판(`^0.0.1`)으로 설치해 쓰는 `next-page-init`/`next-app-init` 템플릿 등에서, pnpm 10+ 사용 시 `prettier --write`/pre-commit 훅이 플러그인을 resolve하지 못해 실패하던 문제가 해결됩니다.

## 0.0.1

### Patch Changes

- e21960d: 똑똑한개발자 프론트엔드 모노레포에서 공통적으로 사용하는 prettier-config 모듈입니다.

## 0.0.1

### Patch Changes

- 29937f1: to public pakages

## 0.3.0

### Minor Changes

- 7baac8a: test version up

## 0.2.0

### Minor Changes

- ea08e81: update temp

## 0.1.0

### Minor Changes

- b75ab4c: update
