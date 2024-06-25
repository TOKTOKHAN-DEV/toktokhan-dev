---
'@toktokhan-dev/chakra': patch
---

InfinteContent & InfiniteList

useIntersectionObserver 가 dependency 를 받게 수정됨에 따라
기존 isFetching 과 hasMore 을 감지하지 못한 버그가 수정 되었습니다.
