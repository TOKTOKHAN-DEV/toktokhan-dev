---
id: react-web.apple
title: Apple
sidebar_label: Apple
slug: /react-web.apple
---





Apple OAuth 인증을 처리하는 클래스입니다. SocialOauthInit 클래스를 상속받아 구현되었습니다.

## Signature

```typescript
declare class Apple extends SocialOauthInit 
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

[(constructor)(clientID)](./react-web.apple._constructor_)


</td><td>


</td><td>

Apple 클래스의 생성자입니다.


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

[createOauthUrl](./react-web.apple.createoauthurl)


</td><td>


</td><td>

&lt;State&gt;(\{ scope, state, ...params \}: [OauthUserReqParams](./react-web.oauthuserreqparams)&lt;[AppleAuthQueryParams](./react-web.appleauthqueryparams), State&gt;) =&gt; string


</td><td>

OAuth 인증 URL을 생성합니다.


</td></tr>
<tr><td>

[loginToLink](./react-web.apple.logintolink)


</td><td>


</td><td>

&lt;State&gt;(params: [OauthUserReqParams](./react-web.oauthuserreqparams)&lt;[AppleAuthQueryParams](./react-web.appleauthqueryparams), State&gt;) =&gt; void


</td><td>

로그인을 위한 OAuth 인증 링크로 리다이렉트합니다.


</td></tr>
<tr><td>

[loginToPopup](./react-web.apple.logintopopup)


</td><td>


</td><td>

&lt;State&gt;(params: [OauthUserReqParams](./react-web.oauthuserreqparams)&lt;[AppleAuthQueryParams](./react-web.appleauthqueryparams), State&gt;) =&gt; void


</td><td>

로그인을 위한 OAuth 인증 팝업을 엽니다.


</td></tr>
<tr><td>

[oAuthBaseUrl](./react-web.apple.oauthbaseurl)


</td><td>


</td><td>

string


</td><td>


</td></tr>
</tbody></table>

