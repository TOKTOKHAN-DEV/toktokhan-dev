---
id: universal.fetchhelper
title: FetchHelper()
sidebar_label: FetchHelper()
slug: /universal.fetchhelper
---





고차 함수로 fetch를 확장하거나, interceptor, baseUrl, headers 을 옵션으로 넣어 사용할 수 있습니다.

## Signature

```typescript
fetchHelper: (defaultOptions?: FetchHelperDefaultOptions) => (...args: Parameters<typeof fetch>) => Promise<Response>
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

defaultOptions


</td><td>

[FetchHelperDefaultOptions](./universal.fetchhelperdefaultoptions)


</td><td>

_(Optional)_ fetchHelper 함수의 옵션입니다.


</td></tr>
</tbody></table>
## Returns

(...args: Parameters&lt;typeof fetch&gt;) =&gt; Promise&lt;Response&gt;

## Example


```ts
export const fetchHelperInterceptors: FetchHelper = (args) =>
 fetchHelper({
   ...args,
   interceptors: {
     request: requestInterceptor,
     response: responseInterceptor,
   },
 })


import { fetchHelperInterceptors } from './fetch-interceptors'

export const fetchExtended = fetchHelperInterceptors({
  baseUrl: https://jsonplaceholder.typicode.com
})

export default fetchExtended

fetchExtended('/todos/1')


```

