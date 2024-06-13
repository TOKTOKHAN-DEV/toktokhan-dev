import { FunctionComponent, memo } from 'react'

import { IconButton, IconButtonProps } from 'socials/components/IconButton'

import { FullButton, FullButtonProps } from '../../components/FullButton'
import { FacebookIcon } from '../../generated/icons'

export interface FacebookButtonProps
  extends Omit<FullButtonProps, 'socialType' | 'icon'> {}

export interface FacebookIconButtonProps
  extends Omit<IconButtonProps, 'socialType' | 'icon'> {}

/**
 * @category Socials/FaceBook
 *
 * 페이스북 소셜 로그인 버튼 UI 컴포넌트입니다.
 * {@link @toktokhan-dev/react-web#FullButton | `FullButton`} 컴포넌트를 기반으로 하여, 페이스북 아이콘과 스타일, 레이블을 포함합니다.
 */
export const FacebookButton: FunctionComponent<FacebookButtonProps> = memo(
  ({ style, ...props }) => {
    return (
      <FullButton
        socialType="facebook"
        icon={<FacebookIcon style={{ marginBottom: '2px' }} />}
        style={{
          ...style,
        }}
        {...props}
      />
    )
  },
)

/**
 * @category Socials/FaceBook
 *
 * 페이스북 소셜 로그인 아이콘 버튼 UI 컴포넌트입니다.
 * 아이콘 버튼으로 사용되며 레이블과 함께 표기됩니다.
 * {@link @toktokhan-dev/react-web#IconButton | `IconButton`} 컴포넌트를 기반으로 하며, 페이스북 아이콘 및 버튼 스타일링이 가능합니다.
 */
export const FacebookIconButton: FunctionComponent<FacebookButtonProps> = memo(
  ({ style, ...props }) => {
    return (
      <IconButton
        socialType="facebook"
        icon={
          <FacebookIcon
            width={'22px'}
            height={'22px'}
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

FacebookButton.displayName = 'FacebookButton'
FacebookIconButton.displayName = 'FacebookIconButton'
