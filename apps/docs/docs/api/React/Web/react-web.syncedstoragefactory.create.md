---
sidebar_class_name : hidden
id: react-web.syncedstoragefactory.create
title: SyncedStorageFactory.create
sidebar_label: SyncedStorageFactory.create
slug: /react-web.syncedstoragefactory.create
---





스토리지를 생성합니다.

## Signature

```typescript
static create: <Data>(key: string, store: Storage | null) => {
    storage: SyncedStorage<Data> | null;
    connector: ReactSyncConnector<Data>;
  };
```
