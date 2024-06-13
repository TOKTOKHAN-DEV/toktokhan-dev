---
id: universal.keep
title: Keep
sidebar_label: Keep
slug: /universal.keep
---





## Signature

```typescript
keep: {
  <T>(kept: T): Keep_F<T, T>;
  of: <Kept, Value>(value: Value, keep: Keep_F<Kept, Value>) => Keep_F<Kept, Value>;
  map: <Kept, Prev, New>(fn: (value: Prev, kept: Kept) => New, keep: Keep_F<Kept, Prev>) => Keep_F<Kept, New>;
  value: <Kept, Value>(keep: Keep_F<Kept, Value>) => Value;
}
```
