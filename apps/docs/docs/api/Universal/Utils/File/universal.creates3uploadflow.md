---
id: universal.creates3uploadflow
title: CreateS3UploadFlow()
sidebar_label: CreateS3UploadFlow()
slug: /universal.creates3uploadflow
---





createUploadFlow 함수는 S3 파일 업로드를 위한 플로우를 생성합니다.

## Signature

```typescript
createS3UploadFlow: <Input, S3Config, Result>(config: {
  prepareUpload: (input: Input) => Promise<S3Config>;
  uploadFileToS3: (s3Config: S3Config) => Promise<Result>;
}) => {
  uploadFile: (input: Input) => Promise<Result>;
  uploadFiles: (input: Input[]) => Promise<{
    fulfilled: Result[];
    rejected: PromiseRejectedResult[];
  }>;
}
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

\{ prepareUpload: (input: Input) =&gt; Promise&lt;S3Config&gt;; uploadFileToS3: (s3Config: S3Config) =&gt; Promise&lt;Result&gt;; \}


</td><td>


</td></tr>
</tbody></table>
## Returns

\{ uploadFile: (input: Input) =&gt; Promise&lt;Result&gt;; uploadFiles: (input: Input[]) =&gt; Promise&lt;{ fulfilled: Result[]; rejected: PromiseRejectedResult[]; \}&gt;; }

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

