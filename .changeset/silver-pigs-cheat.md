---
'@toktokhan-dev/rollup-config': patch
'@toktokhan-dev/node': patch
---

change rollup config for cjs

기존 cjs 빌드시, esm module build 를 위해 모든 패키지의 소스코드를 빌드파일에 포함시켜 resolve 하는 옵션을 개선했습니다.

'모든 패키지' -> '빌드시 기입한 패키지' 로 개선함으로써 cjs 의 빌드 용량을 축소 시켰습니다.
