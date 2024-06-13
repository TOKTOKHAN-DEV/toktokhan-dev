---
id: react-web.reactsyncconnector
title: ReactSyncConnector
sidebar_label: ReactSyncConnector
slug: /react-web.reactsyncconnector
---





알림함수를 관리하고,[`SyncedStorage`](./react-web.syncedstorage) 와 [`useSyncWebStorage`](./react-web.usesyncwebstorage) 를 연결 하는 모듈입니다.

## Signature

```typescript
declare class ReactSyncConnector<Data> 
```

## Remarks

[`useSyncWebStorage`](./react-web.usesyncwebstorage)로 부터 리랜더링을 촉발시키는 알림함수 를 받아 관리하고, [`SyncedStorage`](./react-web.syncedstorage) 모듈에 알림 함수를 넘겨주어 [`useSyncWebStorage`](./react-web.usesyncwebstorage)와 연결시켜주는 역할을 합니다.

## Example


```ts
const textStorage = new SyncedStorage<string>("text", localStorage)
const textStorageConnector = new ReactSyncConnector(textStorage)

// Some Action
textStorage.set("Hello, World!")

// Some component
const text = useSyncWebStorage(textStorageConnector) // Wrapping Hook with useSyncWebStorage
console.log(text) // "Hello, World!"
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

[(constructor)(synced)](./react-web.reactsyncconnector._constructor_)


</td><td>


</td><td>

ReactSyncConnector 인스턴스를 생성합니다. Storage 모듈에 emitChange 함수를 연결합니다.


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

[getServerSnapShot](./react-web.reactsyncconnector.getserversnapshot)


</td><td>


</td><td>

() =&gt; null


</td><td>

서버 데이터의 스냅샷을 반환합니다.


</td></tr>
<tr><td>

[getSnapshot](./react-web.reactsyncconnector.getsnapshot)


</td><td>


</td><td>

() =&gt; NonNullable&lt;Data&gt; \| null


</td><td>

알림함수가 실행되어, 리랜더링 될 시 조회할 데이터를 넘겨줍니다.


</td></tr>
<tr><td>

[listeners](./react-web.reactsyncconnector.listeners)


</td><td>


</td><td>

Array&lt;() =&gt; void&gt;


</td><td>

알림함수를 저장하는 배열입니다.


</td></tr>
<tr><td>

[subscribe](./react-web.reactsyncconnector.subscribe)


</td><td>


</td><td>

(listener: () =&gt; void) =&gt; () =&gt; void


</td><td>

[`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore)에서 알림함수를 받고, 저장해둡니다.


</td></tr>
</tbody></table>
