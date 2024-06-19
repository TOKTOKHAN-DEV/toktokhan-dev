---
sidebar_class_name : hidden
id: universal.fetchhelperdefaultoptions.fetch
title: FetchHelperDefaultOptions.fetch
sidebar_label: FetchHelperDefaultOptions.fetch
slug: /universal.fetchhelperdefaultoptions.fetch
---





fetchHelper 함수에서 사용될 fetch 함수입니다. 제공되지 않으면 전역 스코프의 fetch 함수가 사용됩니다. node-fetch, cross-fetch 등과 같은 어떤 fetch 구현체라도 사용할 수 있습니다. 또한 fetchHelper에 의해 생성된 fetch 함수 또한 여기에서 사용할 수 있습니다.

## Signature

```typescript
fetch?: ReturnType<FetchHelperType>;
```
