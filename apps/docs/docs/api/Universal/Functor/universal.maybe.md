---
id: universal.maybe
title: Maybe
sidebar_label: Maybe
slug: /universal.maybe
---





## Signature

```typescript
maybe: (<T>(value: T) => Maybe_F<T>) & {
  map: <T, R>(fn: (value: T) => R) => (maybe: Maybe_F<T>) => Maybe_F<R>;
  value: <T>(maybe: Maybe_F<T>) => T | null | undefined;
}
```
