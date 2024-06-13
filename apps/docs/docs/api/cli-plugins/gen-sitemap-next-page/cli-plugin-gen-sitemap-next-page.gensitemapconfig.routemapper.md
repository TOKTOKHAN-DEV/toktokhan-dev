---
sidebar_class_name : hidden
id: cli-plugin-gen-sitemap-next-page.gensitemapconfig.routemapper
title: GenSitemapConfig.routeMapper
sidebar_label: GenSitemapConfig.routeMapper
slug: /cli-plugin-gen-sitemap-next-page.gensitemapconfig.routemapper
---





특정 라우트를 의도한 경로로 변경하기 위한 객체입니다. key 로 파일상의 정확한 route 경로를 받고, value 로 변경될 경로, 경로 배열을 받습니다.

ex -&gt; \{ '/': '/home' \} ex -&gt; \{ '/detail/[id]' : getIds().map(id =&gt; `/detail/${id\}`) } ex -&gt; \{ '/detail/[id]' : '/detail/sitemap.xml' \}

## Signature

```typescript
routeMapper?: Partial<Record<string, string | string[] | Promise<string | string[]> | (() => string | string[]) | (() => Promise<string | string[]>)>>;
```
