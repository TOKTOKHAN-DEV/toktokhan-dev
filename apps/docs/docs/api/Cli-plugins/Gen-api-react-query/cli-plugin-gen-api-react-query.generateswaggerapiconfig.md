---
sidebar_class_name : hidden
id: cli-plugin-gen-api-react-query.generateswaggerapiconfig
title: GenerateSwaggerApiConfig
sidebar_label: GenerateSwaggerApiConfig
slug: /cli-plugin-gen-api-react-query.generateswaggerapiconfig
---





## Signature

```typescript
type GenerateSwaggerApiConfig = SwaggerSchemaOption & {
  output: string;
  includeReactQuery: boolean;
  includeReactSuspenseQuery: boolean;
  instancePath: string;
  httpClientType: 'axios' | 'fetch';
  paginationSets: PaginationConfig[];
};
```
## References
 [PaginationConfig](./cli-plugin-gen-api-react-query.paginationconfig)

