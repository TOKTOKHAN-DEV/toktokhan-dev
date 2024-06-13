---
sidebar_class_name : hidden
id: cli-plugin-gen-api-react-query.paginationconfig
title: PaginationConfig
sidebar_label: PaginationConfig
slug: /cli-plugin-gen-api-react-query.paginationconfig
---





## Signature

```typescript
interface PaginationConfig 
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

[getNextPage?](./cli-plugin-gen-api-react-query.paginationconfig.getnextpage)


</td><td>


</td><td>

string \| [GenerateFn](./cli-plugin-gen-api-react-query.generatefn)


</td><td>

_(Optional)_ InfiniteQuery 의 nextPage 를 구하는 함수를 커스텀하기 위해 사용됩니다.


</td></tr>
<tr><td>

[getNextPageParam?](./cli-plugin-gen-api-react-query.paginationconfig.getnextpageparam)


</td><td>


</td><td>

string \| [GenerateFn](./cli-plugin-gen-api-react-query.generatefn)


</td><td>

_(Optional)_ InfiniteQuery 의 nextPageParam 을 구하는 함수를 커스텀하기 위해 사용됩니다.


</td></tr>
<tr><td>

[initialPageParam?](./cli-plugin-gen-api-react-query.paginationconfig.initialpageparam)


</td><td>


</td><td>

string \| [GenerateFn](./cli-plugin-gen-api-react-query.generatefn)


</td><td>

_(Optional)_ InfiniteQuery 의 initialPage 를 커스텀하기 위해 사용됩니다.


</td></tr>
<tr><td>

[keywords](./cli-plugin-gen-api-react-query.paginationconfig.keywords)


</td><td>


</td><td>

string[]


</td><td>

api 의 queryParams key 에 keywords 가 포함되어 있는 항목만 생성됩니다. 키워드 배열은 AND 연산으로써 사용됩니다.


</td></tr>
<tr><td>

[nextKey](./cli-plugin-gen-api-react-query.paginationconfig.nextkey)


</td><td>


</td><td>

string


</td><td>

InfiniteQuery 의 nextPage 와 nextPageParam 을 구하는 함수를 작성하기 위해 사용됩니다.


</td></tr>
</tbody></table>
