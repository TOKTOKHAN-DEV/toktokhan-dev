---
id: cli.configtype
title: ConfigType
sidebar_label: ConfigType
slug: /cli.configtype
---





설정 객체의 유형을 설명하는 타입입니다.

## Signature

```typescript
type ConfigType<Config> = { [key in keyof Config]?: {
  name: key;
  alias?: string;
  type?: NonNullable<Config[key]> extends string ? 'string' : NonNullable<Config[key]> extends boolean ? 'boolean' : NonNullable<Config[key]> extends number ? 'number' : NonNullable<Config[key]> extends string[] ? 'string[]' : NonNullable<Config[key]> extends boolean[] ? 'boolean[]' : NonNullable<Config[key]> extends number[] ? 'number[]' : NonNullable<Config[key]> extends any[][] ? 'array[]' : NonNullable<Config[key]> extends Record<any, any>[] ? 'object[]' : NonNullable<Config[key]> extends Record<any, any> ? 'object' : 'any';
  description?: string;
} };
```
