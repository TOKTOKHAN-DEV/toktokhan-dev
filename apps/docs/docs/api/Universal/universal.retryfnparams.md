---
sidebar_class_name : hidden
id: universal.retryfnparams
title: RetryFnParams
sidebar_label: RetryFnParams
slug: /universal.retryfnparams
---





## Signature

```typescript
type RetryFnParams<T = any, E = any> = {
  getToken: () => Promise<string>;
  onRefetch: (refresed: string) => T;
  onError?: (error: E) => void;
};
```
