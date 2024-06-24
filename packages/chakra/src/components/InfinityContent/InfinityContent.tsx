import { ReactNode } from 'react'

import { Box, BoxProps, Center } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useIntersectionObserver } from '@toktokhan-dev/react-web'

export interface InfinityContentProps {
  /**
   * 자식 컴포넌트
   */
  children: ReactNode
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
   * 스타일
   */
  styles?: {
    /**
     * 컨테이너 스타일
     */
    container?: BoxProps
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
 * 자식에 랜더링하고 싶은 컴포넌트(리스트 컴포넌트)를 받아 랜더링합니다.
 * 유저의 화면이 스크롤 될때 observer 가 보고 있는 요소가 화면에 보이면 `onFetchMore` 함수를 호출합니다.
 *
 * @example
 * ```tsx
 *
 * const ExampleComponent = () => {
 *  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostsInfiniteQuery();
 *
 *  return (
 *   <InfinityContent
 *      hasMore={hasNextPage}
 *      isFetching={isFetchingNextPage}
 *      onFetchMore={fetchNextPage}
 *   >
 *    <PostList data={data} />
 *  </InfinityContent>
 *  )
 * }
 * ```
 *
 */
export const InfinityContent = ({
  children,
  hasMore,
  isFetching,
  onFetchMore,
  observerOption,
  styles,
  spinner = (
    <Center>
      <Spinner size={'sm'} />
    </Center>
  ),
}: InfinityContentProps) => {
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

  return (
    <Box w={'100%'} {...styles?.container}>
      {children}
      <Box ref={bottomRef} {...styles?.bottomFlag}>
        {isFetching && spinner}
      </Box>
    </Box>
  )
}
