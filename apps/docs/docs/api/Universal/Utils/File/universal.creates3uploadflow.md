---
id: universal.creates3uploadflow
title: CreateS3UploadFlow()
sidebar_label: CreateS3UploadFlow()
slug: /universal.creates3uploadflow
---





createUploadFlow 함수는 S3 파일 업로드를 위한 플로우를 생성합니다.

## Signature

```typescript
createS3UploadFlow: <Input, S3Config, Result>(config: CreateS3UploadFlowConfig<Input, S3Config, Result>) => CreateS3UploadFlowReturn<Input, Result>
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

[CreateS3UploadFlowConfig](./universal.creates3uploadflowconfig)&lt;Input, S3Config, Result&gt;


</td><td>


</td></tr>
</tbody></table>
## Returns

[CreateS3UploadFlowReturn](./universal.creates3uploadflowreturn)&lt;Input, Result&gt;

## Example


```ts
const { uploadFile, uploadFiles } = createUploadFlow({
   prepareUpload: async ({name} : {name : string}) => {
   return {
      name: name,
      type: "image",
    }
 },
   uploadFileToS3: async ({ name, type }) => {
    return { name, type, imgUrl: "https://example.com" }
 },
})

const result = await uploadFile({ name: "example" }) // { name: "example", type: "image", imgUrl: "https://example.com" }
const results = await uploadFiles([{ name: "example" }, { name: "example2" }]) // { fulfilled: [{ name: "example", type: "image", imgUrl: "https://example.com" } , ...], rejected: [] }
```

