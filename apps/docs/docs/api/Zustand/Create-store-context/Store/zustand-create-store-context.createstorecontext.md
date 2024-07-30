---
id: zustand-create-store-context.createstorecontext
title: CreateStoreContext()
sidebar_label: CreateStoreContext()
slug: /zustand-create-store-context.createstorecontext
---





zustand 와 함께 사용할 수 있는 `createStoreContext` 함수를 제공합니다. 지역적인 상태를 zustand 로 관리할 수 있습니다.

## Signature

```typescript
createStoreContext: <T>(initializer: StateCreator<T>) => CreateStoreContextReturn<T>
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

[CreateStoreContextReturn](./zustand-create-store-context.createstorecontextreturn)&lt;T&gt;

## Example


```tsx
import { createStoreContext } from '@toktokhan-dev/zustand-create-store-context'

const {
  Provider: CountProvider,
  useContext: useCountContext,
  withProvider: withCountProvider,
} = createStoreContext((set, get, store) => ({
  count: 0,
  setCount: (count: number) =>
    set(() => {
      count
    }),
}))

const Component = () => {
 const count = useCountContext((store) => store.count)
 const setCount = useCountContext((store) => store.setCount)

 return (
   <div>
     <button onClick={() => setCount(count + 1)}>+</button>
     <span>{count}</span>
   </div>
 )
}

 const Component2 = withProvider(Component)

const App = () => {
  return (
    <>
      <CountProvider>
        <Component />
      </CountProvider>

     <Component2 />

     <CountProvider initialState={{ count: 10 }}>
       <Component />
     </CountProvider>

      {withCountProvider(Component, { count: 10 })}
    </>
  )
}
```

