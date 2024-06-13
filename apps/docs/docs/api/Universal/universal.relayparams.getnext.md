---
sidebar_class_name : hidden
id: universal.relayparams.getnext
title: RelayParams.getNext
sidebar_label: RelayParams.getNext
slug: /universal.relayparams.getnext
---





다음 데이터를 가져오는 함수입니다. getNextParams 으로 부터 받은 파라미터를 이용하여 데이터를 가져옵니다. getNextParams 가 null 을 반환하면 getNext 는 호출되지 않습니다.

## Signature

```typescript
getNext: (nextParam: NextParam) => Promise<Data>;
```
