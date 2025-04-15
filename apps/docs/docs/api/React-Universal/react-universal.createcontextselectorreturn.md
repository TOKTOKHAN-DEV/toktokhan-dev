---
sidebar_class_name : hidden
id: react-universal.createcontextselectorreturn
title: CreateContextSelectorReturn
sidebar_label: CreateContextSelectorReturn
slug: /react-universal.createcontextselectorreturn
---





## Signature

```typescript
type CreateContextSelectorReturn<T, P> = {
  useContext: <Selected>(selector: (value: T) => Selected) => Selected;
  Provider: ({
    children,
    params
  }: {
    children: ReactNode;
    params?: P;
  }) => JSX.Element;
  withProvider: <C extends ComponentType<any>>(Component: C, params?: P) => (props: PropsOf<C>) => JSX.Element;
};
```
## References
 [PropsOf](./react-universal.propsof)

