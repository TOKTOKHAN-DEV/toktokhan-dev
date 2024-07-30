---
sidebar_class_name : hidden
id: universal.creates3uploadflowreturn.uploadfiles
title: CreateS3UploadFlowReturn.uploadFiles
sidebar_label: CreateS3UploadFlowReturn.uploadFiles
slug: /universal.creates3uploadflowreturn.uploadfiles
---





다수의 파일을 업로드합니다.

## Signature

```typescript
uploadFiles: (input: Input[]) => Promise<{
    fulfilled: Result[];
    rejected: PromiseRejectedResult[];
  }>;
```
