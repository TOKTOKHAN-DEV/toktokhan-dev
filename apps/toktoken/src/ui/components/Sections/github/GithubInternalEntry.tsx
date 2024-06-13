import { useForm } from 'react-hook-form'

import FormHelper from '../../common/FormHelper'
import Input from '../../common/Input'

interface FormValues {
  password: string
}

interface GithubInternalEntryProps {
  onConfirm?: (userId: string) => void
  userId: string | null
}

const GithubInternalEntry = ({
  onConfirm,
  userId,
}: GithubInternalEntryProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    mode: 'onChange',
  })
  const setErrorMessage = (message: string) => setError('password', { message })
  const onSubmit = async (data: FormValues) => {
    const isConfirmed = data.password === process.env.TOKTOKEN_INTERNAL_PW
    if (!userId) {
      setErrorMessage('Invalid user. Please use the External tab.')
      return
    }

    if (!isConfirmed) {
      setErrorMessage('Invalid password. Please use the External tab.')
      return
    }

    onConfirm?.(userId)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full py-[24px] px-[16px]"
    >
      <FormHelper
        isRequired
        label="Password"
        errorText={errors.password?.message}
        helperText={`If you're not a member of TOKTOKHAN company, please use the "external" tab.`}
      >
        <Input
          type="password"
          autoFocus
          {...register('password', {
            required: 'This field is required.',
          })}
          placeholder="Enter Password"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSubmit(onSubmit)()
            }
          }}
        />
      </FormHelper>
      <button type="submit" style={{ display: 'none' }} />
    </form>
  )
}

export default GithubInternalEntry
