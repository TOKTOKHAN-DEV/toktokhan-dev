---
'@toktokhan-dev/universal': patch
---

imporove util types, add object functions, utility types,

### 새로운 Object Util 함수 추가: get, set

#### get

key path 로 객체의 값을 가져오는 함수입니다.
curring 이 되어 있어, 함수를 합성하거나, selector 함수를 만들때 유용하게 사용 가능합니다.

```ts
const id = get('id', {id: 3}) // non curried - id: 3
const id = get('id')({id: 3}) // curried - id: 3

const getFirstItemName = get('list.0.name')
const name = getFirstItemName({list: [{name: 'Doil'}]}) // Doil


const name = useStore((user) => user.name ) // 'John Doe'
const name = useStore(get('user.name')) // 'John Doe'

const data = [{id: 1}, {id: 3}];
const ids = data.map(get('id')) // [1, 3]
```

#### update

객체의 key path 해당하는 값을 update 하는 함수 입니다.

- 원본 객체는 수정 하지 않고, 수정된 새로운 객체를 반환합니다. 중첩된 객체를 수정할때, setter 함수를 만들어 넘길때 유용 할 수 있습니다.
- set 할시, data 를 넘길 수 있고, 이전 데이터를 받아 다음 데이터를 리턴하는 함수를 넘겨 set 할 수 있습니다.
- curring 이 되어있어 react 의 setState 와 같은 불변 객체 state 를 수정할때 유용하게 사용 가능합니다.

```ts
const data = { count: 0, nested: { count: 0 } }
// data 로 set 하기
const updated = update('count', 5, data) // { count: 1,  ... }
// 함수로 set 하기
const updated = update('count', (prev) => prev + 1, data) // { count: 1,  ... }

update('count',5,data)
update('count',5)(data)
update('count')(5, data)
update('count')(5)(data)

const [state, setState] = useState({ count: 0, nested: {count: 0} })

setState({ ...state, nested: { count: 5 } })
setState(update('nested.count', 5))

setState((prev) => ({...prev, nested: {count: nested.count + 1 }}))
setState(update('nested.count', (prev) => prev + 1))
setState(update('nested.count', add(1)))
```

### 새로운 Utility Type 추가 : ObjSchemaByKey

객체 key 값을 통해 object schema 를 유추하는 Utility 타입이 추가되었습니다.

```ts
type UnknownSchema = ObjSchemaByKey<'a.b.c'> // { a?: { b?: { c?: any } } }
```

### Utlity Type 개선: DeepKeyof

객체의 type 을 기반으로 path type 을 추출하는 DeepKeyOf 의 버그가 수정되었습니다.

optional 한 타입의 하위 경로를 가지고 오지 못하는 버그가 수정되었습니다.

```ts
type Path = DeepKeyOf<{
  a: string
  b: {
    c?: {
      d: number
    }
  }
}>

// Path: "a" | "b" | "b.c" (Bug: optional 한 타입의 하위 경로를 가져오지 못함)

type Path = DeepKeyOf<{
  a: string
  b: {
    c: {
      d: number
    }
  }
}>
// Path: "a" | "b" | "b.c" | "b.d" (정상 동작)
```

### Utlity Type 개선: DeepValueOf

특정 객체에서 객체의 key 를 기반으로 value 의 타입을 가져오는 DeepValueOf 의 버그가 수정되었습니다.

DeepKeyOf 타입이 수정됨에 따라 optional 한 타입의 하위 경로의 value type 을 가지고 오지 못하는 버그가 수정되었습니다.

```ts
type Value = DeepValueOf<
  {
    a: string
    b: {
      c?: {
        d: number
      }
    }
  },
  'a.b.c.d'
>
// Value: never (Bug: optional 한 타입의 하위 경로를 가져오지 못함)

type Value = DeepValueOf<
  {
    a: string
    b: {
      c?: {
        d: number
      }
    }
  },
  'a.b.c.d'
>
// Value: number | undefined (정상 동작)
```
