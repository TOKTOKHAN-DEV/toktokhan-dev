import { FunctionComponent, memo } from 'react'

import { IconButton, IconButtonProps } from 'socials/components/IconButton'

import { FullButton, FullButtonProps } from '../../components/FullButton'
import { KakaoIcon } from '../../generated/icons'

export interface KakaoButtonProps
  extends Omit<FullButtonProps, 'socialType' | 'icon'> {}

export interface KakaoIconButtonProps
  extends Omit<IconButtonProps, 'socialType' | 'icon'> {}

/**
 * @category Socials/Kakao
 *
 * 카카오 소셜 로그인 버튼 UI 컴포넌트입니다.
 *  {@link @toktokhan-dev/react-web#FullButton | `FullButton`} 컴포넌트를 기반으로 하여, 카카오 아이콘과 스타일, 레이블을 포함합니다.
 */
export const KakaoButton: FunctionComponent<KakaoIconButtonProps> = memo(
  ({ style, ...props }) => {
    return (
      <FullButton
        socialType="kakao"
        icon={<KakaoIcon />}
        style={{
          ...style,
        }}
        {...props}
      />
    )
  },
)

/**
 * @category Socials/Kakao
 *
 * 카카오 소셜 로그인 아이콘 버튼 UI 컴포넌트입니다.
 *  {@link @toktokhan-dev/react-web#IconButton | `IconButton`} 컴포넌트를 기반으로 하며, 카카오 아이콘과 스타일, 레이블을 포함합니다.
 */
export const KakaoIconButton: FunctionComponent<KakaoIconButtonProps> = memo(
  ({ style, ...props }) => {
    return (
      <IconButton
        socialType="kakao"
        icon={<KakaoIcon />}
        style={{
          ...style,
        }}
        {...props}
      />
    )
  },
)

KakaoButton.displayName = 'KakaoButton'
KakaoIconButton.displayName = 'KakaoIconButton'
