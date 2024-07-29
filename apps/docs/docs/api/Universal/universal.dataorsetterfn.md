---
sidebar_class_name : hidden
id: universal.dataorsetterfn
title: DataOrSetterFn
sidebar_label: DataOrSetterFn
slug: /universal.dataorsetterfn
---





## Signature

```typescript
type DataOrSetterFn<T, D> = T | ((prev: T, get: <K extends DeepKeyOf<T>>(key: K) => DeepValueOf<T, K>, origin: D) => T);
```
## References
 [DeepKeyOf](./universal.deepkeyof), [DeepValueOf](./universal.deepvalueof)

