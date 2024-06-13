---
id: react-web.naver
title: Naver
sidebar_label: Naver
slug: /react-web.naver
---





네이버 OAuth 인증을 처리하는 클래스입니다. SocialOauthInit 클래스를 상속받아 구현되었습니다.

## Signature

```typescript
declare class Naver extends SocialOauthInit 
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

[(constructor)(clientID)](./react-web.naver._constructor_)


</td><td>


</td><td>

Naver 클래스의 생성자입니다.


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

[createOauthUrl](./react-web.naver.createoauthurl)


</td><td>


</td><td>

(\{ scope, return_url, ...params \}: [OauthUserReqParams](./react-web.oauthuserreqparams)&lt;[NaverAuthQueryParams](./react-web.naverauthqueryparams)&gt;) =&gt; string


</td><td>

OAuth 인증 URL을 생성합니다.


</td></tr>
<tr><td>

[loginToLink](./react-web.naver.logintolink)


</td><td>


</td><td>

(params: [OauthUserReqParams](./react-web.oauthuserreqparams)&lt;[NaverAuthQueryParams](./react-web.naverauthqueryparams)&gt;) =&gt; void


</td><td>

로그인을 위한 OAuth 인증 링크로 리다이렉트합니다.


</td></tr>
<tr><td>

[loginToPopup](./react-web.naver.logintopopup)


</td><td>


</td><td>

(params: [OauthUserReqParams](./react-web.oauthuserreqparams)&lt;[NaverAuthQueryParams](./react-web.naverauthqueryparams)&gt;) =&gt; void


</td><td>

로그인을 위한 OAuth 인증 팝업을 엽니다.


</td></tr>
<tr><td>

[oAuthBaseUrl](./react-web.naver.oauthbaseurl)


</td><td>


</td><td>

string


</td><td>


</td></tr>
</tbody></table>
