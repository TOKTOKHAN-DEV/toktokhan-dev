---
sidebar_class_name : hidden
id: react-web.oauthuserreqparams
title: OauthUserReqParams
sidebar_label: OauthUserReqParams
slug: /react-web.oauthuserreqparams
---





OauthUserReqParams는 OAuth 인증 요청에 필요한 파라미터를 정의합니다. OauthUserReqParams는 CommonOauthParams를 확장하고, 필요한 추가 속성을 정의합니다. 소셜로그인에 필요한 `response_type` , `client_id`, `scope`, `state` 를 클래스 내부에서 직접 주입해주고 있기 때문에 필수 타입에서 제거하거나 변환하고 `return_url`와 같이 요청시 필요한 타입을 추가하였습니다.

## Signature

```typescript
type OauthUserReqParams<T extends CommonOauthParams> = Omit<T, keyof CommonOauthParams> & {
  return_url: string;
  scope?: string | string[];
};
```
## References
 [CommonOauthParams](./react-web.commonoauthparams)

