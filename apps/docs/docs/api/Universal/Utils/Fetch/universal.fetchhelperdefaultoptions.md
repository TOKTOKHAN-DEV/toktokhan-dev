---
id: universal.fetchhelperdefaultoptions
title: FetchHelperDefaultOptions
sidebar_label: FetchHelperDefaultOptions
slug: /universal.fetchhelperdefaultoptions
---





`fetchHelper` 함수의 옵션입니다.

## Signature

```typescript
interface FetchHelperDefaultOptions 
```

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[baseUrl?](./universal.fetchhelperdefaultoptions.baseurl)


</td><td>


</td><td>

string \| URL


</td><td>

_(Optional)_ fetch의 baseURL입니다.


</td></tr>
<tr><td>

[fetch?](./universal.fetchhelperdefaultoptions.fetch)


</td><td>


</td><td>

ReturnType&lt;[FetchHelperType](./universal.fetchhelpertype)&gt;


</td><td>

_(Optional)_ fetchHelper 함수에서 사용될 fetch 함수입니다. 제공되지 않으면 전역 스코프의 fetch 함수가 사용됩니다. node-fetch, cross-fetch 등과 같은 어떤 fetch 구현체라도 사용할 수 있습니다. 또한 fetchHelper에 의해 생성된 fetch 함수 또한 여기에서 사용할 수 있습니다.


</td></tr>
<tr><td>

[headers?](./universal.fetchhelperdefaultoptions.headers)


</td><td>


</td><td>

HeadersInit


</td><td>

_(Optional)_ fetch의 기본 헤더입니다. 만약 fetch의 두 번째 인자가 headers 속성을 가지고 있지 않은 경우 사용됩니다. 제공되고 fetch를 호출할 때 headers도 제공된 경우, 헤더가 병합됩니다. 헤더의 우선순위는 requestInit.headers &gt; defaultOptions.headers입니다. 중복된 헤더는 덮어쓰기 됩니다.


</td></tr>
<tr><td>

[interceptors?](./universal.fetchhelperdefaultoptions.interceptors)


</td><td>


</td><td>

\{ request?: (requestArgs: [FetchArgs](./universal.fetchargs), fetch: NonNullable&lt;[FetchHelperDefaultOptions](./universal.fetchhelperdefaultoptions)['fetch']&gt;) =&gt; Promise&lt;[FetchArgs](./universal.fetchargs)&gt;; response?: (response: Response, requestArgs: [FetchArgs](./universal.fetchargs), fetch: NonNullable&lt;[FetchHelperDefaultOptions](./universal.fetchhelperdefaultoptions)['fetch']&gt;) =&gt; Promise&lt;Response&gt;; \}


</td><td>

_(Optional)_


</td></tr>
</tbody></table>

