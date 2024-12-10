---
'@toktokhan-dev/cli-plugin-gen-api-react-query': patch
---

fetch api paramsSerializer 옵션 임시 추가

'fetch' 옵션으로 gen:api 시 타입 오류 발생하는 이슈 해결을 위해 임시로 타입이 추가 되었습니다.
기능은 하지 않습니다.

```ts
export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** 임시 추가 */
  paramsSerializer?: (...params: any[]) => any

  /** set parameter to`true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  ...
}
```
