---
sidebar_class_name : hidden
id: cli-plugin-gen-sitemap-next-page.gensitemapconfig.priority
title: GenSitemapConfig.priority
sidebar_label: GenSitemapConfig.priority
slug: /cli-plugin-gen-sitemap-next-page.gensitemapconfig.priority
---





sitemap 의 0 부터 1 까지의 priority 를 설정하기 위한 객체입니다. key 로 priority 중 특정 값을 받고, value 로 해당 priority 를 가지는 경로의 glob 패턴, glob 패턴 배열의 배열을 받습니다.

ex -&gt; \{ 1: ['/comment/*', ['/goods/*', !goods/review ]] \}

## Signature

```typescript
priority?: Partial<Record<Priority, (string | string[])[]>>;
```
