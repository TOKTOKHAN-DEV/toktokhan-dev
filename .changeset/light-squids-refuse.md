---
'@toktokhan-dev/cli-plugin-gen-api-react-query': patch
---

fix fetch-type-template for pagination-option

paginations 옵션이 paginationSets 로 변경됬지만, fetch 버젼 template 에는 반영되어있지 않아 발생한 버그가 수정되었습니다.

```ts
 paginationSets: [
    {
      keywords: ['cursor'],
      nextKey: 'cursor',
    },
  ],
```
