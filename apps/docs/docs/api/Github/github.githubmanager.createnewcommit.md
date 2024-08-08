---
sidebar_class_name : hidden
id: github.githubmanager.createnewcommit
title: GitHubManager.createNewCommit
sidebar_label: GitHubManager.createNewCommit
slug: /github.githubmanager.createnewcommit
---





주어진 파일 경로와 내용을 기반으로 새로운 커밋을 생성합니다.

## Signature

```typescript
createNewCommit: ({
    branchName,
    contents,
    paths,
    message,
    owner,
    repo
  }: CreateNewCommitParams) => Promise<any>;
```
