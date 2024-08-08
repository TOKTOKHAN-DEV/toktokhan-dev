---
sidebar_class_name : hidden
id: github.githubmanager.createblob
title: GitHubManager.createBlob
sidebar_label: GitHubManager.createBlob
slug: /github.githubmanager.createblob
---





파일에 대한 blob를 생성하는 메소드입니다. [@see GitHub API - Create a blob](https://docs.github.com/en/rest/git/blobs?apiVersion=2022-11-28#create-a-blob)

## Signature

```typescript
createBlob: ({
    content,
    owner,
    repo
  }: CreateBlobParams) => Promise<BlobFileData>;
```
