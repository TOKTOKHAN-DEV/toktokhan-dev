---
'@toktokhan-dev/zustand-create-store-context': patch
---

type for using middleware

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
