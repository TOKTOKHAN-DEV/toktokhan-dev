---
id: react-web.usesyncwebstorage
title: UseSyncWebStorage()
sidebar_label: UseSyncWebStorage()
slug: /react-web.usesyncwebstorage
---





useSyncExternalStore 의 wrapper 입니다. [`ReactSyncConnector`](./react-web.reactsyncconnector)를 통해 외부 스토리지와 동기화를 합니다.

## Signature

```typescript
useSyncWebStorage: <T>(connector: ReactSyncConnector<T>) => NonNullable<T> | null
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

connector


</td><td>

[ReactSyncConnector](./react-web.reactsyncconnector)&lt;T&gt;


</td><td>


</td></tr>
</tbody></table>

## Returns

NonNullable&lt;T&gt; \| null

## Example


```ts
const textStorage = new SyncedStorage<string>("text", localStorage)
const textConnector = new ReactSyncConnector(textStorage)

textStorage.set("Hello, World!")
textStorage.set((prev) => prev + "!")

textStorage.get() // "Hello, World!!"

const text = useSyncWebStorage(textConnector)

console.log(text) // "Hello, World!!"
```

