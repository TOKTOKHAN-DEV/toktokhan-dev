---
'@toktokhan-dev/cli-plugin-gen-api-react-query': patch
---

fix: enum nullable bug

요청 타입에서 enum 값이 nullable 일 경우, nullable 이 적용되지 않는 이슈가 수정되었습니다.

#### 이전

```ts
export interface SomeApiRequestType {
  /** nullable enum */
  someEnum: SomeEnum
}
```

#### 개선

```ts
export interface SomeApiRequestType {
  /** nullable enum */
  someEnum: SomeEnum | null
}
```
