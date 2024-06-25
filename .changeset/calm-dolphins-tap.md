---
'@toktokhan-dev/react-web': patch
---

add dependency on useIntersectionObserver

useIntersectionObserver hook 에 observer instance 생성 초기화를 위한 dependency param 이 추가되었습니다.

```ts
useIntersectionObserver(
  {
    onVisible: () => {
      if (!isFetcing) {
        refetch()
      }
    },
  },
  [isFetching],
)
```
