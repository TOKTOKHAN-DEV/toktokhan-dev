import { IconButton, IconButtonProps } from 'socials/components/IconButton'

import { GoogleIcon } from '../../generated/icons'

/**
 * IconButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 */
export interface GoogleIconButtonProps
  extends Omit<IconButtonProps, 'socialType' | 'icon'> {}

/**
 * @category Socials/Google
 *
 * 구글 아이콘 버튼 UI 컴포넌트입니다.
 * {@link @toktokhan-dev/react-web#IconButton | `IconButton`} 컴포넌트를 기반으로 하며, 구글 아이콘 및 버튼 스타일링이 가능합니다.
 *
 *  @param props - IconButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 * @returns 구글 아이콘 버튼 컴포넌트를 반환합니다.
 */
export const GoogleIconButton = ({
  style,
  iconStyle,
  ...props
}: GoogleIconButtonProps) => {
  return (
    <IconButton
      socialType="google"
      icon={<GoogleIcon />}
      style={{
        ...style,
      }}
      {...props}
    />
  )
}
