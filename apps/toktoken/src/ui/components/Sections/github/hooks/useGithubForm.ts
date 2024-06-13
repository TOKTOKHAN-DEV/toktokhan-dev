import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

export type FormDataType = {
  token: string
  repoUrl: string
  base_branch_name?: string
  head_branch_name?: string
  commit_msg?: string
  source_path?: string
}

export const githubFormSchema = yup.object().shape({
  token: yup.string().required('This field is required.'),
  repoUrl: yup
    .string()
    .required('This field is required.')
    .matches(
      /^https:\/\/github\.com\/[^/]+\/[^/]+$/,
      'This field must be a valid GitHub URL.',
    ),
  base_branch_name: yup.string(),
  head_branch_name: yup.string(),
  commit_msg: yup.string(),
  source_path: yup.string(),
})

const useGithubForm = (options?: UseFormProps<FormDataType>) => {
  return useForm<FormDataType>({
    resolver: yupResolver(githubFormSchema),
    mode: 'onChange',
    ...options,
  })
}

export default useGithubForm
