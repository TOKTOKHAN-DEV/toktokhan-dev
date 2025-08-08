---
sidebar_class_name : hidden
id: react-web.popupreturntype
title: PopupReturnType
sidebar_label: PopupReturnType
slug: /react-web.popupreturntype
---





`useOauthPopupCallback` 훅의 반환 타입을 정의합니다.

## Signature

```typescript
interface PopupReturnType<T> 
```

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[data](./react-web.popupreturntype.data)


</td><td>


</td><td>

[OauthResponse](./react-web.oauthresponse)&lt;T&gt; \| null


</td><td>

OAuth 응답 데이터를 나타냅니다.


</td></tr>
<tr><td>

[isLoading](./react-web.popupreturntype.isloading)


</td><td>


</td><td>

boolean


</td><td>

OAuth 콜백 처리 상태를 나타냅니다. 처리 중이면 `true`, 아니면 `false`입니다.


</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[closePopup(extra)](./react-web.popupreturntype.closepopup)


</td><td>

팝업을 닫는 함수를 나타냅니다. 팝업이 닫힐때 부모 창에 OAuth 응답 데이터를 전달합니다. `useOauthPopupListener` 훅을 사용하여 부모 창에서 OAuth 응답 데이터를 수신할 수 있습니다.


</td></tr>
</tbody></table>

