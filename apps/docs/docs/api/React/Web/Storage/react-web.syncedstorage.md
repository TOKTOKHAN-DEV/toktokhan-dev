---
id: react-web.syncedstorage
title: SyncedStorage
sidebar_label: SyncedStorage
slug: /react-web.syncedstorage
---





데이터를 동기화하는 SyncedStorage 클래스입니다. 데이터가 업데이트될 때 리스너 함수를 호출합니다. [`ReactSyncConnector`](./react-web.reactsyncconnector) 와 연결하여 사용합니다.

## Signature

```typescript
declare class SyncedStorage<Data> extends ReactSynced<Data> 
```
**Extends:** [ReactSynced](./react-web.reactsynced)&lt;Data&gt;

## Example


```ts
const textStorage = new SyncedStorage<string>("text", localStorage)
const textConnector = new ReactSyncConnector(textStorage)

textStorage.set("Hello, World!")
textStorage.set((prev) => prev + "!")

textStorage.get() // "Hello, World!!"
textStorage.remove()

textStorage.get() // null
```

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)(key, storage)](./react-web.syncedstorage._constructor_)


</td><td>


</td><td>

SyncedStorage 인스턴스를 생성합니다. 데이터를 저장할 키와 Storage 객체를 받습니다.

생성될때, storage 이벤트가 등록되며 다른 브라우저에서의 change event를 감지하여, 최신값을 가져옵니다.


</td></tr>
</tbody></table>

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

[get](./react-web.syncedstorage.get)


</td><td>


</td><td>

() =&gt; Data \| null


</td><td>

Storage에 저장된 json 데이터를 parse 한 후 가져옵니다.


</td></tr>
<tr><td>

[key](./react-web.syncedstorage.key)


</td><td>


</td><td>

string


</td><td>


</td></tr>
<tr><td>

[remove](./react-web.syncedstorage.remove)


</td><td>


</td><td>

() =&gt; void


</td><td>

Storage에 저장된 데이터를 삭제합니다.


</td></tr>
<tr><td>

[set](./react-web.syncedstorage.set)


</td><td>


</td><td>

(data: DataOrFn&lt;Data \| null&gt;) =&gt; void


</td><td>

Storage에 데이터를 저장합니다. 저장할 데이터 혹은 함수를 받아서 데이터를 저장합니다.


</td></tr>
</tbody></table>

