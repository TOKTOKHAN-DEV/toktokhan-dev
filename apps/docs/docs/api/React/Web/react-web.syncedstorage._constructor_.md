---
sidebar_class_name : hidden
id: react-web.syncedstorage._constructor_
title: SyncedStorage.(constructor)
sidebar_label: SyncedStorage.(constructor)
slug: /react-web.syncedstorage._constructor_
---





SyncedStorage 인스턴스를 생성합니다. 데이터를 저장할 키와 Storage 객체를 받습니다.

생성될때, storage 이벤트가 등록되며 다른 브라우저에서의 change event를 감지하여, 최신값을 가져옵니다.

## Signature

```typescript
constructor(key: string, storage: Storage);
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

key


</td><td>

string


</td><td>

데이터를 저장할 키입니다.


</td></tr>
<tr><td>

storage


</td><td>

Storage


</td><td>

데이터를 저장할 Storage 객체입니다.


</td></tr>
</tbody></table>
