---
id: react-universal.generrorbyserver
title: GenErrorByServer()
sidebar_label: GenErrorByServer()
slug: /react-universal.generrorbyserver
---





서버에서 발생한 오류를 기반으로 에러 메세지 객체를 반환합니다. 외부 백엔드와 협업시에 에러타입을 확인해주세요. api logger에서 사용하고 있으며, 에러 메세지를 통해 toast, alert 등에 적용시킬 수 있습니다.

 Utils/Logger  T - AxiosError 타입의 제네릭 매개변수입니다.

## Signature

```typescript
genErrorByServer: <T extends AxiosError<{
  message: ErrorMessage;
}, any>>(errors: T) => GenErrorByServerType
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

errors


</td><td>

T


</td><td>

AxiosError 객체입니다.


</td></tr>
</tbody></table>

## Returns

[GenErrorByServerType](./react-universal.generrorbyservertype)

서버에서 발생한 오류에 기반한 에러메세지 객체입니다.

