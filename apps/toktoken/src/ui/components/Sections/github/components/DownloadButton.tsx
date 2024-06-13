import { DownloadIcon } from '../../../../generated/icons'
import Button from '../../../@headless/Button'
import { ButtonProps } from '../../../@headless/Button/Button'

const DownloadButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      className={'flex justify-center w-[81px] h-[48px]'}
      styles={{
        _base: 'bg-button-secondary',
        _hover: 'bg-button-secondary-hover',
        _active: 'bg-button-secondary',
      }}
      {...props}
    >
      <DownloadIcon />
    </Button>
  )
}

export default DownloadButton
