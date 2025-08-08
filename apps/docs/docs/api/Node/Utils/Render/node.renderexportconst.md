---
id: node.renderexportconst
title: RenderExportConst()
sidebar_label: RenderExportConst()
slug: /node.renderexportconst
---





지정된 변수 이름과 데이터를 사용하여 내보낼 상수를 렌더링합니다.

## Signature

```typescript
renderExportConst: (varName: string, data: string) => string
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

varName


</td><td>

string


</td><td>

상수의 변수 이름입니다.


</td></tr>
<tr><td>

data


</td><td>

string


</td><td>

상수의 데이터입니다.


</td></tr>
</tbody></table>

## Returns

string

렌더링된 상수를 반환합니다.

## Exceptions

\{Error\} 대상 템플릿을 찾을 수 없을 때 발생합니다.

## Example


```typescript
// 내보낼 상수를 렌더링하는 예시
const renderedConst = renderExportConst('myConst', 'someData');
```

