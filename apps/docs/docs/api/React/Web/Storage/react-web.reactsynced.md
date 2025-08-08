---
id: react-web.reactsynced
title: ReactSynced
sidebar_label: ReactSynced
slug: /react-web.reactsynced
---





데이터를 동기화하는 ReactSynced 클래스입니다. 데이터가 업데이트될 때 리스너 함수를 호출합니다.

## Signature

```typescript
declare class ReactSynced<T> 
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

[connect](./react-web.reactsynced.connect)


</td><td>


</td><td>

(listener: () =&gt; void) =&gt; void


</td><td>

데이터가 업데이트될 때 호출될 리스너 함수를 연결합니다.


</td></tr>
<tr><td>

[data](./react-web.reactsynced.data)


</td><td>


</td><td>

T \| null


</td><td>

동기화된 데이터를 가져옵니다.


</td></tr>
<tr><td>

[listener](./react-web.reactsynced.listener)


</td><td>


</td><td>

(() =&gt; void) \| null


</td><td>

리스너 함수입니다.


</td></tr>
<tr><td>

[unConnect](./react-web.reactsynced.unconnect)


</td><td>


</td><td>

() =&gt; void


</td><td>

리스너 함수를 연결 해제합니다.


</td></tr>
</tbody></table>

