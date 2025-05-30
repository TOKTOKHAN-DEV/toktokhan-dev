import { ReactNode } from 'react'

import { FullButton, FullButtonProps } from '../../components/FullButton'
import { NaverIcon } from '../../generated/icons'

/**
 * FullButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 */
export interface NaverButtonProps
  extends Omit<FullButtonProps, 'socialType' | 'icon'> {}

/**
 * @category Socials/Naver
 *
 * 네이버 버튼 UI 컴포넌트입니다.
 * {@link @toktokhan-dev/react-web#FullButton | `FullButton`} 컴포넌트를 기반으로 하여, 네이버 아이콘과 스타일, 레이블을 포함합니다.
 *
 * @param props -FullButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 * @returns 네이버 버튼 컴포넌트를 반환합니다.
 */
export const NaverButton = (props: NaverButtonProps): ReactNode => {
  return (
    <FullButton
      socialType="naver"
      icon={
        <NaverIcon
          width={'14px'}
          height={'14px'}
          style={{ marginBottom: '2px' }}
        />
      }
      {...props}
    />
  )
}
