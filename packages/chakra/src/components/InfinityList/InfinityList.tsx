import { ReactNode } from 'react'

import { Box, BoxProps, Center, StackProps, VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useIntersectionObserver } from '@toktokhan-dev/react-web'

import { isEmpty } from 'lodash'

export interface InfinityListProps<T> {
  /**
   * 렌더링할 아이템
   */
  data: T[]

  /**
   *
   */
  renderItem: ({ item, index }: { item: T; index: number }) => ReactNode | null

  /**
   * 다음 페이지가 있는지 여부
   */
  hasMore: boolean

  /**
   * 데이터를 가져오고 있는지 여부
   */
  isFetching: boolean

  /**
   * 데이터를 가져오는 함수
   */
  onFetchMore: () => void

  /**
   * IntersectionObserver 옵션
   */
  observerOption?: IntersectionObserverInit

  /**
   * isFetching 시 보여줄 스피너
   */
  spinner?: ReactNode

  /**
   * 데이터가 없을 때 보여줄 컴포넌트
   */
  empty?: ReactNode

  /**
   * 스타일
   */
  styles?: {
    /**
     * 컨테이너 스타일
     */
    container?: StackProps

    /**
     * 아이템 컨테이너 스타일
     */
    itemContainer?: BoxProps

    /**
     * 바텀 플래그 스타일
     */
    bottomFlag?: BoxProps
  }
}

/**
 * @category Component
 *
 * 무한 스크롤을 구현할 수 있는 컴포넌트입니다.
 * data 와 renderItem 을 직접 받아 랜더링합니다.
 *
 * 스크롤이 끝에 도달하여 observer 가 보고 있는 요소가 화면에 보이면 `onFetchMore` 함수를 호출합니다.
 *
 * @example
 *
 * ```tsx
 *
 * const ExampleComponent = () => {
 * const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostsInfiniteQuery();
 *
 * return (
 *  <InfinityList
 *    data={data}
 *    hasMore={hasNextPage}
 *    isFetching={isFetchingNextPage}
 *    onFetchMore={fetchNextPage}
 *    renderItem={({ item, index }) => <PostItem key={index} item={item} />}
 *    />
 *  )
 * }
 * ```
 */
export const InfinityList = <T,>({
  data,
  renderItem,
  hasMore,
  isFetching,
  onFetchMore,
  observerOption,
  empty,
  spinner = (
    <Center>
      <Spinner size={'sm'} />
    </Center>
  ),
  styles,
}: InfinityListProps<T>) => {
  const { targetRef: bottomRef } = useIntersectionObserver({
    onVisible: () => {
      if (!isFetching && hasMore) {
        onFetchMore()
      }
    },
    options: {
      root: observerOption?.root ?? null,
      rootMargin: observerOption?.rootMargin ?? '0px',
      threshold: observerOption?.threshold ?? 0.5,
    },
  })

  if (isEmpty(data)) return empty

  return (
    <VStack as={'ul'} spacing={'0px'} w={'100%'} {...styles?.container}>
      {data?.map((item, index) => (
        <Box as={'li'} w={'100%'} key={index} {...styles?.itemContainer}>
          {renderItem({ item, index })}
        </Box>
      ))}
      <Box ref={bottomRef} {...styles?.bottomFlag}>
        {isFetching && spinner}
      </Box>
    </VStack>
  )
}
