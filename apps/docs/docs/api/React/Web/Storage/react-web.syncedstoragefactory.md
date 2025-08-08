---
id: react-web.syncedstoragefactory
title: SyncedStorageFactory
sidebar_label: SyncedStorageFactory
slug: /react-web.syncedstoragefactory
---





동기화된 스토리지를 생성하는 팩토리 역할을 합니다. 해당 클래스의 각 method 는 [`ReactSyncConnector`](./react-web.reactsyncconnector)와 [`SyncedStorage`](./react-web.syncedstorage)를 동시에 생성해줍니다.

## Signature

```typescript
declare class SyncedStorageFactory 
```

## Example


```ts
type TokenType = {
 access: string
 refresh: string
}
const { storage, connector } = SyncedStorageFactory.createLocal<TokenType>('token')

storage.set({ access: 'access', refresh: 'refresh' })

const token = useWebStorage(connector)
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

[create](./react-web.syncedstoragefactory.create)


</td><td>

`static`


</td><td>

&lt;Data&gt;(key: string, store: Storage \| null) =&gt; \{ storage: [SyncedStorage](./react-web.syncedstorage)&lt;Data&gt; \| null; connector: [ReactSyncConnector](./react-web.reactsyncconnector)&lt;Data&gt;; \}


</td><td>

스토리지를 생성합니다.


</td></tr>
<tr><td>

[createCookie](./react-web.syncedstoragefactory.createcookie)


</td><td>

`static`


</td><td>

&lt;Data&gt;(key: string, options?: [CookieOptions](./react-web.cookieoptions)) =&gt; \{ storage: [SyncedCookie](./react-web.syncedcookie)&lt;Data&gt;; connector: [ReactSyncConnector](./react-web.reactsyncconnector)&lt;Data&gt;; \}


</td><td>

쿠키를 생성합니다.


</td></tr>
<tr><td>

[createLocal](./react-web.syncedstoragefactory.createlocal)


</td><td>

`static`


</td><td>

&lt;Data&gt;(key: string) =&gt; \{ storage: [SyncedStorage](./react-web.syncedstorage)&lt;Data&gt; \| null; connector: [ReactSyncConnector](./react-web.reactsyncconnector)&lt;Data&gt;; \}


</td><td>

로컬 스토리지를 생성합니다.


</td></tr>
<tr><td>

[createSession](./react-web.syncedstoragefactory.createsession)


</td><td>

`static`


</td><td>

&lt;Data&gt;(key: string) =&gt; \{ storage: [SyncedStorage](./react-web.syncedstorage)&lt;Data&gt; \| null; connector: [ReactSyncConnector](./react-web.reactsyncconnector)&lt;Data&gt;; \}


</td><td>

세션 스토리지를 생성합니다.


</td></tr>
</tbody></table>

