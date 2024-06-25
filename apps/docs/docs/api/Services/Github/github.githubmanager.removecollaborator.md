---
sidebar_class_name : hidden
id: github.githubmanager.removecollaborator
title: GitHubManager.removeCollaborator
sidebar_label: GitHubManager.removeCollaborator
slug: /github.githubmanager.removecollaborator
---





레포지토리에 팀원를 제거하는 메소드입니다. [@see GitHub API - Remove a repository collaborator](https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#remove-a-repository-collaborator)

## Signature

```typescript
removeCollaborator: (params: Partible<OctokitParameterType<Octokit["rest"]["repos"]["removeCollaborator"]>, "repo" | "owner" | "username">) => Promise<void>;
```
