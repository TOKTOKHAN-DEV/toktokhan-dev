# @toktokhan-dev/zustand-create-store-context

zustand와 함께 사용할 수 있는 `createStoreContext` 유틸리티 패키지입니다.
zustand 스토어에 대한 context, provider, hoc 를 생성함으로써, Zustand를 사용한 지역 상태 관리를 가능하게 합니다.

자세한 내용과 사용법은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/zustand/Overview)에서 확인 할 수 있습니다.

## Installation

#### Only zustand-with-setter

```
npm i @toktokhan-dev/zustand-create-store-context
```

#### or With zustand-with-setter

```
npm i @toktokhan-dev/zustand-react
```

## Usage

### createStoreContext

zustand 의 create 와 완전히 동일한 값을 받아 context 를 생성할 수 있습니다.

```tsx
import { createStoreContext } from '@toktokhan-dev/zustand-create-store-context'

type Store = {
  count: number
  setCount: (count: number) => void
}

const { Provider, useContext, withProvider } = createStoreContext<Store>(
  (set, get, store) => ({
    count: 0,
    setCount: (count: number) => set(() => ({ count })),
  }),
)
```

### Provider

Provider 는 자식 컴포넌트에게 context 를 전달하는 역할을 합니다.

```tsx
const App = () => (
  <Provider>
    <Component />
  </Provider>
)
```

인자로 initial state 를 받아 초기 상태를 설정할 수 있습니다.

#### `initial: Partial<Store>`

```tsx
const App = () => (
  <Provider initial={{ count: 10 }}>
    <Component />
  </Provider>
)
```

### useContext

useContext 는 context 를 사용하여 상태를 가져오는 역할을 합니다.

```tsx
const Component = () => {
  const count = useContext((store) => store.count)
  const setCount = useContext((store) => store.setCount)
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <span>{count}</span>
    </div>
  )
}
```

### withProvider

withProvider 는 Component 를 Provider 로 감싸 컨텍스트를 전달하는 HOC 입니다.

```tsx
const Component2 = withProvider(Component)

// Same
const Component2 = (props: PropsOf<typeof Component>) => (
  <Provider>
    <Component {...props}/>
  </Provider>
)
```

2번째 인자에 initial state 를 전달할 수 있습니다.

#### `initial: Partial<Store>`

```tsx
const Component2 = withProvider(Component, { count: 10 })
```

### Overview

```tsx
import { createStoreContext } from '@toktokhan-dev/zustand-create-store-context'

const {
  Provider: CountProvider,
  useContext: useCountContext,
  withProvider: withCountProvider,
} = createStoreContext((set) => ({
  count: 0,
  setCount: (count: number) => set(() => ({ count })),
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

const App = () => (
  <>
    <CountProvider>
      <Component />
    </CountProvider>
    <CountProvider initialState={{ count: 10 }}>
      <Component />
    </CountProvider>
    <Component2 />
  </>
)
```
