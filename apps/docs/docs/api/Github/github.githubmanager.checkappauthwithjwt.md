---
sidebar_class_name : hidden
id: github.githubmanager.checkappauthwithjwt
title: GitHubManager.checkAppAuthWithJWT
sidebar_label: GitHubManager.checkAppAuthWithJWT
slug: /github.githubmanager.checkappauthwithjwt
---





GitHub App의 인증 자격 증명이 유효한지 확인하는 데 사용됩니다. JWT를 사용하여 이 엔드포인트에 접근해야 하며, GitHub App user access tokens, GitHub App installation access tokens, or fine-grained personal access tokens으로는 작동하지 않습니다. [@see GitHub API - Get the authenticated app](https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#get-the-authenticated-app)

## Signature

```typescript
checkAppAuthWithJWT: () => Promise<boolean>;
```
