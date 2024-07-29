---
id: zustand-with-setter.withsetter
title: WithSetter
sidebar_label: WithSetter
slug: /zustand-with-setter.withsetter
---





## Signature

```typescript
type WithSetter<T extends Obj> = T & {
  set: Setter<T>;
  reset: Resetter<T>;
};
```
## References
 [Obj](./universal.obj), [Setter](./zustand-with-setter.setter), [Resetter](./zustand-with-setter.resetter)

