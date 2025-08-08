---
id: react-web.useoauthlinkcallback
title: UseOauthLinkCallback()
sidebar_label: UseOauthLinkCallback()
slug: /react-web.useoauthlinkcallback
---





OAuth 링크 콜백을 처리하는 React Hook입니다. 이 Hook은 OAuth 인증 후 리다이렉트된 페이지에서 사용됩니다.

## Signature

```typescript
useOauthLinkCallback: <State>(params?: useOauthCallbackParams<OauthResponse<State>, OauthResponse<State>>) => {
  data: OauthResponse<State> | null;
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

params


</td><td>

[useOauthCallbackParams](./react-web.useoauthcallbackparams)&lt;[OauthResponse](./react-web.oauthresponse)&lt;State&gt;, [OauthResponse](./react-web.oauthresponse)&lt;State&gt;&gt;


</td><td>

_(Optional)_ 콜백 함수 파라미터. `onSuccess`와 `onFail` 콜백 함수를 포함할 수 있습니다.


</td></tr>
</tbody></table>

## Returns

\{ data: [OauthResponse](./react-web.oauthresponse)&lt;State&gt; \| null; isLoading: boolean; \}

\{LinkReturnType\} OAuth 응답 데이터와 로딩 상태를 반환합니다.

## Example


```tsx
// pages/login.tsx

const kakao = new Kakao(ENV.CLIENT_ID)
const Login = () =>
     <KakaoButton
       onClick={() =>
         kakao.loginToLink({
           redirect_uri: `${window.origin}/social/callback`,
           state: {
             returnUrl: returnUrl || '/login',
             type: 'kakao',
           },
         })
       }
     />
}


// pages/social/callback.tsx

const { data, isLoading } = useOauthLinkCallback<{type: string; returnUrl:string}>({
   onSuccess: (response) => {
     console.log(response.state.returnUrl)
   },
})
```

