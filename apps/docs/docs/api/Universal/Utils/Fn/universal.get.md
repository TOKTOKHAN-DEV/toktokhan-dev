---
id: universal.get
title: Get()
sidebar_label: Get()
slug: /universal.get
---





객체의 property 를 key 로 받아서 값을 가져오는 함수입니다. 중접 객체의 경우 a.b.c 와 같이, 배열의 경우 a.0.b 와 같이 접근이 가능합니다.

## Signature

```typescript
get: <T extends Obj | Array<any>, K extends DeepKeyOf<T>>(key: K, data: T) => DeepValueOf<T, K>
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

key


</td><td>

K


</td><td>

객체의 key


</td></tr>
<tr><td>

data


</td><td>

T


</td><td>

객체 혹은 배열


</td></tr>
</tbody></table>

## Returns

[DeepValueOf](./universal.deepvalueof)&lt;T, K&gt;

객체의 key 에 해당하는 값

## Example


```ts

const data = {
 user: {
   name: 'John Doe',
   address: {
     city: 'New York',
 },
 posts: [
   { title: 'Post 1' },
   { title: 'Post 2' },
 ],
}

// 객체의 key 에 해당하는 값 가져오기
get('user.name', data) // 'John Doe'
get('user.address.city', data) // 'New York'

// 배열의 key 에 해당하는 값 가져오기
get('posts.0.title', data) // 'Post 1'

// curried function 으로 사용하기
const getUserName = get('user.name')
getUserName(data) // 'John Doe'

const logname = flow(get('user.name'), console.log)
logname(data) // 'John Doe'

const name = useStore(get('user.name')) // 'John Doe'

```

