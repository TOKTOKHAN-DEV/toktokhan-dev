# @toktokhan-dev/chakra

[ChakraUI](https://v2.chakra-ui.com/)로 구성되어있는 컴포넌트 패키지입니다.
자세한 내용 및 제공하는 유틸리티 목록은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/chakra)에서 확인 할 수 있습니다.

## Installation

```bash
npm i @toktokhan-dev/chakra
```

## Preview

```tsx
import { InfinityContent } from '@toktokhan-dev/chakra'

const ExampleComponent = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostsInfiniteQuery()

  return (
    <InfinityContent
      hasMore={hasNextPage}
      isFetching={isFetchingNextPage}
      onFetchMore={fetchNextPage}
    >
      <PostList data={data} />
    </InfinityContent>
  )
}
```
