---
sidebar_class_name : hidden
id: react-web.useoauthpopuplistener
title: UseOauthPopupListener()
sidebar_label: UseOauthPopupListener()
slug: /react-web.useoauthpopuplistener
---





## Signature

```typescript
useOauthPopupListener: <State, Extra = unknown>(params?: useOauthCallbackParams<OauthResponse<State> & ExtraState<Extra>, Partial<OauthResponse<State> & ExtraState<Extra> & {
  msg?: string;
}>>) => {
  data: Partial<OauthResponse<State> & ExtraState<Extra>> | null;
  isLoading: boolean;
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

params


</td><td>

[useOauthCallbackParams](./react-web.useoauthcallbackparams)&lt;[OauthResponse](./react-web.oauthresponse)&lt;State&gt; &amp; [ExtraState](./react-web.extrastate)&lt;Extra&gt;, Partial&lt;[OauthResponse](./react-web.oauthresponse)&lt;State&gt; &amp; [ExtraState](./react-web.extrastate)&lt;Extra&gt; &amp; \{ msg?: string; \}&gt;&gt;


</td><td>

_(Optional)_


</td></tr>
</tbody></table>
## Returns

\{ data: Partial&lt;[OauthResponse](./react-web.oauthresponse)&lt;State&gt; &amp; [ExtraState](./react-web.extrastate)&lt;Extra&gt;&gt; \| null; isLoading: boolean; \}

