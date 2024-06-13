import { useMemo, useState } from 'react'

import { Obj } from '@toktokhan-dev/universal'

import { isEmpty } from 'lodash'
import { twJoin } from 'tailwind-merge'

import { TokenKeys, TokenType } from '../../../App'
import { Accordion } from '../../@headless/Accodion'
import Code from '../../@headless/Code'
import EmptyView from '../../common/EmptyView'
import LoadingView from '../../common/LoadingView'
import { ColorViewer } from '../token-veiwer/ColorViewer'
import { TextStyleViewer } from '../token-veiwer/TextStyleViewer'
import PreviewTabs from './PreviewTabs'

interface PreviewContentProps {
  data: TokenType
  checkedList: Set<TokenKeys>
  isPending: boolean
}

const PreviewContent = ({
  data,
  checkedList,
  isPending,
}: PreviewContentProps) => {
  const [previewTabIndex, setPreviewTabIndex] = useState(0)
  const handlePreviewTabsChange = (index: number) => {
    setPreviewTabIndex(index)
    handlePreviewTabsChange
  }
  const tokenData = useMemo(() => JSON.stringify(data, null, 2), [data])

  return (
    <EmptyView
      isEmpty={isEmpty(data)}
      fallback={
        <div className="h-full bg-gray-50 p-2 flex items-center justify-center">
          <span className="text-button-secondary pre-caption01">
            No content
          </span>
        </div>
      }
    >
      <PreviewTabs
        defaultIndex={0}
        selectedTabIndex={previewTabIndex}
        onChange={handlePreviewTabsChange}
      />
      <LoadingView isLoading={isPending}>
        {previewTabIndex === 0 && (
          <Code
            hasCopyButton
            code={tokenData}
            language={'javascript'}
            className={twJoin('max-h-[300px] text-[10px]')}
          />
        )}
        {previewTabIndex === 1 && (
          <Accordion
            allowMultiple
            styles={{
              _container: twJoin('flex flex-col gap-y-[8px]'),
              _item: twJoin('p-0', 'rounded-[8px]', 'bg-background-secondary'),
              _button: twJoin('px-[16px] py-[8px]', 'caption01-bold'),
              _panel: twJoin('px-[16px] py-[8px]'),
            }}
          >
            {checkedList.has('colors') && (
              <Accordion.Item>
                <Accordion.Button>Color Schema</Accordion.Button>
                <Accordion.Panels>
                  <ColorViewer
                    tokenKey="colorSchema"
                    token={data?.colors || {}}
                  />
                </Accordion.Panels>
              </Accordion.Item>
            )}
            {checkedList.has('colors') && (
              <Accordion.Item>
                <Accordion.Button>Semantic Tokens</Accordion.Button>
                <Accordion.Panels>
                  <ColorViewer
                    tokenKey="semanticTokens"
                    token={(data?.colors as Obj) || {}}
                  />
                </Accordion.Panels>
              </Accordion.Item>
            )}
            {checkedList.has('textStyles') && (
              <Accordion.Item>
                <Accordion.Button>Text Styles</Accordion.Button>
                <Accordion.Panels>
                  <TextStyleViewer token={data?.textStyles || {}} />
                </Accordion.Panels>
              </Accordion.Item>
            )}
          </Accordion>
        )}
      </LoadingView>
    </EmptyView>
  )
}

export default PreviewContent
