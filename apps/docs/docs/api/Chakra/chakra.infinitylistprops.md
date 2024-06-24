---
sidebar_class_name : hidden
id: chakra.infinitylistprops
title: InfinityListProps
sidebar_label: InfinityListProps
slug: /chakra.infinitylistprops
---





## Signature

```typescript
interface InfinityListProps<T> 
```

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[data](./chakra.infinitylistprops.data)


</td><td>


</td><td>

T[]


</td><td>

렌더링할 아이템


</td></tr>
<tr><td>

[empty?](./chakra.infinitylistprops.empty)


</td><td>


</td><td>

ReactNode


</td><td>

_(Optional)_ 데이터가 없을 때 보여줄 컴포넌트


</td></tr>
<tr><td>

[hasMore](./chakra.infinitylistprops.hasmore)


</td><td>


</td><td>

boolean


</td><td>

다음 페이지가 있는지 여부


</td></tr>
<tr><td>

[isFetching](./chakra.infinitylistprops.isfetching)


</td><td>


</td><td>

boolean


</td><td>

데이터를 가져오고 있는지 여부


</td></tr>
<tr><td>

[observerOption?](./chakra.infinitylistprops.observeroption)


</td><td>


</td><td>

IntersectionObserverInit


</td><td>

_(Optional)_ IntersectionObserver 옵션


</td></tr>
<tr><td>

[onFetchMore](./chakra.infinitylistprops.onfetchmore)


</td><td>


</td><td>

() =&gt; void


</td><td>

데이터를 가져오는 함수


</td></tr>
<tr><td>

[renderItem](./chakra.infinitylistprops.renderitem)


</td><td>


</td><td>

(\{ item, index \}: \{ item: T; index: number; \}) =&gt; ReactNode \| null


</td><td>


</td></tr>
<tr><td>

[spinner?](./chakra.infinitylistprops.spinner)


</td><td>


</td><td>

ReactNode


</td><td>

_(Optional)_ isFetching 시 보여줄 스피너


</td></tr>
<tr><td>

[styles?](./chakra.infinitylistprops.styles)


</td><td>


</td><td>

\{ container?: StackProps; itemContainer?: BoxProps; bottomFlag?: BoxProps; \}


</td><td>

_(Optional)_ 스타일


</td></tr>
</tbody></table>
