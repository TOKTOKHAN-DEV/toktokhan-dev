---
sidebar_class_name : hidden
id: react-web.popupresponse
title: PopupResponse
sidebar_label: PopupResponse
slug: /react-web.popupresponse
---





## Signature

```typescript
interface PopupResponse<T> extends OauthResponse<T> 
```
**Extends:** [OauthResponse](./react-web.oauthresponse)&lt;T&gt;

## Methods

<table><thead><tr><th>

Method


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[closePopup(extra)](./react-web.popupresponse.closepopup)


</td><td>

팝업을 닫는 함수를 나타냅니다. 팝업이 닫힐때 부모 창에 OAuth 응답 데이터를 전달합니다. `useOauthPopupListener` 훅을 사용하여 부모 창에서 OAuth 응답 데이터를 수신할 수 있습니다.


</td></tr>
</tbody></table>
