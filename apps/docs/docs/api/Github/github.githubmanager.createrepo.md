---
sidebar_class_name : hidden
id: github.githubmanager.createrepo
title: GitHubManager.createRepo
sidebar_label: GitHubManager.createRepo
slug: /github.githubmanager.createrepo
---





새로운 레포지토리를 생성하는 메소드입니다. [@see GitHub API - Create an organization repository](https://docs.github.com/ko/rest/repos/repos?apiVersion=2022-11-28#create-an-organization-repository) [@see GitHub API - Create a repository for the authenticated user](https://docs.github.com/en/rest/repos/repos#create-a-repository-for-the-authenticated-user)

## Signature

```typescript
createRepo: ({
    isPrivate,
    owner,
    repo
  }: CreateRepoParams) => Promise<RestEndpointMethodTypes["repos"]["createInOrg"]["response"]["data"] & {
    isOrg: boolean;
  }>;
```
