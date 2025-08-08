---
id: react-web.syncedcookie
title: SyncedCookie
sidebar_label: SyncedCookie
slug: /react-web.syncedcookie
---





데이터를 쿠키에 동기화하는 SyncedCookie 클래스입니다. 데이터가 업데이트될 때 리스너 함수를 호출합니다. [`ReactSyncConnector`](./react-web.reactsyncconnector)와 연결하여 사용합니다.

## Signature

```typescript
declare class SyncedCookie<Data> extends ReactSynced<Data> 
```
**Extends:** [ReactSynced](./react-web.reactsynced)&lt;Data&gt;

## Example


```ts
const cookieStorage = new SyncedCookie<string>("cookie-key", { path: '/' })
const cookieConnector = new ReactSyncConnector(cookieStorage)

cookieStorage.set("Hello, Cookie!")
cookieStorage.set((prev) => prev + "!")

cookieStorage.get() // "Hello, Cookie!!"
cookieStorage.remove()

cookieStorage.get() // null
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

[(constructor)(key, options)](./react-web.syncedcookie._constructor_)


</td><td>


</td><td>

SyncedCookie 인스턴스를 생성합니다. 데이터를 저장할 키와 쿠키 옵션을 받습니다.


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

[defaultOptions](./react-web.syncedcookie.defaultoptions)


</td><td>


</td><td>

[CookieOptions](./react-web.cookieoptions)


</td><td>


</td></tr>
<tr><td>

[get](./react-web.syncedcookie.get)


</td><td>


</td><td>

() =&gt; Data \| null


</td><td>

쿠키에서 데이터를 가져옵니다. 저장된 json 데이터를 parse 한 후 가져옵니다.


</td></tr>
<tr><td>

[key](./react-web.syncedcookie.key)


</td><td>


</td><td>

string


</td><td>


</td></tr>
<tr><td>

[remove](./react-web.syncedcookie.remove)


</td><td>


</td><td>

(options?: [CookieOptions](./react-web.cookieoptions)) =&gt; void


</td><td>

쿠키에 저장된 데이터를 삭제합니다.


</td></tr>
<tr><td>

[set](./react-web.syncedcookie.set)


</td><td>


</td><td>

(data: DataOrFn&lt;Data \| null&gt;, options?: [CookieOptions](./react-web.cookieoptions)) =&gt; void


</td><td>

쿠키에 데이터를 저장합니다. 저장할 데이터 혹은 함수를 받아서 데이터를 저장합니다.


</td></tr>
<tr><td>

[storage](./react-web.syncedcookie.storage)


</td><td>


</td><td>

any


</td><td>


</td></tr>
</tbody></table>

