---
sidebar_class_name : hidden
id: universal.creates3uploadflowconfig
title: CreateS3UploadFlowConfig
sidebar_label: CreateS3UploadFlowConfig
slug: /universal.creates3uploadflowconfig
---





## Signature

```typescript
interface CreateS3UploadFlowConfig<Input, S3Config, Result> 
```

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[prepareUpload](./universal.creates3uploadflowconfig.prepareupload)


</td><td>


</td><td>

(input: Input) =&gt; Promise&lt;S3Config&gt;


</td><td>

파일을 업로드하기 전에 필요한 정보를 준비합니다. - 주로 presigned url 을 생성하고, 필요한 정보를 준비합니다. - 해당 함수의 parameter type 은 이후 return 되는 uploadFile 함수의 input type 이 됩니다. - 해당 함수의 return type 은 `config.uploadFileToS3` 함수의 input type 이 됩니다.


</td></tr>
<tr><td>

[uploadFileToS3](./universal.creates3uploadflowconfig.uploadfiletos3)


</td><td>


</td><td>

(s3Config: S3Config) =&gt; Promise&lt;Result&gt;


</td><td>

S3에 파일을 업로드합니다. - 주로 s3 에 파일을 업로드합니다. - 해당 함수의 parameter type 은 `config.prepareUpload` 함수의 return type 이 됩니다. - 해당 함수의 return type 은 이후 return 되는 uploadFile 함수의 return type 이 됩니다.


</td></tr>
</tbody></table>
