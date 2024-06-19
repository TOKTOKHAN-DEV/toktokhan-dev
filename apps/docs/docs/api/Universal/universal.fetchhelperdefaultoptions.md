---
sidebar_class_name : hidden
id: universal.fetchhelperdefaultoptions
title: FetchHelperDefaultOptions
sidebar_label: FetchHelperDefaultOptions
slug: /universal.fetchhelperdefaultoptions
---





`fetchHelper` 함수의 옵션입니다.

## Signature

```typescript
type FetchHelperDefaultOptions = {
  fetch?: ReturnType<FetchHelper>;
  baseUrl?: string | URL;
  headers?: HeadersInit;
  interceptors?: {
    request?: (requestArgs: FetchArgs, fetch: NonNullable<FetchHelperDefaultOptions['fetch']>) => Promise<FetchArgs>;
    response?: (response: Response, requestArgs: FetchArgs, fetch: NonNullable<FetchHelperDefaultOptions['fetch']>) => Promise<Response>;
  };
};
```
## References
 [FetchHelper](./universal.fetchhelper), [FetchArgs](./universal.fetchargs), [FetchHelperDefaultOptions](./universal.fetchhelperdefaultoptions)

