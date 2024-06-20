---
'@toktokhan-dev/cli-plugin-gen-api-react-query': patch
---

infinite query generic

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
