---
id: universal.mockedfn
title: MockedFn
sidebar_label: MockedFn
slug: /universal.mockedfn
---





`MockedFn`은 Jest의 mock 함수를 타입으로 나타내는 유틸리티 타입입니다.

## Signature

```typescript
type MockedFn<T extends (...params: any) => any> = jest.Mock & ((...args: Parameters<T>) => ReturnType<T>);
```

## Example


```typescript
const mockFn: MockedFn<(a: number, b: number) => number> = jest.fn((a, b) => a + b);
```

