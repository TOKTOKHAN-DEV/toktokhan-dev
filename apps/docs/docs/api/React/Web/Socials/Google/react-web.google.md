---
id: react-web.google
title: Google
sidebar_label: Google
slug: /react-web.google
---





Google OAuth 인증을 처리하는 클래스입니다. SocialOauthInit 클래스를 상속받아 구현되었습니다.

## Signature

```typescript
declare class Google extends SocialOauthInit 
```
**Extends:** [SocialOauthInit](./react-web.socialoauthinit)

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)(clientID)](./react-web.google._constructor_)


</td><td>


</td><td>

Google 클래스의 생성자입니다.


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

[createOauthUrl](./react-web.google.createoauthurl)


</td><td>


</td><td>

&lt;State&gt;(\{ state, scope, ...params \}: [OauthUserReqParams](./react-web.oauthuserreqparams)&lt;[GoogleAuthQueryParams](./react-web.googleauthqueryparams), State&gt;) =&gt; string


</td><td>

OAuth 인증 URL을 생성합니다.


</td></tr>
<tr><td>

[loginToLink](./react-web.google.logintolink)


</td><td>


</td><td>

&lt;State&gt;(params: [OauthUserReqParams](./react-web.oauthuserreqparams)&lt;[GoogleAuthQueryParams](./react-web.googleauthqueryparams), State&gt;) =&gt; void


</td><td>

OAuth 인증 링크로 리다이렉트합니다.


</td></tr>
<tr><td>

[loginToPopup](./react-web.google.logintopopup)


</td><td>


</td><td>

&lt;State&gt;(params: [OauthUserReqParams](./react-web.oauthuserreqparams)&lt;[GoogleAuthQueryParams](./react-web.googleauthqueryparams), State&gt;) =&gt; void


</td><td>

OAuth 인증 팝업을 엽니다.


</td></tr>
<tr><td>

[oAuthBaseUrl](./react-web.google.oauthbaseurl)


</td><td>


</td><td>

string


</td><td>


</td></tr>
</tbody></table>

