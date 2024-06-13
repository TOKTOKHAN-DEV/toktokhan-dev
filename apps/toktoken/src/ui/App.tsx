import { useMemo, useState } from 'react'

import { Obj } from '@toktokhan-dev/universal'

import { twJoin } from 'tailwind-merge'

import { uiAction } from '../action/ui'
import Button from './components/@headless/Button'
import IconTabs from './components/IconTabs/IconTabs'
import Footer from './components/Layout/Footer/Footer'
import Layout from './components/Layout/Layout'
import GithubContent from './components/Sections/github/GithubContent'
import GithubGuard from './components/Sections/github/GithubGuard'
import GithubInternalEntry from './components/Sections/github/GithubInternalEntry'
import useCheckbox from './components/Sections/github/hooks/useCheckbox'
import { useUserStorage } from './components/Sections/github/hooks/useUserStorage'
import PreviewContent from './components/Sections/preview/PreviewContent'
import LoadingView from './components/common/LoadingView'
import { Section } from './components/common/Section'
import { Sections } from './components/common/Sections'
import { RestartIcon } from './generated/icons'
import { useFetch } from './hooks/useFetch'
import { useMutation } from './hooks/useMutation'

export type TokenKeys = 'colors' | 'textStyles'
export type TokenType = Record<'colors' | 'textStyles', Obj>
export type TabKeys = 'internal' | 'external'
const checkList: TokenKeys[] = ['colors', 'textStyles']

const TABS: TabKeys[] = ['internal', 'external']

export const App = () => {
  const [tab, setTab] = useState<TabKeys>('internal')

  const checkboxData = useCheckbox(checkList)

  const checkedList = checkboxData.checkedItems

  const isPending = checkboxData.isPending

  const handleTabChange = (index: number) => setTab(TABS[index])

  const { mutate: restart } = useMutation(uiAction.restart.request)

  const { data: colorData, isLoading: isLoadingColorData } = useFetch(
    uiAction.parseColorStyle.request,
  )
  const { data: textData, isLoading: isLoadingTextData } = useFetch(
    uiAction.parseTextStyle.request,
  )

  const { data: currentUserId } = useFetch(uiAction.currentUserId.request)

  const { isTokTokhanUser, setUser, isLoadingUser } =
    useUserStorage(currentUserId)

  const isLoadingToken = isLoadingColorData || isLoadingTextData

  const tokenData = useMemo(() => {
    const dataMap = {
      colors: colorData,
      textStyles: textData,
    }

    return [...checkedList].reduce((result, item) => {
      if (dataMap?.[item]) {
        result[item] = dataMap[item]
      }
      return result
    }, {} as any)
  }, [colorData, textData, checkedList])

  return (
    <Layout footer={<Footer />}>
      <div
        className={twJoin(
          'bg-red',
          'flex justify-between items-center',
          'border-b-[1px] border-border-secondary',
        )}
      >
        <IconTabs
          defaultIndex={0}
          selectedTabIndex={TABS.indexOf(tab)}
          onChange={handleTabChange}
        />
        <Button
          variant="unstyled"
          className={
            'w-fit h-fit bg-transparent hover:bg-transparent px-[16px]'
          }
          onClick={() => restart()}
        >
          <RestartIcon className="w-[16px] h-[16px] stroke-gray-600" />
        </Button>
      </div>
      <GithubGuard
        isLoading={isLoadingUser && tab === 'internal'}
        isConfirmed={isTokTokhanUser || tab === 'external'}
        fallback={
          <GithubInternalEntry userId={currentUserId} onConfirm={setUser} />
        }
      >
        <GithubContent
          data={tokenData}
          checkboxData={checkboxData}
          activeTab={tab}
        />
        <Sections hasDivider={false} className={'flex-[1]'}>
          <Section title="Preview">
            <LoadingView isLoading={isLoadingToken}>
              <PreviewContent
                data={tokenData}
                checkedList={checkedList}
                isPending={isPending}
              />
            </LoadingView>
          </Section>
        </Sections>
      </GithubGuard>
    </Layout>
  )
}
