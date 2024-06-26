---
id: universal.maybe
title: Maybe
sidebar_label: Maybe
slug: /universal.maybe
---





## Signature

```typescript
maybe: (<T>(value: T) => Maybe_F<T>) & {
  map: <T_1, R>(fn: (value: T_1) => R) => (maybe: Maybe_F<T_1>) => Maybe_F<R>;
  value: <T_2>(maybe: Maybe_F<T_2>) => T_2 | null | undefined;
}
```
