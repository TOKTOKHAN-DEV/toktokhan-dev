import Button from '../../../@headless/Button'
import { ButtonProps } from '../../../@headless/Button/Button'

interface UploadButtonProps extends ButtonProps {}

const UploadButton = ({ ...props }: UploadButtonProps) => {
  return (
    <Button
      className={'flex justify-center w-[175px] h-[48px]'}
      styles={{
        _base: 'bg-button-primary',
        _hover: 'bg-button-primary-hover',
        _active: 'bg-button-primary',
      }}
      {...props}
    >
      Upload to Github
    </Button>
  )
}

export default UploadButton
