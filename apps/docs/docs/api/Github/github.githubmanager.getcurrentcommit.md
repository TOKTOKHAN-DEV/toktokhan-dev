---
sidebar_class_name : hidden
id: github.githubmanager.getcurrentcommit
title: GitHubManager.getCurrentCommit
sidebar_label: GitHubManager.getCurrentCommit
slug: /github.githubmanager.getcurrentcommit
---





현재 커밋을 가져오는 메소드입니다. [@see GitHub API - Get a commit object](https://docs.github.com/en/rest/git/commits?apiVersion=2022-11-28#get-a-commit-object)

## Signature

```typescript
getCurrentCommit: ({
    branchName,
    owner,
    repo
  }: GetCurrentCommitParams) => Promise<{
    commitSha: string;
    treeSha: string;
  }>;
```
