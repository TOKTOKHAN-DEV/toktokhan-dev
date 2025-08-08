---
id: node.boxlog
title: BoxLog()
sidebar_label: BoxLog()
slug: /node.boxlog
---





box형태의 로그를 출력하는 함수입니다.

## Signature

```typescript
boxLog: (value: string[], options: Options$1) => void
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

value


</td><td>

string[]


</td><td>

box 로그에 추가할 값


</td></tr>
<tr><td>

options


</td><td>

Options$1


</td><td>


</td></tr>
</tbody></table>

## Returns

void

-

## Example


```typescript
// Box 로그를 출력하는 예시
boxLog(['box log 1', 'box log 2'], {title: 'Toktokhan'})
┌ Toktokhan_Dev ┐
│               │
│   box log 1   │
│   box log 2   │
│               │
└───────────────┘
```

