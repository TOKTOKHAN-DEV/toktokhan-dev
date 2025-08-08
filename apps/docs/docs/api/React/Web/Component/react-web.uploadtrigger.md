---
id: react-web.uploadtrigger
title: UploadTrigger()
sidebar_label: UploadTrigger()
slug: /react-web.uploadtrigger
---





웹에서 파일 업로드를 트리거 하는 컴포넌트 입니다.

자식 element 에 by 로 지정한 이벤트를 트리거 하면 display none 처리 되어있는 input[type="file"] 클릭되어 파일 선택 창이 열립니다. UploadTrigger 의 props 는 숨겨져 있는 input 의 prop 으로 전달되기때문에, UploadTrigger 의 onChange prop 으로 선택된 파일에 접근이 가능합니다.

## Signature

```typescript
UploadTrigger: ({
  children,
  by,
  ...props
}: UploadTriggerProps) => react_jsx_runtime.JSX.Element
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

\{ children, by, ...props\}


</td><td>

[UploadTriggerProps](./react-web.uploadtriggerprops)


</td><td>


</td></tr>
</tbody></table>

## Returns

react_jsx_runtime.JSX.Element

## Example


```tsx
<UploadTrigger by="onClick" onChange={(e) => console.log(e.target.files?.[0]) }>
  <button>Upload</button>
</UploadTrigger>
```

