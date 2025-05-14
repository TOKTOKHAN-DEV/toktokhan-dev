---
id: universal.ifequals
title: IfEquals
sidebar_label: IfEquals
slug: /universal.ifequals
---





두 개의 타입이 동일한지를 확인하고, 동일하다면 지정된 타입으로, 그렇지 않다면 다른 타입으로 설정하는 타입을 정의합니다.

## Signature

```typescript
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
```

## Example


```typescript
// 두 타입이 동일한 경우
type Result1 = IfEquals<number, number, 'Equal', 'Not Equal'>;
// type Result1 = 'Equal'

// 두 타입이 동일하지 않은 경우
type Result2 = IfEquals<number, string, 'Equal', 'Not Equal'>;
// type Result2 = 'Not Equal'
```

