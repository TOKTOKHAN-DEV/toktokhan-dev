import { IconButton, IconButtonProps } from 'socials/components/IconButton'

import { FacebookIcon } from '../../generated/icons'

/**
 * IconButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 */
export interface FacebookIconButtonProps
  extends Omit<IconButtonProps, 'socialType' | 'icon'> {}

/**
 * @category Socials/Facebook
 *
 * 페이스북 아이콘 버튼 UI 컴포넌트입니다.
 * {@link @toktokhan-dev/react-web#IconButton | `IconButton`} 컴포넌트를 기반으로 하며, 페이스북 아이콘 및 버튼 스타일링이 가능합니다.
 *
 *  @param props - IconButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 * @returns 페이스북 아이콘 버튼 컴포넌트를 반환합니다.
 */
export const FacebookIconButton = (props: FacebookIconButtonProps) => {
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
      {...props}
    />
  )
}
