---
sidebar_class_name : hidden
id: react-web.google.createoauthurl
title: Google.createOauthUrl
sidebar_label: Google.createOauthUrl
slug: /react-web.google.createoauthurl
---





OAuth 인증 URL을 생성합니다.

## Signature

```typescript
createOauthUrl: <State>({
    state,
    scope,
    ...params
  }: OauthUserReqParams<GoogleAuthQueryParams, State>) => string;
```
