---
id: react-web.error_messages
title: ERROR_MESSAGES
sidebar_label: ERROR_MESSAGES
slug: /react-web.error_messages
---





OAuth 팝업에서 전달된 메시지를 수신하는 React Hook입니다. 이 Hook은 OAuth 인증 후 팝업에서 전달된 메시지를 수신하여 처리합니다.

## Signature

```typescript
ERROR_MESSAGES: {
  NO_RESPONSE: string;
  ORIGIN_MISMATCH: string;
  NO_AUTH_CODE: string;
}
```

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

