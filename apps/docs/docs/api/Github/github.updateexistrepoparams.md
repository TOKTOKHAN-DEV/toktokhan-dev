---
sidebar_class_name : hidden
id: github.updateexistrepoparams
title: UpdateExistRepoParams
sidebar_label: UpdateExistRepoParams
slug: /github.updateexistrepoparams
---





## Signature

```typescript
interface UpdateExistRepoParams extends CreateNewCommitParams 
```
**Extends:** [CreateNewCommitParams](./github.createnewcommitparams)

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

[baseBranchName?](./github.updateexistrepoparams.basebranchname)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 기본 브랜치 이름입니다. branchName이 현재 레포지토리에 없을경우 새로 생성하기 위해 사용됩니다. 기본값은 'main'입니다.


</td></tr>
<tr><td>

[owner?](./github.updateexistrepoparams.owner)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 레포지토리의 소유자입니다.


</td></tr>
<tr><td>

[repo?](./github.updateexistrepoparams.repo)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 레포지토리의 이름입니다.


</td></tr>
</tbody></table>
