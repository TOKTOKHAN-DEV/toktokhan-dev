import { useState } from 'react'

import { GitHubManager } from '@toktokhan-dev/github'
import { Obj } from '@toktokhan-dev/universal'

import { TabKeys } from '../../../../App'
import { getRepositoryInfo } from '../utils/get-repository-info'
import { showAlert } from '../utils/show-alert'
import useGithubForm from './useGithubForm'

interface GithubContentProps {
  data: Obj
  activeTab: TabKeys
}
export const useGithub = ({ data, activeTab }: GithubContentProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formData = useGithubForm()
  const {
    handleSubmit,
    formState: { isValid, isDirty },
    reset,
  } = formData

  const isDisable = !isValid || !isDirty

  const synchronizeGithub = handleSubmit(async (formData) => {
    setIsLoading(true)
    const repoInfo = getRepositoryInfo(formData.repoUrl)

    const github = new GitHubManager({
      token: formData.token,
      repo: repoInfo.repo,
      owner: repoInfo.owner,
    })

    const stringContent = JSON.stringify(data, null, 2)
    try {
      await github.updateExistRepo({
        contents: [stringContent],
        paths: [formData.source_path || 'public/token.json'],
        message: formData.commit_msg || 'update design token',
        branchName: formData.head_branch_name || 'design-token',
        baseBranchName: formData.base_branch_name || 'main',
      })
      showAlert('Github에 업로드 되었습니다. 레포지토리를 확인해주세요.')
      setIsLoading(false)
    } catch (err) {
      const errorData = err as any
      showAlert(errorData)
      setIsLoading(false)
    }
  })

  return {
    isLoading,
    isDisable,
    synchronizeGithub,
    formData,
  }
}
