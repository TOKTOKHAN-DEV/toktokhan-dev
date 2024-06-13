---
id: cli-plugin-gen-sitemap-next-page.gensitemapconfig
title: GenSitemapConfig
sidebar_label: GenSitemapConfig
slug: /cli-plugin-gen-sitemap-next-page.gensitemapconfig
---





## Signature

```typescript
interface GenSitemapConfig 
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

[changefreq?](./cli-plugin-gen-sitemap-next-page.gensitemapconfig.changefreq)


</td><td>


</td><td>

Partial&lt;Record&lt;[Changefreq](./cli-plugin-gen-sitemap-next-page.changefreq), (string \| string[])[]&gt;&gt;


</td><td>

_(Optional)_ sitemap 의 changefreq 를 설정하기 위한 객체입니다. key 로 changefreq 중 특정 값을 받고, value 로 해당 changefreq 를 가지는 경로의 glob 패턴, glob 패턴 배열의 배열을 받습니다.

ex -&gt; \{ 'daily': ['/comment/*', ['/goods/*', !goods/review ]] \}


</td></tr>
<tr><td>

[domain](./cli-plugin-gen-sitemap-next-page.gensitemapconfig.domain)


</td><td>


</td><td>

string


</td><td>

도메인 주소입니다.


</td></tr>
<tr><td>

[ignored?](./cli-plugin-gen-sitemap-next-page.gensitemapconfig.ignored)


</td><td>


</td><td>

string[]


</td><td>

_(Optional)_ sitemap 에 포함되지 않는 파일 glob 패턴 입니다.


</td></tr>
<tr><td>

[includes?](./cli-plugin-gen-sitemap-next-page.gensitemapconfig.includes)


</td><td>


</td><td>

string[]


</td><td>

_(Optional)_ sitemap 에 포함되는 파일 glob 패턴 입니다.


</td></tr>
<tr><td>

[input](./cli-plugin-gen-sitemap-next-page.gensitemapconfig.input)


</td><td>


</td><td>

string


</td><td>

조회할 page 파일들이 포함되어있는 폴더 입니다.


</td></tr>
<tr><td>

[output](./cli-plugin-gen-sitemap-next-page.gensitemapconfig.output)


</td><td>


</td><td>

string


</td><td>

생성될 파일이 위치할 경로입니다.


</td></tr>
<tr><td>

[priority?](./cli-plugin-gen-sitemap-next-page.gensitemapconfig.priority)


</td><td>


</td><td>

Partial&lt;Record&lt;[Priority](./cli-plugin-gen-sitemap-next-page.priority), (string \| string[])[]&gt;&gt;


</td><td>

_(Optional)_ sitemap 의 0 부터 1 까지의 priority 를 설정하기 위한 객체입니다. key 로 priority 중 특정 값을 받고, value 로 해당 priority 를 가지는 경로의 glob 패턴, glob 패턴 배열의 배열을 받습니다.

ex -&gt; \{ 1: ['/comment/*', ['/goods/*', !goods/review ]] \}


</td></tr>
<tr><td>

[routeMapper?](./cli-plugin-gen-sitemap-next-page.gensitemapconfig.routemapper)


</td><td>


</td><td>

Partial&lt;Record&lt;string, string \| string[] \| Promise&lt;string \| string[]&gt; \| (() =&gt; string \| string[]) \| (() =&gt; Promise&lt;string \| string[]&gt;)&gt;&gt;


</td><td>

_(Optional)_ 특정 라우트를 의도한 경로로 변경하기 위한 객체입니다. key 로 파일상의 정확한 route 경로를 받고, value 로 변경될 경로, 경로 배열을 받습니다.

ex -&gt; \{ '/': '/home' \} ex -&gt; \{ '/detail/[id]' : getIds().map(id =&gt; `/detail/${id\}`) } ex -&gt; \{ '/detail/[id]' : '/detail/sitemap.xml' \}


</td></tr>
<tr><td>

[routerType](./cli-plugin-gen-sitemap-next-page.gensitemapconfig.routertype)


</td><td>


</td><td>

[RouterType](./cli-plugin-gen-sitemap-next-page.routertype)


</td><td>

Next.js 라우터 타입입니다.


</td></tr>
</tbody></table>
