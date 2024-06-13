---
id: universal.retryreqeustmanager
title: RetryReqeustManager()
sidebar_label: RetryReqeustManager()
slug: /universal.retryreqeustmanager
---





주로 refresh token 이 필요한 요청을 관리하는 함수입니다. 토큰이 만료됐을 시, refresh token 을 요청하고, 새로운 토큰을 받아서 요청을 재시도합니다.

## Signature

```typescript
retryReqeustManager: () => <T, E>(params: RetryFnParams<T, E>) => Promise<T>
```
## Returns

&lt;T, E&gt;(params: [RetryFnParams](./universal.retryfnparams)&lt;T, E&gt;) =&gt; Promise&lt;T&gt;

refresh token 이 필요한 요청을 관리하는 함수입니다.

## Example

```ts const retry = retryReqeustManager()

const result = await retry(\{ getToken: async () =&gt; { await delay(200) return 'token' \}, onRefetch: (token: string) =&gt; \{ return token \}, onError: (error: any) =&gt; \{ return error \}, })

