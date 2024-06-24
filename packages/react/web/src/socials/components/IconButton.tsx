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
 * `IconButtonProps`는 `IconButton` 컴포넌트가 받는 속성들을 정의합니다.
 * HTMLAnchorElement의 속성을 상속하며, 추가적으로 아래의 속성들을 가집니다.
 */
export interface IconButtonProps {
  /**
   * anchor 태그의 스타일을 설정합니다.
   */
  style?: HTMLAttributes<HTMLAnchorElement>['style']
  /**
   * onClick 속성을 설정합니다.
   */
  onClick?: HTMLAttributes<HTMLAnchorElement>['onClick']
  /**
   * 아이콘 버튼의 모양을 결정합니다. 'full', 'rounded', 'square' 중 하나를 선택할 수 있습니다.
   * @default 'full'
   */
  variant?: 'full' | 'rounded' | 'square'

  /**
   * 아이콘 버튼의 색상 모드를 설정합니다. 'light' 또는 'dark' 중 하나를 선택할 수 있습니다.
   * @default 'dark'
   */
  colorMode?: 'light' | 'dark'

  /**
   * 소셜 타입을 지정합니다. 이를 통해 버튼의 스타일과 레이블이 결정됩니다.
   */
  socialType: SocialType

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
 * 소셜 로그인 아이콘 버튼을 생성합니다.
 *
 * @param props 컴포넌트가 받는 속성들
 * @returns  렌더링된 아이콘 버튼
 */
export const IconButton = ({
  colorMode = 'dark',
  socialType,
  lang = 'ko',
  variant = 'full',
  icon,
  label,
  style,
  iconStyle,
  labelStyle,
  onClick,
  ...props
}: IconButtonProps): ReactElement => {
  const handleClick = useCallback(
    (e: any) => {
      e.preventDefault()
      return onClick?.(e)
    },
    [onClick],
  )

  const variantStyle: Record<'icon' | 'label', CSSProperties> = useMemo(() => {
    switch (variant) {
      case 'full':
        return {
          icon: {
            borderRadius: '9999px',
          },
          label: {
            flex: 1,
          },
        }
      case 'rounded':
        return {
          icon: {
            borderRadius: '4px',
          },
          label: {},
        }
      case 'square':
        return {
          icon: {
            borderRadius: '0px',
          },
          label: {},
        }
      default:
        return { icon: {}, label: {} }
    }
  }, [variant])

  const clonedIcon = useMemo(() => {
    return cloneElement(icon, {
      color: SOCIALS[socialType].style[colorMode]?.icon,
      width: '20px',
      height: '20px',
      ...icon.props,
      ...iconStyle,
    })
  }, [icon, socialType, colorMode, iconStyle])

  return (
    <a
      onClick={handleClick}
      href="#javascript"
      id={`${socialType}-login-button`}
      aria-label={`${socialType}-login-button`}
      style={{
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        width: '51px',
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          aspectRatio: '1 / 1',
          border: 'none',
          borderRadius: '6px',
          backgroundColor: SOCIALS[socialType].style[colorMode].bg,
          color: SOCIALS[socialType].style[colorMode].label,
          ...variantStyle.icon,
          ...iconStyle,
          boxShadow: '0px 0px 12px 0px rgba(0, 0, 0, 0.10)',
        }}
      >
        {clonedIcon}
      </div>
      {!isNull(label) && (
        <label
          style={{
            fontSize: '10px',
            lineHeight: '1.5',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            ...variantStyle.label,
            ...labelStyle,
          }}
        >
          {label || SOCIALS[socialType][lang]}
        </label>
      )}
    </a>
  )
}
