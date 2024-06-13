---
id: cli.rootconfig
title: RootConfig
sidebar_label: RootConfig
slug: /cli.rootconfig
---





루트 구성을 정의하는 타입입니다.

## Signature

```typescript
type RootConfig<P extends {
  plugins: MyCommand[];
} = {
  plugins: MyCommand[];
}> = {
  basePath?: string;
  plugins?: MyCommand[];
} & { [key in P['plugins'][number]['name']]?: Extract<P['plugins'][number], {
  name: key;
}>['default'] };
```
## References
 [MyCommand](./cli.mycommand)

