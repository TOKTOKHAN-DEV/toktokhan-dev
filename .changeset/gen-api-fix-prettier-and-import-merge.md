---
"@toktokhan-dev/cli-plugin-gen-api-react-query": patch
---

fix(gen-api-react-query): 🐛 pnpm 10+ 엄격한 격리 환경에서 `prettier-plugin-organize-imports` resolve 실패 및 재실행 시 import 중복으로 인한 파일 손상 수정

- `index.ts`의 `gen:api` 최종 Prettier 포맷 패스(`withLoading('Prettier format', ...)`)에서 `prettier-plugin-organize-imports`를 패키지 이름 문자열로 넘기던 것을 `require.resolve()`로 바꿔, pnpm 10 이상의 엄격한 의존성 격리 환경에서도 항상 resolve 되도록 수정했습니다. 이 실패는 크래시로 드러나지 않고 인접한 `catch {}`에 조용히 삼켜져 import 정리가 그냥 스킵되던 형태로도 나타났습니다.
- `mergeTypeScriptContent`의 import 병합 로직이 quote(`'`/`"`)·세미콜론 스타일 차이만 있는 동일 import를 별개로 취급해 재실행마다 중복이 누적되고, 결국 `Identifier has already been declared` 문법 에러로 생성 파일이 영구히 손상되던 문제를 수정했습니다. 이제 정규화된 키로 비교해 동일 import는 하나로 병합됩니다(새 내용 우선, 기존에만 있는 import는 보존).
  - swagger-typescript-api의 내부 포맷(prettier 기본값: 쌍따옴표+세미콜론)과 소비 프로젝트의 `.prettierrc.js` 포맷이 다른 근본 원인 자체는 남아 있습니다 — 이번 수정은 그 불일치를 병합 단계에서 흡수하는 것입니다.
