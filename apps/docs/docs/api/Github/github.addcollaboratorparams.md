---
sidebar_class_name : hidden
id: github.addcollaboratorparams
title: AddCollaboratorParams
sidebar_label: AddCollaboratorParams
slug: /github.addcollaboratorparams
---





## Signature

```typescript
interface AddCollaboratorParams extends Omit<OctokitParameterType<Octokit['rest']['repos']['addCollaborator']>, 'owner' | 'repo' | 'permission'> 
```
**Extends:** Omit&lt;[OctokitParameterType](./github.octokitparametertype)&lt;Octokit['rest']['repos']['addCollaborator']&gt;, 'owner' \| 'repo' \| 'permission'&gt;

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

[owner?](./github.addcollaboratorparams.owner)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 레포지토리의 소유자입니다.


</td></tr>
<tr><td>

[permission?](./github.addcollaboratorparams.permission)


</td><td>


</td><td>

'pull' \| 'triage' \| 'push' \| 'maintain' \| 'admin'


</td><td>

_(Optional)_ 팀원에게 부여할 권한입니다. 기본값은 'push'입니다.


</td></tr>
<tr><td>

[repo?](./github.addcollaboratorparams.repo)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 레포지토리의 이름입니다.


</td></tr>
<tr><td>

[username](./github.addcollaboratorparams.username)


</td><td>


</td><td>

string


</td><td>

추가할 팀원의 사용자 이름입니다.


</td></tr>
</tbody></table>
