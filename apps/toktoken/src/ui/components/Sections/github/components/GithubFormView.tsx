import { useEffect } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { TabKeys } from '../../../../App'
import FormHelper from '../../../common/FormHelper'
import Input from '../../../common/Input'
import { FormDataType } from '../hooks/useGithubForm'

interface GithubFormViewProps {
  formData: UseFormReturn<FormDataType>
  activeTab: TabKeys
}

const GithubFormView = ({
  formData: {
    register,
    formState: { errors },
    setValue,
    reset,
  },

  activeTab,
}: GithubFormViewProps) => {
  useEffect(() => {
    reset()
    if (activeTab === 'internal') {
      setValue('token', process.env.TOKTOKEN_GITHUB_TOKEN || '')
    }
  }, [activeTab, reset, setValue])

  return (
    <div>
      <FormHelper
        isRequired
        label="Repository URl"
        errorText={errors.repoUrl?.message}
      >
        <Input
          autoFocus
          {...register('repoUrl')}
          placeholder={`Enter Repository URL`}
        />
      </FormHelper>
      {activeTab === 'external' && (
        <FormHelper
          isRequired
          label="Personal access token"
          errorText={errors.token?.message}
        >
          <Input {...register('token')} placeholder="Enter token" />
        </FormHelper>
      )}
    </div>
  )
}

export default GithubFormView
