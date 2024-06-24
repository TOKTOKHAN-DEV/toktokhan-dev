import { FullButton, FullButtonProps } from '../../components/FullButton'
import { GoogleIcon } from '../../generated/icons'

/**
 * FullButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 */
export interface GoogleButtonProps
  extends Omit<FullButtonProps, 'socialType' | 'icon'> {}

/**
 * @category Socials/Google
 *
 * 구글 버튼 UI 컴포넌트입니다.
 * {@link @toktokhan-dev/react-web#FullButton | `FullButton`} 컴포넌트를 기반으로 하여, 구글 아이콘과 스타일, 레이블을 포함합니다.
 *
 * @param props -FullButtonProps에서 'socialType'과 'icon'을 제외한 속성들을 상속받습니다.
 * @returns 구글 버튼 컴포넌트를 반환합니다.
 */
export const GoogleButton = ({ style, ...props }: GoogleButtonProps) => {
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
}
