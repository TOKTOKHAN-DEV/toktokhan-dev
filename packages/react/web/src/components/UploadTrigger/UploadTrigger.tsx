import { InputHTMLAttributes, cloneElement, useRef } from 'react'

export interface UploadTriggerProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 자식 Element 입니다. number 나 string 이 아닌 jsx element 나 component 를 넣어주세요
   */
  children: React.ReactElement
  /**
   * @default 'onClick'
   * 자식 Element 의 props name 중 트리거 할 이벤트를 지정합니다. 기본값은 'onClick' 입니다.
   */
  by?: string
}

/**
 * 웹에서 파일 업로드를 트리거 하는 컴포넌트 입니다.
 *
 * 자식 element 에 by 로 지정한 이벤트를 트리거 하면 display none 처리 되어있는 input[type="file"] 클릭되어 파일 선택 창이 열립니다.
 * UploadTrigger 의 props 는 숨겨져 있는 input 의 prop 으로 전달되기때문에,
 * UploadTrigger 의 onChange prop 으로 선택된 파일에 접근이 가능합니다.
 *
 * @category Component
 *
 * @example
 *
 * ```tsx
 * <UploadTrigger by="onClick" onChange={(e) => console.log(e.target.files?.[0]) }>
 *   <button>Upload</button>
 * </UploadTrigger>
 * ```
 *
 */
export const UploadTrigger = ({
  children,
  by = 'onClick',
  ...props
}: UploadTriggerProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  return (
    <>
      {cloneElement(children, { [by]: handleClick })}
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        value=""
        {...props}
      />
    </>
  )
}
