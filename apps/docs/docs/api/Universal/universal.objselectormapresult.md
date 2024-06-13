---
sidebar_class_name : hidden
id: universal.objselectormapresult
title: ObjSelectorMapResult
sidebar_label: ObjSelectorMapResult
slug: /universal.objselectormapresult
---





## Signature

```typescript
type ObjSelectorMapResult<T, M extends ObjSelectorMap<T>> = { [K in keyof M]: ReturnType<M[K]> };
```
## References
 [ObjSelectorMap](./universal.objselectormap)

