---
sidebar_class_name : hidden
id: react-web.socialoauthinit
title: SocialOauthInit
sidebar_label: SocialOauthInit
slug: /react-web.socialoauthinit
---





SocialOauthInit 클래스는 소셜 로그인 초기화를 담당합니다.

## Signature

```typescript
declare class SocialOauthInit 
```

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)(clientID)](./react-web.socialoauthinit._constructor_)


</td><td>


</td><td>

생성자 함수에서는 클라이언트 ID를 받아 초기화합니다.


</td></tr>
</tbody></table>

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

[clientID](./react-web.socialoauthinit.clientid)


</td><td>


</td><td>

string


</td><td>


</td></tr>
<tr><td>

[decodeOAuthState](./react-web.socialoauthinit.decodeoauthstate)


</td><td>

`static`


</td><td>

&lt;T&gt;(state: string) =&gt; T \| null


</td><td>

decodeOAuthState 메서드는 인코딩된 OAuth 상태를 디코딩합니다.


</td></tr>
<tr><td>

[encodeOAuthState](./react-web.socialoauthinit.encodeoauthstate)


</td><td>

`static`


</td><td>

&lt;T&gt;(state: T) =&gt; string


</td><td>

encodeOAuthState 메서드는 OAuth 상태를 인코딩합니다.


</td></tr>
<tr><td>

[oAuthBaseUrl](./react-web.socialoauthinit.oauthbaseurl)


</td><td>


</td><td>

string


</td><td>


</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[createOauthUrl(params)](./react-web.socialoauthinit.createoauthurl)


</td><td>


</td><td>

createOauthUrl 메서드는 OAuth 인증 URL을 생성합니다.


</td></tr>
</tbody></table>
