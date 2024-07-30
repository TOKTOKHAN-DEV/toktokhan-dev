---
sidebar_class_name : hidden
id: github.partible
title: Partible
sidebar_label: Partible
slug: /github.partible
---





## Signature

```typescript
type Partible<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
```
