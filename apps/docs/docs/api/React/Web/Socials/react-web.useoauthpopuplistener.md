---
id: react-web.useoauthpopuplistener
title: UseOauthPopupListener()
sidebar_label: UseOauthPopupListener()
slug: /react-web.useoauthpopuplistener
---





OAuth 팝업에서 전달된 메시지를 수신하는 React Hook입니다. 이 Hook은 OAuth 인증 후 팝업에서 전달된 메시지를 수신하여 처리합니다.

## Signature

```typescript
useOauthPopupListener: () => {
  data: OauthResponse | null;
  isLoading: boolean;
}
```
## Returns

\{ data: [OauthResponse](./react-web.oauthresponse) \| null; isLoading: boolean; \}

\{boolean\} isLoading - OAuth 콜백 처리 상태를 나타냅니다. 처리 중이면 `true`, 아니면 `false`입니다.

