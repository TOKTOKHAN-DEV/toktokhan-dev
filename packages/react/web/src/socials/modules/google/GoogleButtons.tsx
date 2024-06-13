import { FunctionComponent, memo } from 'react'

import { IconButton, IconButtonProps } from 'socials/components/IconButton'

import { FullButton, FullButtonProps } from '../../components/FullButton'
import { GoogleIcon } from '../../generated/icons'

export interface GoogleButtonProps
  extends Omit<FullButtonProps, 'socialType' | 'icon'> {}

export interface GoogleIconButtonProps
  extends Omit<IconButtonProps, 'socialType' | 'icon'> {}

/**
 * @category Socials/Google
 *
 * 구글소셜 로그인 버튼 UI 컴포넌트입니다.
 * {@link @toktokhan-dev/react-web#FullButton | `FullButton`} 컴포넌트를 기반으로 하여, 구글 아이콘과 스타일, 레이블을 포함합니다.
 */
export const GoogleButton: FunctionComponent<GoogleIconButtonProps> = memo(
  ({ style, ...props }) => {
    return (
      <FullButton
        socialType="google"
        icon={<GoogleIcon />}
        style={{
          boxShadow: '0px 0px 12px 0px rgba(0, 0, 0, 0.10)',
          ...style,
        }}
        {...props}
      />
    )
  },
)

/**
 * @category Socials/Google
 *
 * 구글 소셜 로그인 아이콘 버튼 UI 컴포넌트입니다.
 * 아이콘 버튼으로 사용되며 레이블과 함께 표기됩니다.
 * {@link @toktokhan-dev/react-web#IconButton | `IconButton`} 컴포넌트를 기반으로 하며, 구글 아이콘 및 버튼 스타일링이 가능합니다.
 */
export const GoogleIconButton: FunctionComponent<GoogleIconButtonProps> = memo(
  ({ style, iconStyle, ...props }) => {
    return (
      <IconButton
        socialType="google"
        icon={<GoogleIcon />}
        style={{
          ...style,
        }}
        iconStyle={{
          ...iconStyle,
        }}
        {...props}
      />
    )
  },
)

GoogleButton.displayName = 'GoogleButton'
GoogleIconButton.displayName = 'GoogleIconButton'
