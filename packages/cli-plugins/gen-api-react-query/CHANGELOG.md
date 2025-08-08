# @toktokhan-dev/cli-plugin-gen-api-react-query

## 0.1.6

### Patch Changes

- [`dc9b592`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/dc9b592e4fd3918c405f8ac31dc23c0bdc4b290e) Thanks [@pqr4579](https://github.com/pqr4579)! - fix import statement place bottom line

## 0.1.5

### Patch Changes

- [`3c462ea`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/3c462eaaa3bbe68d649d2bbb40f0abf997ce26e8) Thanks [@pqr4579](https://github.com/pqr4579)! - add swagger urls fields

## 0.1.4

### Patch Changes

- [`b70ec9a`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/b70ec9a711a9e868e97bfd39b279db4764487d98) Thanks [@Eunkyung-Son](https://github.com/Eunkyung-Son)! - fetch paramsSerialize 대응 및 fetchExtend 임포트 방식 변경

## 0.1.3

### Patch Changes

- [`a9fce6f`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/a9fce6f0d645d4ed6f7c274a0f21f0a5588ce101) Thanks [@ldu1020](https://github.com/ldu1020)! - fix: enum nullable bug

  요청 타입에서 enum 값이 nullable 일 경우, nullable 이 적용되지 않는 이슈가 수정되었습니다.

  #### 이전

  ```ts
  export interface SomeApiRequestType {
    /** nullable enum */
    someEnum: SomeEnum
  }
  ```

  #### 개선

  ```ts
  export interface SomeApiRequestType {
    /** nullable enum */
    someEnum: SomeEnum | null
  }
  ```

- [`e5f7fb8`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/e5f7fb8bcfdcbfa73483cb7f1f24fdedc8919d18) Thanks [@ldu1020](https://github.com/ldu1020)! - console.log 제거

## 0.1.2

### Patch Changes

- [`62473eb`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/62473eba661170c2dce1921ecb7a79a81567b3c4) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - httpClientType fetch 시 인피니티 쿼리가 생성되지 않았던 이슈를 해결했습니다.

## 0.1.1

### Patch Changes

- [`e287296`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/e287296c20897ef00ac3a4aadfa8169b935acca7) Thanks [@ldu1020](https://github.com/ldu1020)! - fetch api paramsSerializer 옵션 임시 추가

  'fetch' 옵션으로 gen:api 시 타입 오류 발생하는 이슈 해결을 위해 임시로 타입이 추가 되었습니다.
  기능은 하지 않습니다.

  ```ts
  export interface FullRequestParams extends Omit<RequestInit, 'body'> {
    /** 임시 추가 */
    paramsSerializer?: (...params: any[]) => any

    /** set parameter to`true` for call `securityWorker` for this request */
    secure?: boolean
    /** request path */
    path: string
    ...
  }
  ```

## 0.1.0

### Minor Changes

- [`705bad6`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/705bad67668476f07399b8a9b5825e0a4abb168e) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - # 새로운 기능: React Query Suspense 지원

  > includeReactSuspenseQuery option 을 사용하기 전 공식문서를 꼭 읽어주세요.
  > [tanstack React-query suspense](https://tanstack.com/query/latest/docs/framework/react/guides/suspense) > [React suspense](https://ko.react.dev/reference/react/Suspense)

  ## 주요 변경 사항
  1. `GenerateSwaggerApiConfig` 인터페이스에 새로운 옵션 추가:
     - `includeReactSuspenseQuery`: React Suspense Query 생성 여부를 결정하는 불리언 값으로 true로 설정시 React Query useSuspense를 반환하는 hook을 생성 해줍니다. 기본 값은 `false`입니다.

  2. GET 요청에 대한 Suspense Query 지원:
     - 기존에 `useQuery`로 사용되던 GET 엔드포인트에 대해서 Suspense Query 훅과 옵션이 생성됩니다.

  3. `includeReactInfiniteQuery` 제거:
     `useQuery` hook 생성에 한해서는 기존의 `includeReactInfiniteQuery` 옵션이 제거되고, `includeReactQuery`로 통합되었습니다. 기본값은 `true`입니다.

  ## 새로운 기능 상세 설명
  1. Suspense 기반 쿼리 훅:
     - 각 API 엔드포인트에 대해 `use[ApiName]SuspenseQuery` 훅이 생성됩니다.
     - 이 훅은 `useSuspenseQuery`를 사용하여 Suspense 기반의 데이터 fetching을 지원합니다.

  2. Suspense 쿼리 옵션:
     - 각 API 엔드포인트에 대해 `[apiName]SuspenseQueryOptions` 함수가 생성됩니다.
     - 이 함수는 `useSuspenseQueries`를 사용한 병렬 데이터 쿼리에 활용할 수 있는 옵션을 제공합니다.

  ## config 설정

  ### tok-cli-config.ts

  ```ts

  const config ={
  ...
   'gen:api': {
      ...,
      includeReactQuery: true or false // default true
      includeReactSuspenseQuery: true // default false
    },
  ...
  }
  ```

  ### 생성 예시

  ```typescript
  // [app-name]/src/generated/apis/[ApiName]/[ApiName].suspenseQuery.ts

  /**
   * No description
   *
   * @tags book
   * @name BookRetrieve
   * @request GET:/v1/book/{bok_id}/
   * @secure    */

  export const useBookRetrieveSuspenseQuery = <
    TData = Awaited<ReturnType<typeof bookApi.bookRetrieve>>,
  >(
    params: SuspenseQueryHookParams<
      typeof bookApi.bookRetrieve,
      AxiosError<any>,
      TData
    >,
  ) => {
    const queryKey = QUERY_KEY_BOOK_API.RETRIEVE(params.variables)

    return useSuspenseQuery({
      queryKey,
      queryFn: () => bookApi.bookRetrieve(params.variables),
      ...params?.options,
    })
  }

  /**
   * @name bookRetrieveQueryOptions
   * @description 이 옵션은 Suspense 기반의 병렬 데이터 쿼리를 위한 설정입니다.
   * `useSuspenseQueries`를 사용하여 여러 쿼리를 병렬로 처리할 때 활용하세요.
   */
  export const bookRetrieveSuspenseQueryOptions = <
    TData = Awaited<ReturnType<typeof bookApi.bookRetrieve>>,
  >(
    params: SuspenseQueryHookParams<
      typeof bookApi.bookRetrieve,
      unknown,
      TData
    >,
  ) => {
    const queryKey = QUERY_KEY_BOOK_API.RETRIEVE(params.variables)

    return {
      queryKey,
      queryFn: () => bookApi.bookRetrieve(params.variables),
      ...params?.options,
    }
  }
  ```

  ## 사용 예시

  ### useSuspense example

  ```tsx
  'use client'

  import { useBookRetrieveSuspenseQuery } from '../api/Book.suspenseQuery'

  const Book = () => {
    const book = useBookRetrieveSuspenseQuery({
      variables: { bookId: 13 },
    })

    return (
      <div>
        <p>useSuspenseQuery Example</p>
        <p>title: {book.data.name} </p>
        <p>year: {book.data.year} </p>
      </div>
    )
  }

  export default Book
  ```

  ### useSuspenseQueries example

  단일 컴포넌트 내에서 여러 개의 `useSuspenseQuery`를 개별적으로 사용할 경우, 의도치 않은 waterfall 효과가 발생할 수 있습니다.

  이러한 경우 `useSuspenseQueries`를 활용할 수 있습니다. 이 훅을 사용하면 여러 쿼리를 동시에 병렬로 실행할 수 있게되는데요.

  이 때 gen api로 생성된 queryOptions를 적극 활용해주세요.

  > 현재 QueryOptions는 단일 ussSuspenseQuery 와 같은 파일 경로에 위치해 있지만,
  > 추후 query-options.ts로 분리하는 것을 고려하고있습니다.

  ```tsx
  'use client'

  import { useSuspenseQueries } from '@tanstack/react-query'

  import {
    authorRetrieveSuspenseQueryOptions,
    bookRetrieveSuspenseQueryOptions,
  } from '../api/Book.suspenseQuery'

  const BookDetail = () => {
    const book = bookRetrieveSuspenseQueryOptions({
      variables: { bookId: 1 },
    })

    const autor = authorRetrieveSuspenseQueryOptions({
      variables: { authorId: 8 },
    })

    const [bookData, author] = useSuspenseQueries({
      queries: [book, autor],
    })

    return (
      <div>
        <p>
          <b>useSuspenseQuries Example</b>
        </p>
        <p>title: {bookData.data.name} </p>
        <p>year: {bookData.data.year} </p>
        <p>author: {author.data.name} </p>.
      </div>
    )
  }

  export default BookDetail
  ```

  ## with Suspense

  ```tsx
  export default function BookInfo() {
    return (
      <Center>
        <Suspense fallback={<p>book loading...</p>}>
          <Book />
        </Suspense>
        <Suspense fallback={<p>author loading...</p>}>
          <Author />
        </Suspense>
        <Suspense fallback={<p>book & author loading...</p>}>
          <BookDetail />
        </Suspense>
      </Center>
    )
  }
  ```

  ## @Additional Suspense Loading 처리

  ### : Suspense와 일반적인 로딩 처리를 모두 지원

  React Suspense 는 로딩 상태를 감지하려면 children 컴포넌트 내에서 비동기 작업이 이뤄져야 합니다. 따라서 실제 데이터 패칭작업이 내부적으로 일어나지 않는다면, 수동으로 프로미스를 생성하거나, fallback component를 따로 렌더링하며 확인한 후 작업을 하는 과정이 불편했는데요.

  <Loading/> 컴포넌트는 데이터를 패칭하지 않고도 isLoading true로 fallback상태를 미리 확인할 수 있는 컴포넌트입니다.

  suspense와 함께 같이 사용해보세요!

  ```tsx
  import { type ReactNode, Suspense } from 'react'

  import { Skeleton } from '@chakra-ui/react'

  export interface LoadingProps {
    isLoading?: boolean
    fallback?: ReactNode
    children: ReactNode
  }

  /**
   * isLoading 이 true 일 때 fallback 을 보여주고, false 일 때 children 을 보여줍니다.
   * isLoading 이 undefined 일 때는 Suspense 로 children 을 보여줍니다.
   */
  export const Loading = ({ isLoading, children, fallback }: LoadingProps) => {
    if (isLoading === undefined) {
      return <Suspense fallback={fallback}>{children}</Suspense>
    }

    if (isLoading) {
      return fallback || <Skeleton />
    }

    return children
  }
  ```

  ```tsx
  export default function BookInfo() {
    return (
      <Center>
        <Loading fallback={<p>book loading...</p>}>
          <Book />
        </Loading>
        <Loading fallback={<p>author loading...</p>}>
          <Author />
        </Loading>
        <Loading fallback={<p>book & author loading...</p>}>
          <BookDetail />
        </Loading>
      </Center>
    )
  }
  ```

## 0.0.19

### Patch Changes

- [`97d5edb`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/97d5edb5ef80a41e2d6e0e294bf090ee0682be4c) Thanks [@Eunkyung-Son](https://github.com/Eunkyung-Son)! - fetch instance 사용 시 react query 에러 타입을 수정했습니다.

## 0.0.18

### Patch Changes

- [`1c7c78d`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/1c7c78d9362ae82c31f0d8c7dfe079bc3f3ddc51) Thanks [@Eunkyung-Son](https://github.com/Eunkyung-Son)! - fetch instance 사용 시 react query 에러 타입을 수정했습니다.

## 0.0.17

### Patch Changes

- Updated dependencies [ce6c6eb]
  - @toktokhan-dev/node@0.0.10
  - @toktokhan-dev/cli@0.0.11

## 0.0.16

### Patch Changes

- 94e2b25: add LICENSE, README, improve package.json

  각 패키지별 LICENSE 와 README 파일을 추가하고, Package.json 을 개선했습니다.

- Updated dependencies [98ee403]
- Updated dependencies [94e2b25]
  - @toktokhan-dev/cli@0.0.10
  - @toktokhan-dev/node@0.0.9

## 0.0.15

### Patch Changes

- @toktokhan-dev/cli@0.0.9
- @toktokhan-dev/node@0.0.8

## 0.0.14

### Patch Changes

- @toktokhan-dev/cli@0.0.8
- @toktokhan-dev/node@0.0.7

## 0.0.13

### Patch Changes

- @toktokhan-dev/cli@0.0.7
- @toktokhan-dev/node@0.0.6

## 0.0.12

### Patch Changes

- dfd9b18: fix fetch-type-template for pagination-option

  paginations 옵션이 paginationSets 로 변경됬지만, fetch 버젼 template 에는 반영되어있지 않아 발생한 버그가 수정되었습니다.

  ```ts
   paginationSets: [
      {
        keywords: ['cursor'],
        nextKey: 'cursor',
      },
    ],
  ```

## 0.0.11

### Patch Changes

- 4b535c5: paginations 으로 적용되어있는 곳을 수정했습니다.

## 0.0.10

### Patch Changes

- 2ec5863: cli 관련 네이밍 오타를 수정하였습니다.
  - paginations -> paginationSets
  - isOptialnalVariabels -> isOptionalVariables

## 0.0.9

### Patch Changes

- 0ff680a: generic type of custom-query-hooks

  useQuery 와 useInfiniteQuery 의 제너릭이 각각 바뀌어 들어가 있던 버그를 수정했습니다.

## 0.0.8

### Patch Changes

- 8f4874a: Instance Path & Comments & Query Key

  # Instance Path

  기존에 {name}.api.ts 파일에 에서 생성된 각 api class 의 instance 가
  {name}.query.ts 파일로 이동되었습니다.

  생성된 class 나 instance 를 axios instance 선언부애서 사용할 경우 해당 파일에서 instance 를 import 하고 있기 때문에 순환 참조가 일어납니다.

  위 버그를 방지하기위해 class api 선언부와 axios instance 를 import 하여 새로운 api instance 를 생성하는 로직을 다른 파일로 분리했습니다.

  #### 기존

  ```ts
  //Auth.api.ts

  import instance from '@/configs/axios/instance'

  export class AuthApi {
      ...
  }

  export const authApi = new AuthApi({ instance })
  ```

  ```ts
  // @/configs/axios/instance.ts

  import axios, { AxiosError } from 'axios';
  import { AuthApi, authApi } from '@/generated/swagger/Auth.api.ts'

  const instance = axios.create({...});

  const newAuthApi = new AuthApi({instance: axios.create()}) // Error - 순환 참조 발생

  instance.interceptors.request.use(
    (config) => {...},
    (error) => {...},
  );

  instance.interceptors.response.use(
    (res) => {...},
    async (error: AxiosError) => {
      ...
      authApi.refresh() // Error - 순환참조 발생

    },
  );

  export default instance;
  ```

  #### 변경

  ```ts
  // Auth.api.ts
  export class AuthApi {
      ...
  }
  // instance 선언부 제거
  ```

  ```ts
  // Auth.query.ts
  const authApi = new AuthApi({ instance })

  const AUTH_QUERY_KEY = {...}
  ```

  ```ts
  // @/configs/axios/instance.ts

  import axios, { AxiosError } from 'axios';
  import { AuthApi } from '@/generated/swagger/Auth.api.ts'

  const instance = axios.create({...});

  const authApi = new AuthApi({instance: axios.create()}) // no Error

  instance.interceptors.request.use(
    (config) => {...},
    (error) => {...},
  );

  instance.interceptors.response.use(
    (res) => {...},
    async (error: AxiosError) => {...},
  );

  export default instance;
  ```

  ## Query Key

  query key 의 정의 방식을 개선했습니다.

  ##### 기존

  ```ts
  {
    GET_LIST: (variables?: Parameter<typeof someApi.getList>) =>
      ['GET_LIST', variabels].filter((v) => typeof v !== 'undefined')
  }
  ```

  ##### 개선

  ```ts
  const isDefined = () => {...}

  {
    GET_LIST: (variables?: Parameter<typeof someApi.getList>) =>
      ['GET_LIST', variabels].filter(isDefined)
  }
  ```

  ## Comment

  아래 주석이 gen:api 가 생성하는 모든 파일에 추가되었습니다.

  ```
  /**
   * !DO NOT EDIT THIS FILE
   *
   * 스크립트가 실행될때, 파일을 항상 새로 쓰기 때문에 파일 수정시 작성내용이 제거 될 수 있습니다.
   */

  ```

  - @toktokhan-dev/cli@0.0.6
  - @toktokhan-dev/node@0.0.5

## 0.0.7

### Patch Changes

- Updated dependencies [b895311]
  - @toktokhan-dev/node@0.0.4
  - @toktokhan-dev/cli@0.0.5

## 0.0.6

### Patch Changes

- 3ec3add: infinite query generic

  select option 을 넘기지 않을 경우 잘못된 리턴 타입을 반환하는 버그를 수정했습니다.

  ```ts
  contractApi.businessContractBoardList// (arg) => Promise<SomeType>

  export const useSomeInfiniteQuery = <
    TData = RequestFnReturn<typeof contractApi.businessContractBoardList>
  >(
    params: InfiniteQueryHookParams<
      typeof contractApi.businessContractBoardList,
      AxiosError<any>,
      TData
    >,
  ) => {
    return useInfiniteQuery({...});
  };

  const { data } = useSomeIniniteQuery()

  console.log(data)
  // expect type : {pages: SomeType[], pageParams: [...]}
  // recivied type: SomeType
  ```

  생성되는 infiniteQuery hook 의 제너릭의 기본값이 수정 되었습니다.

  ```ts
  export const useSomeInfiniteQuery = <
    TData = InfiniteData<
      RequestFnReturn<typeof contractApi.businessContractTableList>,
      Parameter<typeof contractApi.businessContractTableList>
    >,
    >,
  >(
    params: InfiniteQueryHookParams<
      typeof contractApi.businessContractBoardList,
      AxiosError<any>,
      TData
    >,
  ) => {
    return useInfiniteQuery({...});
  };

  const { data } = useSomeIniniteQuery()

  console.log(data)
  // expect type : {pages: SomeType[], pageParams: [...]}
  // recivied type: {pages: SomeType[], pageParams: [...]}
  ```

## 0.0.5

### Patch Changes

- b854210: fix react query type

  '<' 와 같은 꺽쇠가 escape 처리 되는 이슈를 수정했습니다.

## 0.0.4

### Patch Changes

- @toktokhan-dev/cli@0.0.4
- @toktokhan-dev/node@0.0.3

## 0.0.3

### Patch Changes

- @toktokhan-dev/cli@0.0.3
- @toktokhan-dev/node@0.0.2

## 0.0.2

### Patch Changes

- Updated dependencies [515de8f]
  - @toktokhan-dev/cli@0.0.2

## 0.0.1

### Patch Changes

- eb93d14: 똑똑한개발자 공식 CLI 플러그인 입니다.
  자세한 설명은 [공식문서](https://toktokhan-dev-docs.vercel.app/docs/category/offical-plugins)를 참조해주세요.

  # Cli-plugin-gen-api-react-query

  Swagger 의 json 을 조회하여 타입정의와 api class, react-query 관련 모듈을 생성합니다. axios 를 사용하는 환경에서 사용가능합니다.

  # Cli-plugin-gen-icon-chakra

  지정된 경로의 svg파일 기반으로 Chakra UI Icon Component 를 생성합니다.

  # Cli-plugin-gen-img

  이미지 경로를 읽어 객체로 생성해줍니다.

  # Cli-plugin-gen-route-pages

  pages 폴더를 조회하여 route 경로를 포함한 객체를 생성합니다. next.js page router에서 사용가능합니다.

  # Cli-plugin-gen-sitemap-next-page

  next.js page router버전의 pages 폴더 기반으로 sitemap.xml 파일을 생성합니다.

  # Cli-plugin-gen-theme-chakra

  theme json 파일기반으로 Chakra theme token을 생성합니다.

- Updated dependencies [7f14e85]
- Updated dependencies [6c928f0]
  - @toktokhan-dev/cli@0.0.1
  - @toktokhan-dev/node@0.0.1

## 0.4.1

### Patch Changes

- Updated dependencies [0f43837]
  - @toktokhan-dev/node@2.0.0
  - @toktokhan-dev/cli@1.4.4

## 0.4.0

### Minor Changes

- 28c5efe: support http client for fetch

### Patch Changes

- be4a9cb: support http client for fetch

## 0.3.3

### Patch Changes

- Updated dependencies [bb60ca7]
  - @toktokhan-dev/node@1.3.1
  - @toktokhan-dev/cli@1.4.3

## 0.3.2

### Patch Changes

- 5b8176f: ignore sourcemap files
- Updated dependencies [5b8176f]
  - @toktokhan-dev/cli@1.4.2

## 0.3.1

### Patch Changes

- Updated dependencies [246b9a2]
  - @toktokhan-dev/cli@1.4.1

## 0.3.0

### Minor Changes

- 7baac8a: test version up

### Patch Changes

- Updated dependencies [7baac8a]
  - @toktokhan-dev/cli@1.4.0
  - @toktokhan-dev/node@1.3.0

## 0.2.1

### Patch Changes

- Updated dependencies [36d6b72]
  - @toktokhan-dev/cli@1.3.0

## 0.2.0

### Minor Changes

- ea08e81: update temp

### Patch Changes

- Updated dependencies [ea08e81]
  - @toktokhan-dev/cli@1.2.0
  - @toktokhan-dev/node@1.2.0

## 0.1.0

### Minor Changes

- b75ab4c: update

### Patch Changes

- Updated dependencies [b75ab4c]
  - @toktokhan-dev/cli@1.1.0
  - @toktokhan-dev/node@1.1.0

## 0.0.2

### Patch Changes

- Updated dependencies [c260db0]
  - @toktokhan-dev/node@1.0.1
  - @toktokhan-dev/cli@1.0.1
