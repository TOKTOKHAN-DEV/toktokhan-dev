---
'@toktokhan-dev/chakra': patch
---

prop type of InfinityList

InfinityList 의 props 중 renderItem 함수의 타입이 변경되었습니다.

#### 기존

```tsx
interface InfinityListProps {
  ...
  renderItem: ({ item, index }: { item: T, index: number }) => ReactNode | null
}
```

#### 변경

```tsx
interface InfinityListProps {
  ...
  renderItem: (item: T, index: number ) => ReactNode | null
}
```
