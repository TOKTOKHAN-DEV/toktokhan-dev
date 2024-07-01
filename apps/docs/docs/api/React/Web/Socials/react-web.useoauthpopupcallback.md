---
id: react-web.useoauthpopupcallback
title: UseOauthPopupCallback()
sidebar_label: UseOauthPopupCallback()
slug: /react-web.useoauthpopupcallback
---





OAuth 팝업 콜백을 처리하는 React Hook입니다. 이 Hook은 OAuth 인증 후 팝업에서 사용됩니다.

## Signature

```typescript
useOauthPopupCallback: <State>(cb?: useOauthCallbackParams<PopupResponse<State>, PopupResponse<State>>) => {
  data: OauthResponse<State> | null;
  isLoading: boolean;
  closePopup: () => (extra?: any) => void;
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

[useOauthCallbackParams](./react-web.useoauthcallbackparams)&lt;[PopupResponse](./react-web.popupresponse)&lt;State&gt;, [PopupResponse](./react-web.popupresponse)&lt;State&gt;&gt;


</td><td>

_(Optional)_


</td></tr>
</tbody></table>
## Returns

\{ data: [OauthResponse](./react-web.oauthresponse)&lt;State&gt; \| null; isLoading: boolean; closePopup: () =&gt; (extra?: any) =&gt; void; \}

OAuth 응답 데이터, 로딩 상태, 팝업을 닫는 함수를 반환합니다.

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

