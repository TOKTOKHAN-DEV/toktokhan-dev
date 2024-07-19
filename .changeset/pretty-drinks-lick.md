---
'@toktokhan-dev/universal': patch
---

fix awaited type, add new function assert-item-of

### awaited 함수 type 수정

기존 awaited 함수의 type 의 return type 이 항상 Promise 를 반환하도록 수정했습니다.

### assert-item-of 함수 추가

넘겨진 데이터가 특정 배열의 구성요소인지 판별하는 함수가 추가되었습니다.

```
assertItemOf([1,2,3], 2) // pass
assertItemOf([1,2,3], 4) // throw Error
```
