import { ReactNode } from 'react'

import { FullButton, FullButtonProps } from '../../components/FullButton'
import { KakaoIcon } from '../../generated/icons'

/**
 * FullButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 */
export interface KakaoButtonProps
  extends Omit<FullButtonProps, 'socialType' | 'icon'> {}

/**
 * @category Socials/Kakao
 *
 * 네이버 버튼 UI 컴포넌트입니다.
 * {@link @toktokhan-dev/react-web#FullButton | `FullButton`} 컴포넌트를 기반으로 하여, 네이버 아이콘과 스타일, 레이블을 포함합니다.
 *
 * @param props -FullButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 * @returns 네이버 버튼 컴포넌트를 반환합니다.
 */
export const KakaoButton = (props: KakaoButtonProps): ReactNode => {
  return <FullButton socialType="kakao" icon={<KakaoIcon />} {...props} />
}
