---
'@toktokhan-dev/react-web': patch
---

add sycned-cookie

모듈 `SyncedCookie` 가 추가되었습니다. 내부적으로 react-cookie 를 사용하고 있으며
기존 `SyncedStorage` 와 동일하게 `useWebStorage` 와 함께 사용 가능합니다.

`SyncedCookie` 가 추가 됨에 따라 `SyncedStorageFactory` 에서 `createCookie` 메소드가 추가되었습니다.

```ts
const { connector: testConnector, storage: testStorage } =
  SyncedStorageFactor.createCookie<string>('test')

testStorage.set((prev) => prev + '!')

// Some Component
const test = useWebStorage(testConnector)
```
