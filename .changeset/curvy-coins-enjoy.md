---
'@toktokhan-dev/react-web': patch
---

social login hooks, types

## useOauthLinkCallback, useOauthPopupCallback, useOauthPopupListener 의 state

oauth 플로우 중 state 로써 사용되는 socialType 과 returnUrl 과 같은 값들을 유저가 자유롭게 사용할 수 있게 수정되었습니다.

state 는 JSON 형태로 파싱 가능한 어떤 값이든 사용하여 플로우상에서 사용할 수 있습니다. (string, number, object, array ...)

### 기존

```tsx
// pages/login.tsx
const Login = () => {
  return (
    <KakaoButton
      onClick={() =>
        kakao.loginToLink({
          redirect_uri: `${window.origin}/social/callback`,
          return_url: '/login',
        })
      }
    />
  )
}

// pages/social/callback.tsx
const Callback = () => {
  const result = useOauthLinkCallback({
    onSuccess: (res) => {
      console.log('res', res.data.returnUrl)
    },
  })

  return <></>
}
```

### 변경

```tsx
// pages/login.tsx
const Login = () => {
  return (
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
  )
}

// pages/social/callback.tsx
const Callback = () => {
  const result = useOauthLinkCallback<{ returnUrl: string }>({
    onSuccess: (res) => {
      console.log('res', res.state.returnUrl)
    },
  })

  return <></>
}
```

## useOauthPopupCallback, useOauthPopupListener 의 extra state

주로 callback hook 은 popup 윈도우에서 listener hook 은 부모 window 에서 사용하게 됩니다.

기존 popup window 에서 부모 window 로 oauth response 만 전달되던 방식에서 추가적인 데이터를 주고 받을 수 있도록 개선되었습니다.

useOauthPopupCallback 에서 제공되는 closePopup 함수를 통해 부모 window 에게 특정 데이터를 전달 할 수 있습니다.

```tsx
// /social/callback (popup window)
const PopupCallback = () => {
  useOauthPopupCallback({
    onSuccess: (res) => {
      console.log('succeed to login', res)
      res.closePopup({ message: 'Hello Parents Window!' })
    },
  })

  return <Splash />
}

// /login (parents window)
const Login = () => {
  const { data } = useOauthPopupListener<unknown, { message: string }>({
    onSuccess: (res) => {
      console.log(res.code)
      console.log(res.extra.message) // Heelo Parents Window!
    },
  })
}
```
