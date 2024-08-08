---
sidebar_class_name : hidden
id: github.githubmanager.committobranch
title: GitHubManager.commitToBranch
sidebar_label: GitHubManager.commitToBranch
slug: /github.githubmanager.committobranch
---





지정한 브랜치에 커밋을 하는 메소드입니다. [@see GitHub API - Update a reference](https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28#update-a-reference)

## Signature

```typescript
commitToBranch: ({
    branchName,
    commitSha,
    owner,
    repo
  }: CommitToBranchParams) => Promise<void>;
```
