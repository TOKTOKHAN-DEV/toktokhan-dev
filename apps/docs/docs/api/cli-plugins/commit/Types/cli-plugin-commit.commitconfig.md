---
id: cli-plugin-commit.commitconfig
title: CommitConfig
sidebar_label: CommitConfig
slug: /cli-plugin-commit.commitconfig
---





커밋 명령어의 설정입니다.

## Signature

```typescript
type CommitConfig = {
  workspaces?: string[];
  types?: CommitType[] | ((initial: CommitType[]) => CommitType[]);
};
```
