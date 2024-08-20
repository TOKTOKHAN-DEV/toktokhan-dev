---
id: chakra.infinitylist
title: InfinityList()
sidebar_label: InfinityList()
slug: /chakra.infinitylist
---





무한 스크롤을 구현할 수 있는 컴포넌트입니다. data 와 renderItem 을 직접 받아 랜더링합니다.

스크롤이 끝에 도달하여 observer 가 보고 있는 요소가 화면에 보이면 `onFetchMore` 함수를 호출합니다.

## Signature

```typescript
InfinityList: <T>({
  data,
  renderItem,
  hasMore,
  isFetching,
  onFetchMore,
  observerOption,
  empty,
  spinner,
  styles
}: InfinityListProps<T>) => string | number | boolean | Iterable<ReactNode> | react_jsx_runtime.JSX.Element | null | undefined
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

\{ data, renderItem, hasMore, isFetching, onFetchMore, observerOption, empty, spinner, styles\}


</td><td>

[InfinityListProps](./chakra.infinitylistprops)&lt;T&gt;


</td><td>


</td></tr>
</tbody></table>
## Returns

string \| number \| boolean \| Iterable&lt;ReactNode&gt; \| react_jsx_runtime.JSX.Element \| null \| undefined

## Example


```tsx

const ExampleComponent = () => {
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostsInfiniteQuery();

return (
 <InfinityList
   data={data}
   hasMore={hasNextPage}
   isFetching={isFetchingNextPage}
   onFetchMore={fetchNextPage}
   renderItem={(item, index) => <PostItem key={index} item={item} />}
   />
 )
}
```

