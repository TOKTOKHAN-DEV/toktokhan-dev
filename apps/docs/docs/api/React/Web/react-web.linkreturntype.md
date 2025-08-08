---
sidebar_class_name : hidden
id: react-web.linkreturntype
title: LinkReturnType
sidebar_label: LinkReturnType
slug: /react-web.linkreturntype
---





`useOauthLinkCallback` 훅의 반환 타입을 정의합니다.

## Signature

```typescript
interface LinkReturnType<T> 
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

[data](./react-web.linkreturntype.data)


</td><td>


</td><td>

[OauthResponse](./react-web.oauthresponse)&lt;T&gt; \| null


</td><td>

OAuth 응답 데이터를 나타냅니다.


</td></tr>
<tr><td>

[isLoading](./react-web.linkreturntype.isloading)


</td><td>


</td><td>

boolean


</td><td>

OAuth 콜백 처리 상태를 나타냅니다. 처리 중이면 `true`, 아니면 `false`입니다.


</td></tr>
</tbody></table>

