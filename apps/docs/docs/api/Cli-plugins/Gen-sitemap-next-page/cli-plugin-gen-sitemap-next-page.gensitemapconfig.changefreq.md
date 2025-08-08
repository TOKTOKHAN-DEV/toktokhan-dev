---
sidebar_class_name : hidden
id: cli-plugin-gen-sitemap-next-page.gensitemapconfig.changefreq
title: GenSitemapConfig.changefreq
sidebar_label: GenSitemapConfig.changefreq
slug: /cli-plugin-gen-sitemap-next-page.gensitemapconfig.changefreq
---





sitemap 의 changefreq 를 설정하기 위한 객체입니다. key 로 changefreq 중 특정 값을 받고, value 로 해당 changefreq 를 가지는 경로의 glob 패턴, glob 패턴 배열의 배열을 받습니다.

ex -&gt; \{ 'daily': ['/comment/*', ['/goods/*', !goods/review ]] \}

## Signature

```typescript
changefreq?: Partial<Record<Changefreq, (string | string[])[]>>;
```
