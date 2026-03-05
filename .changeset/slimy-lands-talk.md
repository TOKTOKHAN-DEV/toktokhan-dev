---
'@toktokhan-dev/cli-plugin-gen-api-react-query': minor
---

### 새 기능

- `splitDataContracts` 옵션 추가 — data-contracts.ts를 모듈별 타입 파일로 분할하여 AI 컨텍스트 오버헤드 감소
  - 각 모듈 폴더에 `<module>.contracts.ts` 생성
  - 공유 타입은 `@types/common-contracts.ts`에 생성
  - 타입 분류 유틸리티 (`type-classifier`, `type-route-mapper`, `type-dependency-graph`) 추가

### 버그 수정

- `writeSwaggerApiFile`의 `forEach(async ...)` → `for...of` + `await`로 파일 쓰기 순서 보장
- `mergeTypeScriptContent`에서 동일 이름 타입이 업데이트되지 않던 문제 수정
  - **동작 변경**: 기존에는 이미 존재하는 타입을 건너뛰었으나, 이제는 swagger 스키마(새 파일)가 source of truth로 기존 타입을 덮어씁니다. 기존에만 있는 타입은 보존됩니다.
- indicator 기반 파일 분할의 안정성 개선 (`indexOf` 기반, 에러 핸들링 추가)

### 테스트 & CI

- 52개 유닛 테스트 추가 (type-classifier 21개 + write-swagger 31개)
- PR 시 자동 테스트 실행을 위한 GitHub Actions workflow 추가
