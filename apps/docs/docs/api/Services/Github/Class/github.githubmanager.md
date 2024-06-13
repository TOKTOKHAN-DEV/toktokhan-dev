---
id: github.githubmanager
title: GitHubManager
sidebar_label: GitHubManager
slug: /github.githubmanager
---





 Class Octokit을 사용하여 Github Api를 쉽게 사용할 수 있도록 하는 모듈입니다. 레포지토리 생성, 컨텐츠 업로드 등의 메서드가 있습니다. [@see Octokit REST.js](https://octokit.github.io/rest.js/) [GitHub REST API Quickstart](https://docs.github.com/en/rest/quickstart)

## Signature

```typescript
declare class GitHubManager 
```

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)(data)](./github.githubmanager._constructor_)


</td><td>


</td><td>

Constructs a new instance of the `GitHubManager` class


</td></tr>
</tbody></table>

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

[addCollaborator](./github.githubmanager.addcollaborator)


</td><td>


</td><td>

(params: [Partible](./github.partible)&lt;[OctokitParameterType](./github.octokitparametertype)&lt;Octokit['rest']['repos']['addCollaborator']&gt;, 'repo' \| 'owner' \| 'username'&gt;) =&gt; Promise&lt;void&gt;


</td><td>

레포지토리에 협력할 팀원(collaborator)을 추가하는 메소드입니다. [@see GitHub API - Add a repository collaborator](https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#add-a-repository-collaborator)


</td></tr>
<tr><td>

[checkTokenValidity](./github.githubmanager.checktokenvalidity)


</td><td>


</td><td>

() =&gt; Promise&lt;boolean&gt;


</td><td>

유효한 토큰인지 확인하는 메소드입니다. [@see GitHub API - Get the authenticated app](https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#get-the-authenticated-app)


</td></tr>
<tr><td>

[createRepo](./github.githubmanager.createrepo)


</td><td>


</td><td>

() =&gt; Promise&lt;RestEndpointMethodTypes['repos']['createInOrg']['response']&gt;


</td><td>

새로운 레포지토리를 생성하는 메소드입니다. [@see GitHub API - Create an organization repository](https://docs.github.com/ko/rest/repos/repos?apiVersion=2022-11-28#create-an-organization-repository)


</td></tr>
<tr><td>

[isBranchExist](./github.githubmanager.isbranchexist)


</td><td>


</td><td>

(branchName: string) =&gt; Promise&lt;boolean&gt;


</td><td>

브랜치가 존재하는지 확인하는 메소드입니다. [@see GitHub API - Get a branch](https://docs.github.com/ko/rest/branches/branches?apiVersion=2022-11-28#get-a-branch)


</td></tr>
<tr><td>

[isRepoExist](./github.githubmanager.isrepoexist)


</td><td>


</td><td>

(org: string, repo: string) =&gt; Promise&lt;boolean&gt;


</td><td>

레포지토리가 존재하는지 확인하는 메소드입니다. [@see @see GitHub API - Get a repository](https://docs.github.com/ko/rest/repos/repos?apiVersion=2022-11-28#get-a-repository)


</td></tr>
<tr><td>

[publishFilesToNewRepo](./github.githubmanager.publishfilestonewrepo)


</td><td>


</td><td>

(params: [PublishFilesParams](./github.publishfilesparams)) =&gt; Promise&lt;void&gt;


</td><td>

새로운 레포지토리에 파일을 게시하는 메소드입니다.


</td></tr>
<tr><td>

[removeCollaborator](./github.githubmanager.removecollaborator)


</td><td>


</td><td>

(params: [Partible](./github.partible)&lt;[OctokitParameterType](./github.octokitparametertype)&lt;Octokit['rest']['repos']['removeCollaborator']&gt;, 'repo' \| 'owner' \| 'username'&gt;) =&gt; Promise&lt;void&gt;


</td><td>

레포지토리에 팀원를 제거하는 메소드입니다. [@see GitHub API - Remove a repository collaborator](https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#remove-a-repository-collaborator)


</td></tr>
<tr><td>

[updateExistRepo](./github.githubmanager.updateexistrepo)


</td><td>


</td><td>

(params: [UpdateRepoParams](./github.updaterepoparams)) =&gt; Promise&lt;void&gt;


</td><td>

기존 레포지토리에 지정된 브랜치로 내용을 업로드(push)해주는 메소드입니다.


</td></tr>
</tbody></table>
