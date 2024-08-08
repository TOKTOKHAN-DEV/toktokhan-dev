---
sidebar_class_name : hidden
id: github.githubmanager.checkauthuser
title: GitHubManager.checkAuthUser
sidebar_label: GitHubManager.checkAuthUser
slug: /github.githubmanager.checkauthuser
---





주어진 auth 토큰으로 사용자의 인증 상태를 확인합니다. 주어진 token에 대해 인증된 사용자인지 확인합니다. [@see GitHub API - Get the authenticated app](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user)

## Signature

```typescript
checkAuthUser: () => Promise<boolean>;
```
