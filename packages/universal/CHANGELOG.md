# @toktokhan-dev/universal

## 0.0.8

### Patch Changes

- 94e2b25: add LICENSE, README, improve package.json

  각 패키지별 LICENSE 와 README 파일을 추가하고, Package.json 을 개선했습니다.

## 0.0.7

### Patch Changes

- f414a7f: type, comment

  type 과 주석이 개선되었습니다.

## 0.0.6

### Patch Changes

- aa2b844: new function: create-s3-upload-flow

  ### create-s3-upload-flow

  s3 업로드를 위한 flow 를 생성하는 함수 입니다.

  주어진 prepareUpload 와 uploadFileToS3 함수를 연속 실행하는 함수를 반환합니다.

  ```ts
  const { uploadFile, uploadFiles } = createUploadFlow({
    prepareUpload: async ({ name }: { name: string }) => {
      return {
        name: name,
        type: 'image',
      }
    },
    uploadFileToS3: async ({ name, type }) => {
      return { name, type, imgUrl: 'https://example.com' }
    },
  })
  const result = await uploadFile({ name: 'example' })
  // { name: "example", type: "image", imgUrl: "https://example.com" }

  const results = await uploadFiles([{ name: 'example' }, { name: 'example2' }])
  // { fulfilled: [{ name: "example", type: "image", imgUrl: "https://example.com" } , ...], rejected: [] }
  ```

## 0.0.5

### Patch Changes

- af1668a: awaitted 함수명 오타 변경 => awaited
- 4f0b03f: imporove util types, add object functions, utility types,

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

- 9493f66: fix awaited type, add new function assert-item-of

  ### awaited 함수 type 수정

  기존 awaited 함수의 type 의 return type 이 항상 Promise 를 반환하도록 수정했습니다.

  ### assert-item-of 함수 추가

  넘겨진 데이터가 특정 배열의 구성요소인지 판별하는 함수가 추가되었습니다.

  ```
  assertItemOf([1,2,3], 2) // pass
  assertItemOf([1,2,3], 4) // throw Error
  ```

## 0.0.4

### Patch Changes

- d96ea33: retry request manager

  retryRequestManager 함수의 onRefetch 함수가 끝나기 전에, token promise 를 정리하는 로직이 실행되는 버그를 수정했습니다.

## 0.0.3

### Patch Changes

- 7ebbf37: feat: add extended fetch function and test code

## 0.0.2

### Patch Changes

- 70acba8: change function export name: then -> awaited

  `then` 함수가 `awaited` 이름으로 변경되었습니다.

## 0.0.1

### Patch Changes

- 6f42208: 웹,앱 환경에서 사용가능한 유틸리티 라이브러리입니다.
  [Docs:@toktokhan-dev/universal](https://toktokhan-dev-docs.vercel.app/docs/universal)
