---
'@toktokhan-dev/universal': patch
---

new function: create-s3-upload-flow

### create-s3-upload-flow

s3 업로드를 위한 flow 를 생성하는 함수 입니다.

주어진 prepareUpload 와 uploadFileToS3 함수를 연속 실행하는 함수를 반환합니다.

```ts
const { uploadFile, uploadFiles } = createUploadFlow({
  prepareUpload: async ({ name }: { name: string }) => {
    return {
      name: name,
      type: 'image',
    }
  },
  uploadFileToS3: async ({ name, type }) => {
    return { name, type, imgUrl: 'https://example.com' }
  },
})
const result = await uploadFile({ name: 'example' })
// { name: "example", type: "image", imgUrl: "https://example.com" }

const results = await uploadFiles([{ name: 'example' }, { name: 'example2' }])
// { fulfilled: [{ name: "example", type: "image", imgUrl: "https://example.com" } , ...], rejected: [] }
```
