---
id: node.withloading
title: WithLoading()
sidebar_label: WithLoading()
slug: /node.withloading
---





로딩 상태를 보여주면서 비동기 작업을 실행합니다.

## Signature

```typescript
declare function withLoading<T, E = any>(title: string, description: string, callback: (spinner: Ora) => T, options?: {
  onError: (err: E) => void;
}): Promise<T | undefined>;
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

title


</td><td>

string


</td><td>

로딩 상태 메시지의 제목입니다.


</td></tr>
<tr><td>

description


</td><td>

string


</td><td>

로딩 상태 메시지의 설명입니다.


</td></tr>
<tr><td>

callback


</td><td>

(spinner: Ora) =&gt; T


</td><td>

비동기 작업을 수행하는 함수입니다. 로딩 상태를 갱신하기 위해 `spinner` 객체를 전달받습니다.


</td></tr>
<tr><td>

options


</td><td>

\{ onError: (err: E) =&gt; void; \}


</td><td>

_(Optional)_ 옵션 객체로, 오류 발생 시 처리 방법을 지정합니다.


</td></tr>
</tbody></table>
## Returns

Promise&lt;T \| undefined&gt;

비동기 작업의 결과를 반환합니다.

## Example


```typescript
// 로딩 상태를 보여주면서 비동기 작업을 실행하는 예시
const result = await withLoading(
  'Loading',
  'Some description',
  async (spinner) => {
    // 비동기 작업 수행
  },
  {
    onError: (err) => {
      // 오류 처리
    },
  }
);
```

