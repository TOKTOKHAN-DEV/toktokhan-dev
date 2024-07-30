---
sidebar_class_name : hidden
id: universal.creates3uploadflowconfig.uploadfiletos3
title: CreateS3UploadFlowConfig.uploadFileToS3
sidebar_label: CreateS3UploadFlowConfig.uploadFileToS3
slug: /universal.creates3uploadflowconfig.uploadfiletos3
---





S3에 파일을 업로드합니다. - 주로 s3 에 파일을 업로드합니다. - 해당 함수의 parameter type 은 `config.prepareUpload` 함수의 return type 이 됩니다. - 해당 함수의 return type 은 이후 return 되는 uploadFile 함수의 return type 이 됩니다.

## Signature

```typescript
uploadFileToS3: (s3Config: S3Config) => Promise<Result>;
```
