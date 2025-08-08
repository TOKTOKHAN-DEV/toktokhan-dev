---
id: chakra.infinitycontent
title: InfinityContent()
sidebar_label: InfinityContent()
slug: /chakra.infinitycontent
---





무한 스크롤을 구현할 수 있는 컴포넌트입니다. 자식에 랜더링하고 싶은 컴포넌트(리스트 컴포넌트)를 받아 랜더링합니다. 유저의 화면이 스크롤 될때 observer 가 보고 있는 요소가 화면에 보이면 `onFetchMore` 함수를 호출합니다.

## Signature

```typescript
InfinityContent: ({
  children,
  hasMore,
  isFetching,
  onFetchMore,
  observerOption,
  styles,
  spinner
}: InfinityContentProps) => react_jsx_runtime.JSX.Element
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

\{ children, hasMore, isFetching, onFetchMore, observerOption, styles, spinner\}


</td><td>

[InfinityContentProps](./chakra.infinitycontentprops)


</td><td>


</td></tr>
</tbody></table>

## Returns

react_jsx_runtime.JSX.Element

## Example


```tsx

const ExampleComponent = () => {
 const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostsInfiniteQuery();

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

