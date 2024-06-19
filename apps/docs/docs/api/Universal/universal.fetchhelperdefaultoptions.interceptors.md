---
sidebar_class_name : hidden
id: universal.fetchhelperdefaultoptions.interceptors
title: FetchHelperDefaultOptions.interceptors
sidebar_label: FetchHelperDefaultOptions.interceptors
slug: /universal.fetchhelperdefaultoptions.interceptors
---





## Signature

```typescript
interceptors?: {
    request?: (requestArgs: FetchArgs, fetch: NonNullable<FetchHelperDefaultOptions['fetch']>) => Promise<FetchArgs>;
    response?: (response: Response, requestArgs: FetchArgs, fetch: NonNullable<FetchHelperDefaultOptions['fetch']>) => Promise<Response>;
  };
```
