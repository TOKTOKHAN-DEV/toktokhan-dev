---
id: universal.fetchhelper
title: FetchHelper()
sidebar_label: FetchHelper()
slug: /universal.fetchhelper
---





고차 함수로 fetch를 확장하거나, interceptor, baseUrl, headers 을 옵션으로 넣어 사용할 수 있습니다.

## Signature

```typescript
fetchHelper: (defaultOptions?: FetchHelperDefaultOptions) => (input: string | URL | Request, init?: RequestInit | undefined) => Promise<Response>
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

(input: string \| URL \| Request, init?: RequestInit \| undefined) =&gt; Promise&lt;Response&gt;

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

