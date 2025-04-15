---
sidebar_class_name : hidden
id: zustand-with-setter.iwithsetter
title: IWithSetter
sidebar_label: IWithSetter
slug: /zustand-with-setter.iwithsetter
---





## Signature

```typescript
type IWithSetter<T extends Obj> = T & {
  set: Setter<T>;
  reset: Resetter<T>;
};
```
## References
 [Obj](./universal.obj), [Setter](./zustand-with-setter.setter), [Resetter](./zustand-with-setter.resetter)

