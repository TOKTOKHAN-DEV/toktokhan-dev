---
sidebar_class_name : hidden
id: react-web.naver.createoauthurl
title: Naver.createOauthUrl
sidebar_label: Naver.createOauthUrl
slug: /react-web.naver.createoauthurl
---





OAuth 인증 URL을 생성합니다.

## Signature

```typescript
createOauthUrl: <State>({
    scope,
    state,
    ...params
  }: OauthUserReqParams<NaverAuthQueryParams, State>) => string;
```
