---
id: zustand-create-store-context.createstorecontext
title: CreateStoreContext()
sidebar_label: CreateStoreContext()
slug: /zustand-create-store-context.createstorecontext
---





## Signature

```typescript
createStoreContext: <T>(initializer: StateCreator<T>) => {
  Provider: ({
    children,
    initial
  }: {
    children: React.ReactNode;
    initial?: Partial<T>;
  }) => react_jsx_runtime.JSX.Element;
  useContext: <Selected>(selector: (store: T) => Selected) => Selected;
  withProvider: <P extends object>(Component: React.ComponentType<P>, initial?: Partial<T>) => (props: P) => react_jsx_runtime.JSX.Element;
}
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

initializer


</td><td>

StateCreator&lt;T&gt;


</td><td>


</td></tr>
</tbody></table>
## Returns

\{ Provider: ({ children, initial \}: \{ children: React.ReactNode; initial?: Partial&lt;T&gt;; \}) =&gt; react_jsx_runtime.JSX.Element; useContext: &lt;Selected&gt;(selector: (store: T) =&gt; Selected) =&gt; Selected; withProvider: &lt;P extends object&gt;(Component: React.ComponentType&lt;P&gt;, initial?: Partial&lt;T&gt;) =&gt; (props: P) =&gt; react_jsx_runtime.JSX.Element; }

