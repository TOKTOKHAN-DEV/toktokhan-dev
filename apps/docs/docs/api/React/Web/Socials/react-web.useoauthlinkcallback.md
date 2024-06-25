---
id: react-web.useoauthlinkcallback
title: UseOauthLinkCallback()
sidebar_label: UseOauthLinkCallback()
slug: /react-web.useoauthlinkcallback
---





OAuth 링크 콜백을 처리하는 React Hook입니다. 이 Hook은 OAuth 인증 후 리다이렉트된 페이지에서 사용됩니다.

## Signature

```typescript
useOauthLinkCallback: (cb?: useOauthCallbackParams<LinkCallBackParamType>) => {
  data: OauthResponse | null;
  isLoading: boolean;
}
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

cb


</td><td>

[useOauthCallbackParams](./react-web.useoauthcallbackparams)&lt;[LinkCallBackParamType](./react-web.linkcallbackparamtype)&gt;


</td><td>

_(Optional)_ 콜백 함수 파라미터. `onSuccess`와 `onFail` 콜백 함수를 포함할 수 있습니다.


</td></tr>
</tbody></table>
## Returns

\{ data: [OauthResponse](./react-web.oauthresponse) \| null; isLoading: boolean; \}

\{LinkReturnType\} OAuth 응답 데이터와 로딩 상태를 반환합니다.

