---
sidebar_class_name : hidden
id: zustand-create-store-context.createstorecontextreturn
title: CreateStoreContextReturn
sidebar_label: CreateStoreContextReturn
slug: /zustand-create-store-context.createstorecontextreturn
---





## Signature

```typescript
interface CreateStoreContextReturn<T, Mos extends [StoreMutatorIdentifier, unknown][] = []> 
```

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[Provider](./zustand-create-store-context.createstorecontextreturn.provider)


</td><td>


</td><td>

FunctionComponent&lt;\{ children: ReactNode; initial?: Partial&lt;T&gt;; \}&gt;


</td><td>


</td></tr>
<tr><td>

[useContext](./zustand-create-store-context.createstorecontextreturn.usecontext)


</td><td>


</td><td>

UseBoundStore&lt;Mutate&lt;StoreApi&lt;T&gt;, Mos&gt;&gt;


</td><td>


</td></tr>
<tr><td>

[withProvider](./zustand-create-store-context.createstorecontextreturn.withprovider)


</td><td>


</td><td>

&lt;P extends object&gt;(Component: ComponentType&lt;P&gt;, initial?: Partial&lt;T&gt;) =&gt; FunctionComponent&lt;P&gt;


</td><td>


</td></tr>
</tbody></table>

