---
sidebar_class_name : hidden
id: universal.creates3uploadflowreturn
title: CreateS3UploadFlowReturn
sidebar_label: CreateS3UploadFlowReturn
slug: /universal.creates3uploadflowreturn
---





## Signature

```typescript
interface CreateS3UploadFlowReturn<Input, Result> 
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

[uploadFile](./universal.creates3uploadflowreturn.uploadfile)


</td><td>


</td><td>

(input: Input) =&gt; Promise&lt;Result&gt;


</td><td>

단일 파일을 업로드합니다.


</td></tr>
<tr><td>

[uploadFiles](./universal.creates3uploadflowreturn.uploadfiles)


</td><td>


</td><td>

(input: Input[]) =&gt; Promise&lt;\{ fulfilled: Result[]; rejected: PromiseRejectedResult[]; \}&gt;


</td><td>

다수의 파일을 업로드합니다.


</td></tr>
</tbody></table>

