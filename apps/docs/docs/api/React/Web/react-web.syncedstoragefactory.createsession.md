---
sidebar_class_name : hidden
id: react-web.syncedstoragefactory.createsession
title: SyncedStorageFactory.createSession
sidebar_label: SyncedStorageFactory.createSession
slug: /react-web.syncedstoragefactory.createsession
---





세션 스토리지를 생성합니다.

## Signature

```typescript
static createSession: <Data>(key: string) => {
    storage: SyncedStorage<Data> | null;
    connector: ReactSyncConnector<Data>;
  };
```
