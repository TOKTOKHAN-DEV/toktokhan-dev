---
'@toktokhan-dev/cli-plugin-gen-route-pages': patch
---

fix bug for lower-case-dynamic-id

dynamic id 에 해당하는 경로의 Key 값이 소문자로 변경되는 버그를 수정했습니다.

### 기존

```ts
{
    POST: {
        by_id: {
            MAIN: "/post/[id]",
        }
    }
}
```

### 변경

```ts
{
    POST: {
        BY_ID: {
            MAIN: "/post/[id]",
        }
    }
}
```
