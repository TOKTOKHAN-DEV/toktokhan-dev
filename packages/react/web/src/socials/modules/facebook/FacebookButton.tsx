import { FullButton, FullButtonProps } from '../../components/FullButton'
import { FacebookIcon } from '../../generated/icons'

/**
 * FullButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 */
export interface FacebookButtonProps
  extends Omit<FullButtonProps, 'socialType' | 'icon'> {}

/**
 * @category Socials/Facebook
 *
 * 페이스북 버튼 UI 컴포넌트입니다.
 * {@link @toktokhan-dev/react-web#FullButton | `FullButton`} 컴포넌트를 기반으로 하여, 페이스북 아이콘과 스타일, 레이블을 포함합니다.
 *
 * @param props -FullButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 * @returns 페이스북 버튼 컴포넌트를 반환합니다.
 */
export const FacebookButton = (props: FacebookButtonProps) => {
  return (
    <FullButton
      socialType="facebook"
      icon={<FacebookIcon style={{ marginBottom: '2px' }} />}
      {...props}
    />
  )
}
