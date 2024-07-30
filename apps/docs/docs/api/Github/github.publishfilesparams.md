---
sidebar_class_name : hidden
id: github.publishfilesparams
title: PublishFilesParams
sidebar_label: PublishFilesParams
slug: /github.publishfilesparams
---





`PublishFilesParams`는 새로운 레포지토리에 파일을 게시하기 위한 매개변수 타입입니다.

## Signature

```typescript
interface PublishFilesParams 
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

[baseBranchName?](./github.publishfilesparams.basebranchname)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 기준이 되는 브랜치 이름입니다. 기본값은 'main'입니다.


</td></tr>
<tr><td>

[branchName?](./github.publishfilesparams.branchname)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 브랜치 이름입니다. 기본값은 'main'입니다.


</td></tr>
<tr><td>

[commitMsg](./github.publishfilesparams.commitmsg)


</td><td>


</td><td>

string


</td><td>

커밋 메시지입니다.


</td></tr>
<tr><td>

[fileContents](./github.publishfilesparams.filecontents)


</td><td>


</td><td>

string[]


</td><td>

파일 내용의 배열입니다.


</td></tr>
<tr><td>

[relativePaths](./github.publishfilesparams.relativepaths)


</td><td>


</td><td>

string[]


</td><td>

파일 경로의 배열입니다.


</td></tr>
</tbody></table>
