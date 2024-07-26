---
'@toktokhan-dev/react-web': patch
---

New Component 'UploadTrigger'

새로운 컴포넌트 'UploadTrigge' 이 추가 되었습니다. 웹에서 파일 업로드를 트리거 하는 컴포넌트 입니다.

자식 element 에 by 로 지정한 이벤트를 트리거 하면 display none 처리 되어있는 input[type="file"] 클릭되어 파일 선택 창이 열립니다.
UploadTrigger 의 props 는 숨겨져 있는 input 의 prop 으로 전달되기때문에,
UploadTrigger 의 onChange prop 으로 선택된 파일에 접근이 가능합니다.

### example

```tsx
<UploadTrigger by="onClick" onChange={(e) => console.log(e.target.files?.[0])}>
  <button>Upload</button>
</UploadTrigger>
```

### exmaple 2

```tsx
type Props {
    text: string
    onAdd?: () => void
}

const Component = ({ onAdd, text }: Props) => {
  return <button onClick={onAdd}>{text}</button>
}

render(
  <UploadTrigger by="onAdd" onChange={mockOnChange}>
    <Component text="add" />
  </UploadTrigger>,
)
```

### upload trigger

```tsx
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
```
