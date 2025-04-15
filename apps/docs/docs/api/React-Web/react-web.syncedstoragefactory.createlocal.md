---
sidebar_class_name : hidden
id: react-web.syncedstoragefactory.createlocal
title: SyncedStorageFactory.createLocal
sidebar_label: SyncedStorageFactory.createLocal
slug: /react-web.syncedstoragefactory.createlocal
---





로컬 스토리지를 생성합니다.

## Signature

```typescript
static createLocal: <Data>(key: string) => {
    storage: SyncedStorage<Data> | null;
    connector: ReactSyncConnector<Data>;
  };
```
