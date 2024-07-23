---
'@toktokhan-dev/zustand-create-store-context': patch
---

new package

새로운 패키지 `@toktokhan-dev/zustand-create-store-context` 가 추가되었습니다

### `createStoreContext`

zustand 와 함께 사용할 수 있는 `createStoreContext` 함수를 제공합니다. 지역적인 상태를 zustand 로 관리할 수 있습니다.

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
      {/* Provider */}
      <CountProvider>
        <Component />
      </CountProvider>

      {/* HOC */}
      <Component2 />

      {/* Provider InitialState */}
      <CountProvider initialState={{ count: 10 }}>
        <Component />
      </CountProvider>

      {/* HOC InitialState (단순 예제입니다. render 바깥에서 선언하길 권장합니다.) */}
      {withCountProvider(Component, { count: 10 })}
    </>
  )
}
```
