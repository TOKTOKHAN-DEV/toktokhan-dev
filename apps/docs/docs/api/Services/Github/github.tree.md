---
sidebar_class_name : hidden
id: github.tree
title: Tree
sidebar_label: Tree
slug: /github.tree
---





## Signature

```typescript
type Tree = {
  path: string;
  mode: '100644' | '100755' | '040000' | '160000' | '120000';
  type: 'blob' | 'tree' | 'commit';
  sha: string;
};
```
