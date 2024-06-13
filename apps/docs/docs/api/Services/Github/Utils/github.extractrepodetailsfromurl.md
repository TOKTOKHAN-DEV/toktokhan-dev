---
id: github.extractrepodetailsfromurl
title: ExtractRepoDetailsFromUrl()
sidebar_label: ExtractRepoDetailsFromUrl()
slug: /github.extractrepodetailsfromurl
---





github url 를 받아 owner와 repo를 반환합니다.

## Signature

```typescript
extractRepoDetailsFromUrl: (url: string) => {
  owner: string;
  repo: string;
}
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

url


</td><td>

string


</td><td>

유효한 github repository url


</td></tr>
</tbody></table>
## Returns

\{ owner: string; repo: string; \}

