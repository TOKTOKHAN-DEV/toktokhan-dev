import { Children } from 'react'

import { Obj, or } from '@toktokhan-dev/universal'

import clsx from 'clsx'
import {
  entries,
  flow,
  groupBy,
  head,
  includes,
  map,
  prop,
  split,
} from 'lodash/fp'
import { twJoin } from 'tailwind-merge'

import { Group } from '../../common/Group'
import { Sections } from '../../common/Sections'
import Tooltip from '../../common/ToolTip'
import { copyToClipboard } from '../github/utils/copy-to-clipboard'

interface ColorViewerProps {
  token: Obj
  tokenKey: 'colorSchema' | 'semanticTokens'
}

export const ColorViewer = ({ token, tokenKey }: ColorViewerProps) => {
  return <div>{renderObj({ [tokenKey]: token[tokenKey] } || {}, tokenKey)}</div>
}

const spread = (fn: any) => (params: any[]) => fn(...params)

const renderKey = flow(
  split('-'),
  map((str) => <p>{str}</p>),
  Children.toArray,
)

const renderItem = flow(
  map(
    spread((key: string, value: any) => {
      return (
        <div className="flex h-[24px] gap-[4px] bg-background-tertiary px-[8px] py-[4px] rounded-[4px] items-center">
          <div
            className={twJoin(
              'text-[10px] font-[500]',
              'font-mono leading-[150%] tracking-[0.2px]',
              'whitespace-nowrap',
            )}
          >
            {key}
          </div>
          <Tooltip content={value.value}>
            <div
              onClick={() => {
                copyToClipboard(value.value)
              }}
              style={{ backgroundColor: value.value }}
              className={clsx(
                'border-solid border-[0.5px] border-border-primary rounded-[2px]',
                `w-[12px] h-[12px]`,
                'cursor-pointer',
              )}
            />
          </Tooltip>
        </div>
      )
    }),
  ),
  Children.toArray,
)

const renderSemanticTokenItem = flow(
  ([key, val]: [string, Record<'light' | 'dark', Obj>]) => {
    const validMode = Object.entries(val).filter((item) => !!item[1]?.value)
    return (
      <div className="flex h-[24px] gap-[4px] bg-background-tertiary px-[8px] py-[4px] rounded-[4px] items-center">
        <div
          className={twJoin(
            'text-[10px] font-[500]',
            'font-mono leading-[150%] tracking-[0.2px]',
            'whitespace-nowrap',
          )}
        >
          {key}
        </div>
        <div className="flex gap-[4px]">
          {validMode.map(([mode, values], idx) => {
            return (
              <div
                className="flex  content-center items-center gap-2"
                key={idx}
              >
                <Tooltip
                  content={
                    <>
                      <p>{mode}</p>
                      {values.ref && (
                        <p className="whitespace-nowrap">
                          {String(values.ref)}
                        </p>
                      )}
                      <p>{String(values.value)}</p>
                    </>
                  }
                >
                  <div
                    onClick={() => {
                      copyToClipboard(
                        `[${mode}]\n${values.ref ? values.ref + '\n' : ''}${values.value}`,
                      )
                    }}
                    style={{
                      backgroundColor: values.value as string,
                      cursor: 'pointer',
                    }}
                    className={clsx(
                      'box-border',
                      'border-solid border-[0.5px] border-border-primary rounded-[2px]',
                      `w-[12px] h-[12px]`,
                      'cursor-pointer',
                    )}
                  />
                </Tooltip>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
  Children.toArray,
)

const isSemanticToken = flow(
  map(flow(prop(1), or({}), Object.keys, includes('light'))),
)
const renderGroupSchema = flow(
  entries,
  groupBy(flow(head, split('-'), head)),
  entries,
  map(([c_key, c_value]) => {
    return (
      <Group title={c_key}>
        <div className={twJoin('flex flex-wrap gap-[8px]')}>
          {renderItem(c_value)}
        </div>
      </Group>
    )
  }),
  Children.toArray,
)

const renderGroupToken = flow(
  entries,
  groupBy(flow(head, split('-'), head)),
  entries,
  map(([c_key, c_value]) => {
    if (!isSemanticToken(c_value)) return null
    return (
      <Group title={c_key}>
        <div className={twJoin('flex flex-wrap gap-[8px]')}>
          {c_value.map(
            (
              [tokenName, modes]: [string, Record<'light' | 'dark', Obj>],
              idx: number,
            ) => {
              return (
                <div key={idx}>
                  {renderSemanticTokenItem([tokenName, modes])}
                </div>
              )
            },
          )}
        </div>
      </Group>
    )
  }),
  Children.toArray,
)

const isSchema = flow(
  (key: string) => key.toLocaleLowerCase(),
  includes('schema'),
)
const isToken = flow(
  (key: string) => key.toLocaleLowerCase(),
  includes('token'),
)

const renderObj = flow(
  entries,
  map(([key, value]) => (
    <div key={key}>
      {isSchema(key) && (
        <Sections className={'p-0'}>{renderGroupSchema(value)}</Sections>
      )}
      {isToken(key) && (
        <Sections className={'p-0'}>{renderGroupToken(value)}</Sections>
      )}
    </div>
  )),
  Children.toArray,
)
