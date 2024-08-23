# @toktokhan-dev/zustand-create-store-context

## 0.0.5

### Patch Changes

- 5a8e30d: type for using middleware

  ### 미들웨어를 위한 타입 개선

  createStoreContext 를 다른 미들웨어들과 함께 사용이 가능하도록 일부 타입이 수정, 개선되었습니다.

  ### 전역 상태를 context 로 사용할 경우를 위한 타입 개선

  Nextjs 와 같은 SSR 환경에선, 서버에서의 상태변경이 일어날 경우 각기 다른 클라이언트에서 서버상태를 공유하게 되는 이슈가 생길 수 있기 때문에, zustand 를 context 와 함께 사용하는 것을 권장합니다.

  따라서 createStoreContext 가 생성하는 store 와 hook 이 전역 상태로써의 역할 또한 할 수 있게 하기 위해 create 함수가 반환하는 useStore 와 동일한 타입을 갖도록 수정되었습니다.

  ### 기존

  ```ts
  import { create } from 'zustand'
  import { createStoreContext } from '@toktokhan-dev/zustand-create-store-context'

  const useStore = create(...)
  const { useContext } =  createStoreContext(...)

  useStore.getState() // OK
  useStore.setState(...) // OK

  useContext.getState() // Type Error
  useContext.setState(...) // Type Error
  ```

  ### 개선된 타입

  ```ts
  useContext.getState() // OK
  useContext.setState(...) // OK
  ```

## 0.0.4

### Patch Changes

- 9d6d905: 각 패키지별 LICENSE 와 README 파일을 추가하고, Package.json 을 개선했습니다.

## 0.0.3

### Patch Changes

- Updated dependencies [94e2b25]
  - @toktokhan-dev/universal@0.0.8

## 0.0.2

### Patch Changes

- f414a7f: type, comment

  type 과 주석이 개선되었습니다.

- Updated dependencies [f414a7f]
  - @toktokhan-dev/universal@0.0.7

## 0.0.1

### Patch Changes

- d94b3ba: new package

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
