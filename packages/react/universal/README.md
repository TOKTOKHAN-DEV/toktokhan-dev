# @toktokhan-dev/react-universal

React 환경에서 전역적으로 사용할 수 있는 유틸리티 라이브러리입니다.
자세한 내용 및 제공하는 유틸리티 목록은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/react-universal)에서 확인 할 수 있습니다.

## Installation

```bash
npm i @toktokhan-dev/react-universal
```

## Preview

```tsx
import { useEffect, useState } from 'react'

import { LoadingView, useCallbackRef } from '@toktokhan-dev/react-universal'

const useTick = (onChange: (count: number) => void) => {
  const [count, setCount] = useState(0)
  const onChangeRef = useCallbackRef(onChange)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    onChangeRef(count)
  }, [onChangeRef, count])
}

const ExampleComponent = ({ isLoading }) => {
  // No need to use `useCallback` here.
  useTick((count) => console.log(count))

  return (
    <LoadingView isLoading={isLoading} fallback={<div>loading...</div>}>
      <div>Content</div>
    </LoadingView>
  )
}
```
