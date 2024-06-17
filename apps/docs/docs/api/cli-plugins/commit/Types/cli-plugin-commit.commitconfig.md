---
id: cli-plugin-commit.commitconfig
title: CommitConfig
sidebar_label: CommitConfig
slug: /cli-plugin-commit.commitconfig
---





## Signature

```typescript
interface CommitConfig 
```

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[types?](./cli-plugin-commit.commitconfig.types)


</td><td>


</td><td>

[CommitType](./cli-plugin-commit.committype)[] \| ((initial: [CommitType](./cli-plugin-commit.committype)[]) =&gt; [CommitType](./cli-plugin-commit.committype)[])


</td><td>

_(Optional)_ 커밋 타입을 지정합니다.


</td></tr>
<tr><td>

[workspaces?](./cli-plugin-commit.commitconfig.workspaces)


</td><td>


</td><td>

string[]


</td><td>

_(Optional)_ 모노래포 사용시, workspace 로 커밋 범위 설정할수 있습니다.


</td></tr>
</tbody></table>
