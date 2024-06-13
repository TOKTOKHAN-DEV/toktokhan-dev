---
sidebar_class_name : hidden
id: universal.relayparams.getnextparams
title: RelayParams.getNextParams
sidebar_label: RelayParams.getNextParams
slug: /universal.relayparams.getnextparams
---





다음 데이터를 가져오기 위한 파라미터를 반환하는 함수입니다. 이전 마지막으로 여청한 getNext 에서 받은 데이터를 이용하여 다음 데이터를 가져오기 위한 파라미터를 반환합니다. null 을 반환하면, 데이터를 가져오는 것을 중지합니다.

## Signature

```typescript
getNextParams: (last: Data) => NextParam | null;
```
