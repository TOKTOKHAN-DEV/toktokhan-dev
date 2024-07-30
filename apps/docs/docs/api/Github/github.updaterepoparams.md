---
sidebar_class_name : hidden
id: github.updaterepoparams
title: UpdateRepoParams
sidebar_label: UpdateRepoParams
slug: /github.updaterepoparams
---





`UpdateRepoParams`는 기존 레포지토리에 내용을 업데이트하기 위한 매개변수 타입입니다.

## Signature

```typescript
interface UpdateRepoParams 
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

[baseBranchName?](./github.updaterepoparams.basebranchname)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 기본 브랜치 이름입니다. 기본값은 'main'입니다.


</td></tr>
<tr><td>

[branchName?](./github.updaterepoparams.branchname)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 브랜치 이름입니다. 기본값은 'design-token'입니다.


</td></tr>
<tr><td>

[commitMsg](./github.updaterepoparams.commitmsg)


</td><td>


</td><td>

string


</td><td>

커밋 메시지입니다.


</td></tr>
<tr><td>

[content](./github.updaterepoparams.content)


</td><td>


</td><td>

[Obj](./universal.obj)


</td><td>

커밋할 내용입니다.


</td></tr>
<tr><td>

[sourcePath?](./github.updaterepoparams.sourcepath)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 소스 경로입니다. 기본값은 'public/token.json'입니다.


</td></tr>
</tbody></table>
