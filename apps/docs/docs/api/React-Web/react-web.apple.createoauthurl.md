---
sidebar_class_name : hidden
id: react-web.apple.createoauthurl
title: Apple.createOauthUrl
sidebar_label: Apple.createOauthUrl
slug: /react-web.apple.createoauthurl
---





OAuth 인증 URL을 생성합니다.

## Signature

```typescript
createOauthUrl: <State>({
    scope,
    state,
    ...params
  }: OauthUserReqParams<AppleAuthQueryParams, State>) => string;
```
