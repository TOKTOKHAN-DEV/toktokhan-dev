# @toktokhan-dev/chakra

## 0.0.13

### Patch Changes

- Updated dependencies [aa2b844]
  - @toktokhan-dev/universal@0.0.6
  - @toktokhan-dev/react-web@0.0.15

## 0.0.12

### Patch Changes

- Updated dependencies [af1668a]
- Updated dependencies [4f0b03f]
- Updated dependencies [9493f66]
  - @toktokhan-dev/universal@0.0.5
  - @toktokhan-dev/react-web@0.0.14

## 0.0.11

### Patch Changes

- @toktokhan-dev/react-web@0.0.13

## 0.0.10

### Patch Changes

- Updated dependencies [8e159f8]
  - @toktokhan-dev/react-web@0.0.12

## 0.0.9

### Patch Changes

- Updated dependencies [f17800a]
  - @toktokhan-dev/react-web@0.0.11

## 0.0.8

### Patch Changes

- Updated dependencies [c61b283]
  - @toktokhan-dev/react-web@0.0.10

## 0.0.7

### Patch Changes

- Updated dependencies [15459c1]
  - @toktokhan-dev/react-web@0.0.9

## 0.0.6

### Patch Changes

- 2227c4a: InfinteContent & InfiniteList

  useIntersectionObserver 가 dependency 를 받게 수정됨에 따라
  기존 isFetching 과 hasMore 을 감지하지 못한 버그가 수정 되었습니다.

- 7f02962: prop type of InfinityList

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

- Updated dependencies [cbe23ec]
  - @toktokhan-dev/react-web@0.0.8

## 0.0.5

### Patch Changes

- Updated dependencies [ed18c00]
  - @toktokhan-dev/react-web@0.0.7

## 0.0.4

### Patch Changes

- Updated dependencies [d96ea33]
  - @toktokhan-dev/universal@0.0.4
  - @toktokhan-dev/react-web@0.0.6

## 0.0.3

### Patch Changes

- Updated dependencies [5ac71c0]
  - @toktokhan-dev/react-web@0.0.5

## 0.0.2

### Patch Changes

- Updated dependencies [47cb2b6]
  - @toktokhan-dev/react-web@0.0.4

## 0.0.1

### Patch Changes

- 6c12478: add new components 'InfinityList', 'InfinityContent'
