---
sidebar_class_name : hidden
id: github.githubmanager.createrepo
title: GitHubManager.createRepo
sidebar_label: GitHubManager.createRepo
slug: /github.githubmanager.createrepo
---





새로운 레포지토리를 생성하는 메소드입니다.

## Signature

```typescript
createRepo: (owner: string, repo: string, isPublic?: boolean) => Promise<RestEndpointMethodTypes["repos"]["createInOrg"]["response"]["data"] & {
    isOrg: boolean;
  }>;
```
