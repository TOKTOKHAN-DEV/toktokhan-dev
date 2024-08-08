---
sidebar_class_name : hidden
id: github.githubmanager.createbranch
title: GitHubManager.createBranch
sidebar_label: GitHubManager.createBranch
slug: /github.githubmanager.createbranch
---





새 브랜치를 생성하는 메소드입니다. [@see GitHub API - Create a reference](https://docs.github.com/ko/rest/git/refs?apiVersion=2022-11-28#create-a-reference)

## Signature

```typescript
createBranch: ({
    branchName,
    baseBranchName,
    owner,
    repo
  }: CreateBranchParams) => Promise<void>;
```
