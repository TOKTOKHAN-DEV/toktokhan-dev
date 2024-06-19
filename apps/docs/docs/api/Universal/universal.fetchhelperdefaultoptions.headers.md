---
sidebar_class_name : hidden
id: universal.fetchhelperdefaultoptions.headers
title: FetchHelperDefaultOptions.headers
sidebar_label: FetchHelperDefaultOptions.headers
slug: /universal.fetchhelperdefaultoptions.headers
---





fetch의 기본 헤더입니다. 만약 fetch의 두 번째 인자가 headers 속성을 가지고 있지 않은 경우 사용됩니다. 제공되고 fetch를 호출할 때 headers도 제공된 경우, 헤더가 병합됩니다. 헤더의 우선순위는 requestInit.headers &gt; defaultOptions.headers입니다. 중복된 헤더는 덮어쓰기 됩니다.

## Signature

```typescript
headers?: HeadersInit;
```
