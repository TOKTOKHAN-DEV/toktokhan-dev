---
id: react-web.useoauthpopupcallback
title: UseOauthPopupCallback()
sidebar_label: UseOauthPopupCallback()
slug: /react-web.useoauthpopupcallback
---





OAuth 팝업 콜백을 처리하는 React Hook입니다. 이 Hook은 OAuth 인증 후 팝업에서 사용됩니다.

## Signature

```typescript
useOauthPopupCallback: (cb?: useOauthCallbackParams<PopupCbSuccessParamType, PopupCbFailParamType>) => {
  data: OauthResponse | null;
  isLoading: boolean;
  closePopup: () => () => void;
  isOpenedPopup: boolean;
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

[useOauthCallbackParams](./react-web.useoauthcallbackparams)&lt;[PopupCbSuccessParamType](./react-web.popupcbsuccessparamtype), [PopupCbFailParamType](./react-web.popupcbfailparamtype)&gt;


</td><td>

_(Optional)_ 콜백 함수 파라미터. `onSuccess`와 `onFail` 콜백 함수를 포함할 수 있습니다.


</td></tr>
</tbody></table>
## Returns

\{ data: [OauthResponse](./react-web.oauthresponse) \| null; isLoading: boolean; closePopup: () =&gt; () =&gt; void; isOpenedPopup: boolean; \}

\{PopupReturnType\} OAuth 응답 데이터, 로딩 상태, 팝업을 닫는 함수를 반환합니다.

