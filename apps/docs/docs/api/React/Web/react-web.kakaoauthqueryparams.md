---
sidebar_class_name : hidden
id: react-web.kakaoauthqueryparams
title: KakaoAuthQueryParams
sidebar_label: KakaoAuthQueryParams
slug: /react-web.kakaoauthqueryparams
---





[`Kakao Login Docs`](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api)

## Signature

```typescript
type KakaoAuthQueryParams = {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope?: string;
  prompt?: 'none' | 'login' | 'create' | 'select_account';
  login_hint?: string;
  service_terms?: string;
  state?: string;
  nonce?: string;
};
```
