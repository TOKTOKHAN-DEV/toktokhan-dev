---
sidebar_class_name : hidden
id: react-web.kakao.createoauthurl
title: Kakao.createOauthUrl
sidebar_label: Kakao.createOauthUrl
slug: /react-web.kakao.createoauthurl
---





OAuth 인증 URL을 생성합니다.

## Signature

```typescript
createOauthUrl: <State>({
    state,
    scope,
    ...params
  }: OauthUserReqParams<KakaoAuthQueryParams, State>) => string;
```
