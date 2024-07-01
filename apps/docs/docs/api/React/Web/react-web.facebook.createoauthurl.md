---
sidebar_class_name : hidden
id: react-web.facebook.createoauthurl
title: Facebook.createOauthUrl
sidebar_label: Facebook.createOauthUrl
slug: /react-web.facebook.createoauthurl
---





OAuth 인증 URL을 생성합니다.

## Signature

```typescript
createOauthUrl: <State>({
    scope,
    state,
    ...params
  }: OauthUserReqParams<FacebookAuthQueryParams, State>) => string;
```
