# @toktokhan-dev/cli-plugin-gen-sitemap-next-page

[@toktokhan-dev/cli](../../cli/README.md) 의 plugin 입니다.
next.js page router 에서 pages 폴더 기반으로 sitemap.xml 파일을 생성합니다. 자세한 내용은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-sitemap-next-page)에서 확인 할 수 있습니다.

## Preview

```
pages
├── index.ts
├── _app.ts
├── _document.ts
├── comments
│   └── index.ts
├── goods
│   ├── index.ts
│   ├── [id]
│   │   └── index.ts
│   └── review
│       └── index.ts
└── payment
    ├── fail.ts
    └── success.ts
```

```ts
// tok-cli.config.ts
import { getSitemap } from '@toktokhan-dev/cli-plugin-gen-sitemap-next-page'

const config: RootConfig<{
  plugins: [typeof getSitemap]
}> = {
  plugins: [getSitemap],
  'gen:sitemap': {
    domain: 'https://example.com',
    /**
     * optional
     */
    routeMapper: {
      '/goods/[id]': [
        '/goods/0',
        '/goods/1',
        '/goods/2',
        '/goods/3',
        ...'/goods/99',
      ],
    },
    /**
     * optional
     */
    priority: {
      1: ['/'],
      0.5: ['/payment/*', ['/goods/*', '!/goods/review']],
    },
    /**
     * optional
     */
    changefreq: {
      hourly: ['/payment/*'],
    },
  },
}

export default config
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https:/example.com/</loc>
    <priority>1</priority>
  </url>
  <url>
    <loc>https:/example.com/comme</loc>
  </url>
  <url>
    <loc>https:/example.com/goods</loc>
  </url>
  <url>
    <loc>https:/example.com/payment/fail</loc>
    <priority>0.5</priority>
    <changefreq>hourly</changefreq>
  </url>
  <url>
    <loc>https:/example.com/payment/success</loc>
    <priority>0.5</priority>
    <changefreq>hourly</changefreq>
  </url>
  <url>
    <loc>https:/example.com/goods/0</loc>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https:/example.com/goods/1</loc>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https:/example.com/goods/2</loc>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https:/example.com/goods/3</loc>
    <priority>0.5</priority>
  </url>
  ...
  <url>
    <loc>https:/example.com/goods/98</loc>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https:/example.com/goods/99</loc>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https:/example.com/goods/review</loc>
  </url>
</urlset>

```

## Installation

```bash
npm i -D @toktokhan-dev/cli @toktokhan-dev/cli-plugin-gen-sitemap-next-page
```

## Register Plugin

`tok-cli.config.ts` 에서 config 정의가 가능합니다.<br/>
각 plugin 별로 option 을 정의하고, 해당 plugin 을 등록하여 사용할 수 있습니다.
자세한 내용은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-sitemap-next-page)에서 확인 할 수 있습니다.

```ts
// tok-cli.config.ts
import { genSitemap } from '@toktokhan-dev/cli-plugin-gen-sitemap-next-page'

const config: RootConfig<{
  plugins: [typeof genSitemap]
}> = {
  plugins: [genSitemap],
}
```

## Run Script

`tokript2` 명령어로 각 플러그인으로 등록된 기능들을 사용할 수 있습니다.

```bash
npx tokript2 gen:sitemap
```
