import { useCallback, useState } from 'react'

/**
 * 특정 로직을 동작시킬 때 비동기로 제어권을 양도하는 로직을 쉽게 사용하기 위해 구현한 hooks 입니다.
 *
 * endYield 함수의 인자로 값을 전달한다면 startYield의 반환값으로 사용할 수 있습니다.
 *
 * @category Hooks
 *
 * @returns startYield / endYield 함수
 *
 * @example
 *
 * ```tsx
 * 
 *  // hooks 선언
 *  const {endYield, startYield} = useYieldLogic();
 * 
 *  // 변경함수
 *  const onClickSubmit = async() => {
 *  // 만약 유의사항을 띄워야 한다면 유의사항 모달을 띄운 후, startYield를 호출하여 함수의 제어권을 넘깁니다.
 *    if (isPrecaution) {
 *      openPrecautionModal();
 *      const count = await startYield();
 *    }
 * 
 *    // 조회 API 호출로직...
 *  }

 *  const onClickPrecautionConfirm = () => {
 *   // 유의사항 모달에서 확인을 눌렀을 때 endYield를 호출하여 다시 제어권을 startYield 함수로 옮깁니다.
 *    endYield(3); // 인자의 유무는 자유이며, 여기서 전달한 인자를 startYield 에서 return받습니다.
 *    closePrecautionModal();
 *  }
 * 
 *
 * ```
 *
 */
export const useYieldLogic = <T,>() => {
  const [resolve, setResolve] = useState<(v: T) => void>()

  const startYield = useCallback(() => {
    return new Promise((resolve) => {
      setResolve(() => resolve)
    })
  }, [])

  const endYield = useCallback(
    (v: T) => {
      resolve?.(v)
    },
    [resolve],
  )

  return {
    startYield,
    endYield,
  }
}
