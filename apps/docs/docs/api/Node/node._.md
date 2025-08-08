---
sidebar_class_name : hidden
id: node._
title: $()
sidebar_label: $()
slug: /node._
---





execa를 사용하여 주어진 명령어를 실행합니다.

## Signature

```typescript
declare function $(cmd: string, args: string[], options?: SpawnSyncOptionsWithBufferEncoding): ChildProcess;
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

cmd


</td><td>

string


</td><td>

실행할 명령어입니다.


</td></tr>
<tr><td>

args


</td><td>

string[]


</td><td>

명령어에 전달할 인수들입니다.


</td></tr>
<tr><td>

options


</td><td>

SpawnSyncOptionsWithBufferEncoding


</td><td>

_(Optional)_ execa 옵션입니다.


</td></tr>
</tbody></table>

## Returns

ChildProcess

execaChildProcess 객체를 반환합니다.

## Example


```typescript
// execa를 사용하여 명령어를 실행하는 예시
const result = $(cmd, args, options);
```

