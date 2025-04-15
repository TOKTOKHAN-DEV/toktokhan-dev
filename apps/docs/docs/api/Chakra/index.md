---
id: chakra
title: Chakra
sidebar_label: '@toktokhan-dev/chakra'
slug: /chakra
---

[ChakraUI](https://v2.chakra-ui.com/)로 구성되어있는 컴포넌트 패키지입니다.

## Component

<table>
<thead>
<tr>
<th>Component</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>

[InfinityContent(\{ children, hasMore, isFetching, onFetchMore, observerOption, styles, spinner\})](./chakra.infinitycontent)

</td>

<td>

무한 스크롤을 구현할 수 있는 컴포넌트입니다. 자식에 랜더링하고 싶은 컴포넌트(리스트 컴포넌트)를 받아 랜더링합니다. 유저의 화면이 스크롤 될때 observer 가 보고 있는 요소가 화면에 보이면 `onFetchMore` 함수를 호출합니다.

</td></tr>

<tr><td>

[InfinityList(\{ data, renderItem, hasMore, isFetching, onFetchMore, observerOption, empty, spinner, styles\})](./chakra.infinitylist)

</td>

<td>

무한 스크롤을 구현할 수 있는 컴포넌트입니다. data 와 renderItem 을 직접 받아 랜더링합니다.스크롤이 끝에 도달하여 observer 가 보고 있는 요소가 화면에 보이면 `onFetchMore` 함수를 호출합니다.

</td></tr>
</tbody>
</table>
