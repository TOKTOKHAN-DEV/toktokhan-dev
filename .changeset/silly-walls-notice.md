---
'@toktokhan-dev/cli-plugin-gen-api-react-query': minor
---

# 새로운 기능: React Query Suspense 지원

> includeReactSuspenseQuery option 을 사용하기 전 공식문서를 꼭 읽어주세요.
> [tanstack React-query suspense](https://tanstack.com/query/latest/docs/framework/react/guides/suspense) > [React suspense](https://ko.react.dev/reference/react/Suspense)

## 주요 변경 사항

1. `GenerateSwaggerApiConfig` 인터페이스에 새로운 옵션 추가:

   - `includeReactSuspenseQuery`: React Suspense Query 생성 여부를 결정하는 불리언 값으로 true로 설정시 React Query useSuspense를 반환하는 hook을 생성 해줍니다. 기본 값은 `false`입니다.

2. GET 요청에 대한 Suspense Query 지원:

   - 기존에 `useQuery`로 사용되던 GET 엔드포인트에 대해서 Suspense Query 훅과 옵션이 생성됩니다.

3. `includeReactInfiniteQuery` 제거:
   `useQuery` hook 생성에 한해서는 기존의 `includeReactInfiniteQuery` 옵션이 제거되고, `includeReactQuery`로 통합되었습니다. 기본값은 `true`입니다.

## 새로운 기능 상세 설명

1. Suspense 기반 쿼리 훅:

   - 각 API 엔드포인트에 대해 `use[ApiName]SuspenseQuery` 훅이 생성됩니다.
   - 이 훅은 `useSuspenseQuery`를 사용하여 Suspense 기반의 데이터 fetching을 지원합니다.

2. Suspense 쿼리 옵션:
   - 각 API 엔드포인트에 대해 `[apiName]SuspenseQueryOptions` 함수가 생성됩니다.
   - 이 함수는 `useSuspenseQueries`를 사용한 병렬 데이터 쿼리에 활용할 수 있는 옵션을 제공합니다.

## config 설정

### tok-cli-config.ts

```ts

const config ={
...
 'gen:api': {
    ...,
    includeReactQuery: true or false // default true
    includeReactSuspenseQuery: true // default false
  },
...
}
```

### 생성 예시

```typescript
// [app-name]/src/generated/apis/[ApiName]/[ApiName].suspenseQuery.ts

/**
 * No description
 *
 * @tags book
 * @name BookRetrieve
 * @request GET:/v1/book/{bok_id}/
 * @secure    */

export const useBookRetrieveSuspenseQuery = <
  TData = Awaited<ReturnType<typeof bookApi.bookRetrieve>>,
>(
  params: SuspenseQueryHookParams<
    typeof bookApi.bookRetrieve,
    AxiosError<any>,
    TData
  >,
) => {
  const queryKey = QUERY_KEY_BOOK_API.RETRIEVE(params.variables)

  return useSuspenseQuery({
    queryKey,
    queryFn: () => bookApi.bookRetrieve(params.variables),
    ...params?.options,
  })
}

/**
 * @name bookRetrieveQueryOptions
 * @description 이 옵션은 Suspense 기반의 병렬 데이터 쿼리를 위한 설정입니다.
 * `useSuspenseQueries`를 사용하여 여러 쿼리를 병렬로 처리할 때 활용하세요.
 */
export const bookRetrieveSuspenseQueryOptions = <
  TData = Awaited<ReturnType<typeof bookApi.bookRetrieve>>,
>(
  params: SuspenseQueryHookParams<typeof bookApi.bookRetrieve, unknown, TData>,
) => {
  const queryKey = QUERY_KEY_BOOK_API.RETRIEVE(params.variables)

  return {
    queryKey,
    queryFn: () => bookApi.bookRetrieve(params.variables),
    ...params?.options,
  }
}
```

## 사용 예시

### useSuspense example

```tsx
'use client'

import { useBookRetrieveSuspenseQuery } from '../api/Book.suspenseQuery'

const Book = () => {
  const book = useBookRetrieveSuspenseQuery({
    variables: { bookId: 13 },
  })

  return (
    <div>
      <p>useSuspenseQuery Example</p>
      <p>title: {book.data.name} </p>
      <p>year: {book.data.year} </p>
    </div>
  )
}

export default Book
```

### useSuspenseQueries example

단일 컴포넌트 내에서 여러 개의 `useSuspenseQuery`를 개별적으로 사용할 경우, 의도치 않은 waterfall 효과가 발생할 수 있습니다.

이러한 경우 `useSuspenseQueries`를 활용할 수 있습니다. 이 훅을 사용하면 여러 쿼리를 동시에 병렬로 실행할 수 있게되는데요.

이 때 gen api로 생성된 queryOptions를 적극 활용해주세요.

> 현재 QueryOptions는 단일 ussSuspenseQuery 와 같은 파일 경로에 위치해 있지만,
> 추후 query-options.ts로 분리하는 것을 고려하고있습니다.

```tsx
'use client'

import { useSuspenseQueries } from '@tanstack/react-query'

import {
  authorRetrieveSuspenseQueryOptions,
  bookRetrieveSuspenseQueryOptions,
} from '../api/Book.suspenseQuery'

const BookDetail = () => {
  const book = bookRetrieveSuspenseQueryOptions({
    variables: { bookId: 1 },
  })

  const autor = authorRetrieveSuspenseQueryOptions({
    variables: { authorId: 8 },
  })

  const [bookData, author] = useSuspenseQueries({
    queries: [book, autor],
  })

  return (
    <div>
      <p>
        <b>useSuspenseQuries Example</b>
      </p>
      <p>title: {bookData.data.name} </p>
      <p>year: {bookData.data.year} </p>
      <p>author: {author.data.name} </p>.
    </div>
  )
}

export default BookDetail
```

## with Suspense

```tsx
export default function BookInfo() {
  return (
    <Center>
      <Suspense fallback={<p>book loading...</p>}>
        <Book />
      </Suspense>
      <Suspense fallback={<p>author loading...</p>}>
        <Author />
      </Suspense>
      <Suspense fallback={<p>book & author loading...</p>}>
        <BookDetail />
      </Suspense>
    </Center>
  )
}
```

## @Additional Suspense Loading 처리

### : Suspense와 일반적인 로딩 처리를 모두 지원

React Suspense 는 로딩 상태를 감지하려면 children 컴포넌트 내에서 비동기 작업이 이뤄져야 합니다. 따라서 실제 데이터 패칭작업이 내부적으로 일어나지 않는다면, 수동으로 프로미스를 생성하거나, fallback component를 따로 렌더링하며 확인한 후 작업을 하는 과정이 불편했는데요.

<Loading/> 컴포넌트는 데이터를 패칭하지 않고도 isLoading true로 fallback상태를 미리 확인할 수 있는 컴포넌트입니다.

suspense와 함께 같이 사용해보세요!

```tsx
import { type ReactNode, Suspense } from 'react'

import { Skeleton } from '@chakra-ui/react'

export interface LoadingProps {
  isLoading?: boolean
  fallback?: ReactNode
  children: ReactNode
}

/**
 * isLoading 이 true 일 때 fallback 을 보여주고, false 일 때 children 을 보여줍니다.
 * isLoading 이 undefined 일 때는 Suspense 로 children 을 보여줍니다.
 */
export const Loading = ({ isLoading, children, fallback }: LoadingProps) => {
  if (isLoading === undefined) {
    return <Suspense fallback={fallback}>{children}</Suspense>
  }

  if (isLoading) {
    return fallback || <Skeleton />
  }

  return children
}
```

```tsx
export default function BookInfo() {
  return (
    <Center>
      <Loading fallback={<p>book loading...</p>}>
        <Book />
      </Loading>
      <Loading fallback={<p>author loading...</p>}>
        <Author />
      </Loading>
      <Loading fallback={<p>book & author loading...</p>}>
        <BookDetail />
      </Loading>
    </Center>
  )
}
```
