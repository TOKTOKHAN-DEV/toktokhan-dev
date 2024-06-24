import {
  CSSProperties,
  HTMLAttributes,
  ReactElement,
  cloneElement,
  useCallback,
  useMemo,
} from 'react'

import { isNull } from 'lodash'

import { SOCIALS } from '../constants/socials'
import { SocialType } from '../types/social'

/**
 * `FullButtonProps`는 `FullButton` 컴포넌트가 받는 속성들을 정의합니다.
 * HTMLAnchorElement의 속성을 상속하며, 추가적으로 아래의 속성들을 가집니다.
 */
export interface FullButtonProps {
  /**
   * anchor 태그의 스타일을 설정합니다.
   */
  style?: HTMLAttributes<HTMLAnchorElement>['style']
  /**
   * onClick 속성을 설정합니다.
   */
  onClick?: HTMLAttributes<HTMLAnchorElement>['onClick']
  /**
   * 버튼의 색상 모드를 설정합니다. 'light' 또는 'dark' 중 하나를 선택할 수 있습니다.
   * @default 'dark'
   */
  colorMode?: 'light' | 'dark'

  /**
   * 소셜 타입을 지정합니다. 이를 통해 버튼의 스타일과 레이블이 결정됩니다.
   */
  socialType: SocialType

  /**
   * 버튼 내 콘텐츠의 정렬을 지정합니다. 'left' 또는 'center' 중 하나를 선택할 수 있습니다.
   * @default 'center'
   */
  align?: 'left' | 'center'

  /**
   * 버튼의 언어를 설정합니다. 'en' 또는 'ko' 중 하나를 선택할 수 있습니다.
   * @default 'ko'
   */
  lang?: 'en' | 'ko'

  /**
   * 버튼에 표시될 레이블을 설정합니다. null 값을 통해 레이블을 숨길 수 있습니다.
   */
  label?: string | null

  /**
   * 버튼에 표시될 아이콘을 설정합니다. ReactElement 타입이어야 합니다.
   */
  icon: ReactElement

  /**
   * 아이콘의 스타일을 설정합니다.
   */
  iconStyle?: HTMLAttributes<HTMLOrSVGElement>['style']

  /**
   * 레이블의 스타일을 설정합니다.
   */
  labelStyle?: HTMLAttributes<HTMLLabelElement>['style']
}

/**
 * 소셜 로그인 버튼을 생성합니다.
 *
 * @param props 컴포넌트가 받는 속성들
 * @returns 렌더링된 버튼
 */
export const FullButton = ({
  colorMode = 'dark',
  socialType,
  align = 'center',
  lang = 'ko',
  label,
  style,
  icon,
  iconStyle,
  onClick,
  ...props
}: FullButtonProps): ReactElement => {
  const handleClick = useCallback(
    (e: any) => {
      e.preventDefault()
      return onClick?.(e)
    },
    [onClick],
  )

  const alignStyle: Record<'container' | 'label', CSSProperties> =
    useMemo(() => {
      switch (align) {
        case 'left':
          return {
            container: {
              justifyContent: 'space-between',
            },
            label: {
              flex: 1,
              textAlign: 'center',
            },
          }
        case 'center':
          return {
            container: {
              justifyContent: 'center',
              gap: '8px',
            },
            label: {},
          }
        default:
          return { container: {}, label: {} }
      }
    }, [align])

  const clonedIcon = useMemo(() => {
    return cloneElement(icon, {
      width: '18px',
      height: '18px',
      color: SOCIALS[socialType].style[colorMode]?.icon,
      ...icon.props,
      ...iconStyle,
    })
  }, [icon, socialType, colorMode, iconStyle])

  return (
    <a
      href="#javascript"
      onClick={handleClick}
      id={`${socialType}-login-button`}
      aria-label={`${socialType}-login-button`}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        border: 'none',
        borderRadius: '6px',
        fontSize: '15px',
        lineHeight: '1.5',
        fontWeight: 700,
        padding: '11px 14px',
        backgroundColor: SOCIALS[socialType].style[colorMode].bg,
        color: SOCIALS[socialType].style[colorMode].label,
        ...alignStyle.container,
        ...style,
      }}
      {...props}
    >
      {clonedIcon}
      {!isNull(label) && (
        <label
          style={{
            whiteSpace: 'nowrap',
            ...alignStyle.label,
          }}
        >
          {label || SOCIALS[socialType][lang]}
        </label>
      )}
    </a>
  )
}
