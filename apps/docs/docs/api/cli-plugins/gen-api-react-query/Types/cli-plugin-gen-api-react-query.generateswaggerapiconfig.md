---
id: cli-plugin-gen-api-react-query.generateswaggerapiconfig
title: GenerateSwaggerApiConfig
sidebar_label: GenerateSwaggerApiConfig
slug: /cli-plugin-gen-api-react-query.generateswaggerapiconfig
---





## Signature

```typescript
interface GenerateSwaggerApiConfig 
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

[httpClientType](./cli-plugin-gen-api-react-query.generateswaggerapiconfig.httpclienttype)


</td><td>


</td><td>

HttpClientType


</td><td>

http client 타입입니다.


</td></tr>
<tr><td>

[includeReactInfiniteQuery](./cli-plugin-gen-api-react-query.generateswaggerapiconfig.includereactinfinitequery)


</td><td>


</td><td>

boolean


</td><td>

생성되는 코드의 InfiniteQuery 포함 여부 입니다.


</td></tr>
<tr><td>

[includeReactQuery](./cli-plugin-gen-api-react-query.generateswaggerapiconfig.includereactquery)


</td><td>


</td><td>

boolean


</td><td>

생성되는 코드의 React Query 포함 여부 입니다. 해당 옵션이 false 일경우 infiniteQuery 를 포함한 모든 Query 가 생성되지 않습니다.


</td></tr>
<tr><td>

[instancePath](./cli-plugin-gen-api-react-query.generateswaggerapiconfig.instancepath)


</td><td>


</td><td>

string


</td><td>

Api 의 axios 혹은 fetch 요청 instance 주소입니다.


</td></tr>
<tr><td>

[output](./cli-plugin-gen-api-react-query.generateswaggerapiconfig.output)


</td><td>


</td><td>

string


</td><td>

생성될 파일들이 위치할 경로입니다.


</td></tr>
<tr><td>

[paginationSets](./cli-plugin-gen-api-react-query.generateswaggerapiconfig.paginationsets)


</td><td>


</td><td>

[PaginationConfig](./cli-plugin-gen-api-react-query.paginationconfig)[]


</td><td>

infiniteQuery 를 생성할 함수 필터 목록 입니다.


</td></tr>
<tr><td>

[swaggerSchemaUrl](./cli-plugin-gen-api-react-query.generateswaggerapiconfig.swaggerschemaurl)


</td><td>


</td><td>

string


</td><td>

조회할 스웨거의 url 혹은 file(yaml, json) 경로 입니다. 통상적으로 백앤드 개발자에게 공유받은 api-swagger-url 의 '/openapi.json' 경로에 해당합니다.


</td></tr>
</tbody></table>
