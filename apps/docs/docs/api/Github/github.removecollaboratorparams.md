---
sidebar_class_name : hidden
id: github.removecollaboratorparams
title: RemoveCollaboratorParams
sidebar_label: RemoveCollaboratorParams
slug: /github.removecollaboratorparams
---





## Signature

```typescript
interface RemoveCollaboratorParams extends Omit<OctokitParameterType<Octokit['rest']['repos']['removeCollaborator']>, 'repo' | 'owner' | 'username'> 
```
**Extends:** Omit&lt;[OctokitParameterType](./github.octokitparametertype)&lt;Octokit['rest']['repos']['removeCollaborator']&gt;, 'repo' \| 'owner' \| 'username'&gt;

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

[owner?](./github.removecollaboratorparams.owner)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 레포지토리의 소유자입니다.


</td></tr>
<tr><td>

[repo?](./github.removecollaboratorparams.repo)


</td><td>


</td><td>

string


</td><td>

_(Optional)_ 레포지토리의 이름입니다.


</td></tr>
<tr><td>

[username](./github.removecollaboratorparams.username)


</td><td>


</td><td>

string


</td><td>

제거할 팀원의 사용자 이름입니다.


</td></tr>
</tbody></table>

