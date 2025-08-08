---
id: cli.definecommand
title: DefineCommand()
sidebar_label: DefineCommand()
slug: /cli.definecommand
---





명령어를 정의하는 함수입니다.

## Signature

```typescript
defineCommand: <Name extends string, Config extends Record<string, any>>(config: MyCommand<Config, Name>) => MyCommand<Config, Name>
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

config


</td><td>

[MyCommand](./cli.mycommand)&lt;Config, Name&gt;


</td><td>

명령어의 설정입니다.


</td></tr>
</tbody></table>

## Returns

[MyCommand](./cli.mycommand)&lt;Config, Name&gt;

정의된 명령어 설정을 반환합니다.

