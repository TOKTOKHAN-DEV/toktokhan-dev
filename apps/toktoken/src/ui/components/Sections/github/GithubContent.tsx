import { Obj } from '@toktokhan-dev/universal'

import { TabKeys, TokenType } from '../../../App'
import { CategoryIcon, GithubIcon } from '../../../generated/icons'
import Checkbox from '../../@headless/Checkbox/Checkbox'
import CheckboxGroup from '../../@headless/Checkbox/CheckboxGroup'
import LoadingView from '../../common/LoadingView'
import { Section } from '../../common/Section'
import { Sections } from '../../common/Sections'
import DocsLink from './components/DocsLink'
import DownloadButton from './components/DownloadButton'
import GithubFormView from './components/GithubFormView'
import GithubOptions from './components/GithubOptions/GithubOptions'
import UploadButton from './components/UploadButton'
import useCheckbox from './hooks/useCheckbox'
import { useGithub } from './hooks/useGithub'

interface GithubContentProps {
  data: TokenType
  checkboxData: ReturnType<typeof useCheckbox>
  activeTab: TabKeys
}

const GithubContent = ({
  data,
  checkboxData,
  activeTab,
}: GithubContentProps) => {
  const { formData, isDisable, isLoading, synchronizeGithub } = useGithub({
    data,
    activeTab,
  })
  const {
    allChecked,
    isPending,
    checkedItems,
    isIndeterminate,
    setAll,
    toggleItem,
  } = checkboxData

  const downloadObjectAsJson = (exportObj: Obj, exportName: string) => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(exportObj, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', exportName + '.json')
    document.body.appendChild(downloadAnchorNode) // required for firefox
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  return (
    <form onSubmit={synchronizeGithub} className="m-0">
      <Sections className="flex flex-col flex-[1] gap-y-[32px]">
        <Section icon={<GithubIcon />} title="Github" rightSlot={<DocsLink />}>
          <GithubFormView formData={formData} activeTab={activeTab} />
        </Section>
        <Section icon={<CategoryIcon />} title="Category">
          {/* <LoadingView isLoading={isPending}> */}
          <CheckboxGroup>
            <Checkbox
              value={'all'}
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={(e) => setAll(e.target.checked)}
            >
              All
            </Checkbox>
            <Checkbox
              value={'color'}
              isChecked={checkedItems.has('colors')}
              onChange={() => toggleItem('colors')}
            >
              Color
            </Checkbox>
            <Checkbox
              value={'text'}
              isChecked={checkedItems.has('textStyles')}
              onChange={() => toggleItem('textStyles')}
            >
              Text
            </Checkbox>
          </CheckboxGroup>
          {/* </LoadingView> */}
        </Section>
        <div className="flex gap-[12px]">
          <DownloadButton
            isDisabled={checkedItems.size === 0}
            onClick={() => {
              downloadObjectAsJson(data, 'token')
            }}
          />
          <UploadButton
            type="submit"
            isLoading={isLoading}
            isDisabled={isDisable || isLoading}
          />
        </div>
      </Sections>
      <GithubOptions formData={formData} />
    </form>
  )
}

export default GithubContent
