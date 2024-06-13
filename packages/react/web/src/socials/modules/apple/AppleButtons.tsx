import { FunctionComponent, memo } from 'react'

import { IconButton, IconButtonProps } from 'socials/components/IconButton'

import { FullButton, FullButtonProps } from '../../components/FullButton'
import { AppleIcon } from '../../generated/icons'

export interface AppleButtonProps
  extends Omit<FullButtonProps, 'socialType' | 'icon'> {}
export interface AppleIconButtonProps
  extends Omit<IconButtonProps, 'socialType' | 'icon'> {}

/**
 * @category Socials/Apple
 *
 * 애플 소셜 로그인 버튼 UI 컴포넌트입니다.
 * {@link @toktokhan-dev/react-web#FullButton | `FullButton`} 컴포넌트를 기반으로 하여, 애플 아이콘과 스타일, 레이블을 포함합니다.
 */
export const AppleButton: FunctionComponent<AppleButtonProps> = memo(
  ({ style, ...props }) => {
    return (
      <FullButton
        socialType="apple"
        icon={
          <AppleIcon
            width={'18px'}
            height={'18px'}
            style={{ marginBottom: '3px' }}
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
 * @category Socials/Apple
 *
 * 애플 소셜 로그인 아이콘 버튼 UI 컴포넌트입니다.
 * 아이콘 버튼으로 사용되며 레이블과 함께 표기됩니다.
 * {@link @toktokhan-dev/react-web#IconButton | `IconButton`} 컴포넌트를 기반으로 하며, 애플 아이콘 및 버튼 스타일링이 가능합니다.
 */
export const AppleIconButton: FunctionComponent<AppleIconButtonProps> = memo(
  ({ style, ...props }) => {
    return (
      <IconButton
        socialType="apple"
        icon={<AppleIcon style={{ marginBottom: '3px' }} />}
        style={{
          ...style,
        }}
        {...props}
      />
    )
  },
)

AppleButton.displayName = 'AppleButton'
AppleIconButton.displayName = 'AppleIconButton'
