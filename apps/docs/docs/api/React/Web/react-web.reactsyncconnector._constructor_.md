---
sidebar_class_name : hidden
id: react-web.reactsyncconnector._constructor_
title: ReactSyncConnector.(constructor)
sidebar_label: ReactSyncConnector.(constructor)
slug: /react-web.reactsyncconnector._constructor_
---





ReactSyncConnector 인스턴스를 생성합니다. Storage 모듈에 emitChange 함수를 연결합니다.

## Signature

```typescript
constructor(synced: ReactSynced<Data> | null, serverSynced?: Data);
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

synced


</td><td>

[ReactSynced](./react-web.reactsynced)&lt;Data&gt; \| null


</td><td>

ReactSynced 인터페이스를 구현한 객체입니다.


</td></tr>
<tr><td>

serverSynced


</td><td>

Data


</td><td>

_(Optional)_ 사용자가 제공하는 서버 초기값입니다.


</td></tr>
</tbody></table>

