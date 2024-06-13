import { FunctionComponent, memo } from 'react'

import { IconButton, IconButtonProps } from 'socials/components/IconButton'

import { FullButton, FullButtonProps } from '../../components/FullButton'
import { NaverIcon } from '../../generated/icons'

/**
 * NaverButtonProps는 FullButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 */
export interface NaverButtonProps
  extends Omit<FullButtonProps, 'socialType' | 'icon'> {}

/**
 * NaverIconButtonProps는 IconButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 */
export interface NaverIconButtonProps
  extends Omit<IconButtonProps, 'socialType' | 'icon'> {}

/**
 * @category Socials/Naver
 *
 * 네이버 소셜 로그인 버튼 UI 컴포넌트입니다.
 * {@link @toktokhan-dev/react-web#FullButton | `FullButton`} 컴포넌트를 기반으로 하여, 네이버 아이콘과 스타일, 레이블을 포함합니다.
 *
 * @param {NaverButtonProps} props - NaverButton 컴포넌트에 전달되는 props입니다.
 * @param {React.CSSProperties} props.style - 버튼에 적용할 CSS 스타일입니다.
 * @returns {React.ReactElement} 네이버 소셜 로그인 버튼 컴포넌트를 반환합니다.
 */
export const NaverButton: FunctionComponent<NaverButtonProps> = memo(
  ({ style, ...props }) => {
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
        style={{
          ...style,
        }}
        {...props}
      />
    )
  },
)

/**
 * @category Socials/Naver
 *
 * 네이버 소셜 로그인 아이콘 버튼 UI 컴포넌트입니다.
 * 아이콘 버튼으로 사용되며 레이블과 함께 표기됩니다.
 * {@link @toktokhan-dev/react-web#IconButton | `IconButton`} 컴포넌트를 기반으로 하며, 네이버 아이콘 및 버튼 스타일링이 가능합니다.
 */
export const NaverIconButton: FunctionComponent<NaverButtonProps> = memo(
  ({ style, ...props }) => {
    return (
      <IconButton
        socialType="naver"
        icon={<NaverIcon />}
        style={{
          ...style,
        }}
        {...props}
      />
    )
  },
)

NaverButton.displayName = 'NaverButton'
NaverIconButton.displayName = 'NaverIconButton'
