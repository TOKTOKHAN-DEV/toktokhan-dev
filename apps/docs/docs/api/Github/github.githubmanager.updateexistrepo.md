---
sidebar_class_name : hidden
id: github.githubmanager.updateexistrepo
title: GitHubManager.updateExistRepo
sidebar_label: GitHubManager.updateExistRepo
slug: /github.githubmanager.updateexistrepo
---





기존 레포지토리에 지정된 브랜치로 주어진 내용을 업로드(push)해주는 메소드입니다.

## Signature

```typescript
updateExistRepo: ({
    contents,
    paths,
    message,
    branchName,
    baseBranchName,
    owner,
    repo
  }: UpdateExistRepoParams) => Promise<void>;
```
