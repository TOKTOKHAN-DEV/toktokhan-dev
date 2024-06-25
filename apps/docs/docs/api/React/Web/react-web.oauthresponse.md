---
sidebar_class_name : hidden
id: react-web.oauthresponse
title: OauthResponse
sidebar_label: OauthResponse
slug: /react-web.oauthresponse
---





## Signature

```typescript
type OauthResponse = {
  code: string | null;
  socialType: 'kakao' | 'google' | 'naver' | 'facebook' | 'apple' | null;
  returnUrl: string | null;
};
```
