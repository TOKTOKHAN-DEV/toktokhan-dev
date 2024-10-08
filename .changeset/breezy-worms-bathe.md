---
'@toktokhan-dev/cli-plugin-gen-theme-chakra': patch
---

color key

기존 원시 컬러인 colorSchema 에서 "white.transparent" 값이 기본 chakra 의 white 값을 덮어 씌워 발생하는 버그를 수정했습니다.

**컬러 네이밍 방식 수정 예시**

- 원시 컬러 토큰: white.transparent.50 -> white-transparent.50
- 시멘틱 컬러 토큰: accent.yellow.100 (기존 유지)
