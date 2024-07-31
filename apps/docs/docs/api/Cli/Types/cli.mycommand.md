---
id: cli.mycommand
title: MyCommand
sidebar_label: MyCommand
slug: /cli.mycommand
---





사용자 정의 명령어를 나타내는 인터페이스입니다.

## Signature

```typescript
interface MyCommand<Config = any, Name extends string = string> 
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

[cliOptions?](./cli.mycommand.clioptions)


</td><td>


</td><td>

[ConfigType](./cli.configtype)&lt;Config&gt;[keyof Config][]


</td><td>

_(Optional)_ 명령어의 CLI 옵션 목록입니다.


</td></tr>
<tr><td>

[default](./cli.mycommand.default)


</td><td>


</td><td>

Partial&lt;Config&gt;


</td><td>

명령어의 기본 구성입니다.


</td></tr>
<tr><td>

[description](./cli.mycommand.description)


</td><td>


</td><td>

string


</td><td>

명령어의 설명입니다.


</td></tr>
<tr><td>

[name](./cli.mycommand.name)


</td><td>


</td><td>

Name


</td><td>

명령어의 이름입니다.


</td></tr>
<tr><td>

[run](./cli.mycommand.run)


</td><td>


</td><td>

(config: Config) =&gt; void


</td><td>

명령어를 실행하는 함수입니다.


</td></tr>
</tbody></table>
