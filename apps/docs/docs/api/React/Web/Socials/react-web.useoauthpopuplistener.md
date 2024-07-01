---
id: react-web.useoauthpopuplistener
title: UseOauthPopupListener()
sidebar_label: UseOauthPopupListener()
slug: /react-web.useoauthpopuplistener
---





OAuth 팝업에서 전달된 메시지를 수신하는 React Hook입니다. 이 Hook은 OAuth 인증 후 팝업에서 전달된 메시지를 수신하여 처리합니다.

## Signature

```typescript
useOauthPopupListener: <State, Extra = unknown>(params?: useOauthCallbackParams<OauthResponse<State> & ExtraState<Extra>, OauthResponse<State> & ExtraState<Extra>>) => {
  data: (OauthResponse<State> & ExtraState<Extra>) | null;
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

[useOauthCallbackParams](./react-web.useoauthcallbackparams)&lt;[OauthResponse](./react-web.oauthresponse)&lt;State&gt; &amp; [ExtraState](./react-web.extrastate)&lt;Extra&gt;, [OauthResponse](./react-web.oauthresponse)&lt;State&gt; &amp; [ExtraState](./react-web.extrastate)&lt;Extra&gt;&gt;


</td><td>

_(Optional)_


</td></tr>
</tbody></table>
## Returns

\{ data: ([OauthResponse](./react-web.oauthresponse)&lt;State&gt; &amp; [ExtraState](./react-web.extrastate)&lt;Extra&gt;) \| null; isLoading: boolean; \}

isLoading - OAuth 콜백 처리 상태를 나타냅니다. 처리 중이면 `true`, 아니면 `false`입니다.

## Example


```tsx
// pages/login.tsx (parents window)

const kakao = new Kakao(ENV.CLIENT_ID)
const Login = () => {
  const { data } = useOauthPopupListener()
  console.log(data, data.state.returnUrl, data.extra) // { code: '...', state: { returnUrl: '/my', type: 'kakao' }, extra: 'hello parents' }

     <KakaoButton
       onClick={() =>
         kakao.loginToPopup({
           redirect_uri: `${window.origin}/social/callback`,
           state: {
             returnUrl: '/my',
             type: 'kakao',
           },
         })
       }
     />
}

// pages/social/callback.tsx (popup window)

const { data, isLoading } = useOauthPopupCallback<{type: string; returnUrl:string}>({
   onSuccess: (response) => {
     console.log(response.state.returnUrl)
     response.closePopup({ extra: 'hello parents' })
   },
})
```

