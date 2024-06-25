---
sidebar_class_name : hidden
id: github.githubmanager.addcollaborator
title: GitHubManager.addCollaborator
sidebar_label: GitHubManager.addCollaborator
slug: /github.githubmanager.addcollaborator
---





레포지토리에 협력할 팀원(collaborator)을 추가하는 메소드입니다. [@see GitHub API - Add a repository collaborator](https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#add-a-repository-collaborator)

## Signature

```typescript
addCollaborator: (params: Partible<OctokitParameterType<Octokit["rest"]["repos"]["addCollaborator"]>, "repo" | "owner" | "username">) => Promise<void>;
```
