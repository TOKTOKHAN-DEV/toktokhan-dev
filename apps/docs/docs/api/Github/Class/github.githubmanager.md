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

(\{ username, permission, owner, repo, ...params \}: [AddCollaboratorParams](./github.addcollaboratorparams)) =&gt; Promise&lt;void&gt;


</td><td>

레포지토리에 협력할 팀원(collaborator)을 추가하는 메소드입니다. [@see GitHub API - Add a repository collaborator](https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#add-a-repository-collaborator)


</td></tr>
<tr><td>

[checkAppAuthWithJWT](./github.githubmanager.checkappauthwithjwt)


</td><td>


</td><td>

() =&gt; Promise&lt;boolean&gt;


</td><td>

GitHub App의 인증 자격 증명이 유효한지 확인하는 데 사용됩니다. JWT를 사용하여 이 엔드포인트에 접근해야 하며, GitHub App user access tokens, GitHub App installation access tokens, or fine-grained personal access tokens으로는 작동하지 않습니다. [@see GitHub API - Get the authenticated app](https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#get-the-authenticated-app)


</td></tr>
<tr><td>

[checkAuthUser](./github.githubmanager.checkauthuser)


</td><td>


</td><td>

() =&gt; Promise&lt;boolean&gt;


</td><td>

주어진 auth 토큰으로 사용자의 인증 상태를 확인합니다. 주어진 token에 대해 인증된 사용자인지 확인합니다. [@see GitHub API - Get the authenticated app](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user)


</td></tr>
<tr><td>

[checkOrganizationValidity](./github.githubmanager.checkorganizationvalidity)


</td><td>


</td><td>

(org?: string) =&gt; Promise&lt;boolean&gt;


</td><td>

유효한 조직(Organization)인지 확인하는 메소드입니다. [@see GitHub API - Get an organization](https://docs.github.com/en/rest/orgs/orgs?apiVersion=2022-11-28#get-an-organization)


</td></tr>
<tr><td>

[checkOwnerAccess](./github.githubmanager.checkowneraccess)


</td><td>


</td><td>

(owner: string) =&gt; Promise&lt;boolean&gt;


</td><td>

주입된 토큰이 주어진 owner에 대한 권한이 있는지 확인하는 메서드입니다.


</td></tr>
<tr><td>

[commitToBranch](./github.githubmanager.committobranch)


</td><td>


</td><td>

(\{ branchName, commitSha, owner, repo \}: [CommitToBranchParams](./github.committobranchparams)) =&gt; Promise&lt;void&gt;


</td><td>

지정한 브랜치에 커밋을 하는 메소드입니다. [@see GitHub API - Update a reference](https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28#update-a-reference)


</td></tr>
<tr><td>

[createBlob](./github.githubmanager.createblob)


</td><td>


</td><td>

(\{ content, owner, repo \}: [CreateBlobParams](./github.createblobparams)) =&gt; Promise&lt;[BlobFileData](./github.blobfiledata)&gt;


</td><td>

파일에 대한 blob를 생성하는 메소드입니다. [@see GitHub API - Create a blob](https://docs.github.com/en/rest/git/blobs?apiVersion=2022-11-28#create-a-blob)


</td></tr>
<tr><td>

[createBranch](./github.githubmanager.createbranch)


</td><td>


</td><td>

(\{ branchName, baseBranchName, owner, repo \}: [CreateBranchParams](./github.createbranchparams)) =&gt; Promise&lt;void&gt;


</td><td>

새 브랜치를 생성하는 메소드입니다. [@see GitHub API - Create a reference](https://docs.github.com/ko/rest/git/refs?apiVersion=2022-11-28#create-a-reference)


</td></tr>
<tr><td>

[createNewCommit](./github.githubmanager.createnewcommit)


</td><td>


</td><td>

(\{ branchName, contents, paths, message, owner, repo \}: [CreateNewCommitParams](./github.createnewcommitparams)) =&gt; Promise&lt;any&gt;


</td><td>

주어진 파일 경로와 내용을 기반으로 새로운 커밋을 생성합니다.


</td></tr>
<tr><td>

[createRepo](./github.githubmanager.createrepo)


</td><td>


</td><td>

(\{ isPrivate, owner, repo \}: [CreateRepoParams](./github.createrepoparams)) =&gt; Promise&lt;RestEndpointMethodTypes["repos"]["createInOrg"]["response"]["data"] &amp; \{ isOrg: boolean; \}&gt;


</td><td>

새로운 레포지토리를 생성하는 메소드입니다. [@see GitHub API - Create an organization repository](https://docs.github.com/ko/rest/repos/repos?apiVersion=2022-11-28#create-an-organization-repository) [@see GitHub API - Create a repository for the authenticated user](https://docs.github.com/en/rest/repos/repos#create-a-repository-for-the-authenticated-user)


</td></tr>
<tr><td>

[getCurrentCommit](./github.githubmanager.getcurrentcommit)


</td><td>


</td><td>

(\{ branchName, owner, repo \}: [GetCurrentCommitParams](./github.getcurrentcommitparams)) =&gt; Promise&lt;\{ commitSha: string; treeSha: string; \}&gt;


</td><td>

현재 커밋을 가져오는 메소드입니다. [@see GitHub API - Get a commit object](https://docs.github.com/en/rest/git/commits?apiVersion=2022-11-28#get-a-commit-object)


</td></tr>
<tr><td>

[getUser](./github.githubmanager.getuser)


</td><td>


</td><td>

() =&gt; Promise&lt;RestEndpointMethodTypes["users"]["getAuthenticated"]["response"]["data"]&gt;


</td><td>

인증된 유지의 정보를 조회하는 메소드입니다. [@see GitHub API - Get the authenticated app](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user)


</td></tr>
<tr><td>

[isBranchExist](./github.githubmanager.isbranchexist)


</td><td>


</td><td>

(\{ branchName, owner, repo \}: [IsBranchExistParams](./github.isbranchexistparams)) =&gt; Promise&lt;boolean&gt;


</td><td>

브랜치가 존재하는지 확인하는 메소드입니다. [@see GitHub API - Get a branch](https://docs.github.com/ko/rest/branches/branches?apiVersion=2022-11-28#get-a-branch)


</td></tr>
<tr><td>

[isRepoExist](./github.githubmanager.isrepoexist)


</td><td>


</td><td>

(owner?: string, repo?: string) =&gt; Promise&lt;boolean&gt;


</td><td>

레포지토리가 존재하는지 확인하는 메소드입니다. [@see @see GitHub API - Get a repository](https://docs.github.com/ko/rest/repos/repos?apiVersion=2022-11-28#get-a-repository)


</td></tr>
<tr><td>

[publishFilesToNewRepo](./github.githubmanager.publishfilestonewrepo)


</td><td>


</td><td>

(\{ contents, paths, isPrivate, message, branchName, owner, repo \}: [PublishFilesToNewRepoParams](./github.publishfilestonewrepoparams)) =&gt; Promise&lt;void&gt;


</td><td>

새로운 레포지토리에 주어진 내용을 게시하는 메소드입니다.


</td></tr>
<tr><td>

[removeCollaborator](./github.githubmanager.removecollaborator)


</td><td>


</td><td>

(\{ username, owner, repo \}: [RemoveCollaboratorParams](./github.removecollaboratorparams)) =&gt; Promise&lt;void&gt;


</td><td>

레포지토리에 팀원를 제거하는 메소드입니다. [@see GitHub API - Remove a repository collaborator](https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#remove-a-repository-collaborator)


</td></tr>
<tr><td>

[updateExistRepo](./github.githubmanager.updateexistrepo)


</td><td>


</td><td>

(\{ contents, paths, message, branchName, baseBranchName, owner, repo \}: [UpdateExistRepoParams](./github.updateexistrepoparams)) =&gt; Promise&lt;void&gt;


</td><td>

기존 레포지토리에 지정된 브랜치로 주어진 내용을 업로드(push)해주는 메소드입니다.


</td></tr>
</tbody></table>
