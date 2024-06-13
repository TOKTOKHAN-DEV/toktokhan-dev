import React from 'react'

import { UseFormReturn } from 'react-hook-form'

import FormHelper from '../../../../../common/FormHelper'
import Input from '../../../../../common/Input'
import TextArea from '../../../../../common/TextArea'
import { FormDataType } from '../../../hooks/useGithubForm'

interface GithubFormViewProps {
  formData: UseFormReturn<FormDataType>
}

const GithubOptionFormView = ({
  formData: {
    register,
    formState: { errors },
  },
  ...basisProps
}: GithubFormViewProps) => {
  return (
    <div className="flex flex-col gap-y-[16px]">
      <FormHelper
        label="Base brunch name"
        errorText={errors.base_branch_name?.message}
      >
        <Input {...register('base_branch_name')} placeholder={`main`} />
      </FormHelper>
      <FormHelper
        label="Head brunch name"
        errorText={errors.head_branch_name?.message}
      >
        <Input {...register('head_branch_name')} placeholder={`design-token`} />
      </FormHelper>
      <FormHelper label="Source path" errorText={errors.source_path?.message}>
        <Input {...register('source_path')} placeholder={'public/token.json'} />
      </FormHelper>
      <FormHelper label="Commit message" errorText={errors.commit_msg?.message}>
        <TextArea
          {...register('commit_msg')}
          className="h-[112px]"
          placeholder={'Update design token'}
        />
      </FormHelper>
    </div>
  )
}

export default GithubOptionFormView
