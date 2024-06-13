import { uiAction } from '../../../../action/ui'
import { ResizeIcon } from '../../../generated/icons'
import { useFetch } from '../../../hooks/useFetch'
import useResize from './hooks/useResize'

interface FooterProps {}

const Footer = ({ ...props }: FooterProps) => {
  const { cornerRef } = useResize()

  const { data: editorType } = useFetch(uiAction.editorType.request)

  return (
    <div className="h-18 flex align-middle justify-between flex-shrink-0 p-3 bg-white">
      {/* LOGO
      <div className="flex align-middle justify-between gap-3">
        <p>V 0.0.1</p>
        <p>Community</p>
        <a href="#">Docs</a>
      </div> */}
      {editorType !== 'dev' && (
        <ResizeIcon
          ref={cornerRef}
          id="corner"
          width="16"
          height="16"
          className="absolute right-0 bottom-0 cursor-se-resize"
        />
      )}
    </div>
  )
}

export default Footer
