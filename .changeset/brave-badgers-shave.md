---
'@toktokhan-dev/universal': patch
---

retry request manager

retryRequestManager 함수의 onRefetch 함수가 끝나기 전에, token promise 를 정리하는 로직이 실행되는 버그를 수정했습니다.
