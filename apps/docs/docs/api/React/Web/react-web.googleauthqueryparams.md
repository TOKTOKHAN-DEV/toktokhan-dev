---
sidebar_class_name : hidden
id: react-web.googleauthqueryparams
title: GoogleAuthQueryParams
sidebar_label: GoogleAuthQueryParams
slug: /react-web.googleauthqueryparams
---





[`Google Login Docs`](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow?hl=ko)

## Signature

```typescript
type GoogleAuthQueryParams = {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  state?: string;
  include_granted_scopes?: boolean;
  enable_granular_consent?: boolean;
  login_hint?: string;
  prompt?: 'none' | 'consent' | 'select_account';
};
```
