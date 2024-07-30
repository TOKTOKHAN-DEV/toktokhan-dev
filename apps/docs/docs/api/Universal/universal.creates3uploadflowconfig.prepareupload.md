---
sidebar_class_name : hidden
id: universal.creates3uploadflowconfig.prepareupload
title: CreateS3UploadFlowConfig.prepareUpload
sidebar_label: CreateS3UploadFlowConfig.prepareUpload
slug: /universal.creates3uploadflowconfig.prepareupload
---





파일을 업로드하기 전에 필요한 정보를 준비합니다. - 주로 presigned url 을 생성하고, 필요한 정보를 준비합니다. - 해당 함수의 parameter type 은 이후 return 되는 uploadFile 함수의 input type 이 됩니다. - 해당 함수의 return type 은 `config.uploadFileToS3` 함수의 input type 이 됩니다.

## Signature

```typescript
prepareUpload: (input: Input) => Promise<S3Config>;
```
