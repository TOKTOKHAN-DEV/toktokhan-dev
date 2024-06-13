import { AxiosRequestConfig, isAxiosError } from 'axios'
import { Properties } from 'csstype'

import { genErrorByServer } from './gen-error-by-server'
import { StyledConsoleArgs, styledConsole } from './styled-console'

export interface ApiLoggerArgs extends Pick<StyledConsoleArgs, 'method'> {
  status: string | number
  reqData?: AxiosRequestConfig
  resData: any
}

/**
 * @param
 * @category Utils/Logger
 */
export const apiLogger = (params: ApiLoggerArgs) => {
  const { status, reqData, resData, method: consoleMethod = 'log' } = params

  const { method, url, params: urlPrams } = reqData || {}
  const METHOD = method ? method.toUpperCase() : ''
  const paramSerialized =
    params ? `?${new URLSearchParams(urlPrams).toString()}` : ''

  const errors = (() => {
    if (consoleMethod !== 'error') return ''
    if (!isAxiosError(resData)) return ''
    const errors = genErrorByServer(resData)
    return errors.messagesWithKey
  })()

  styledConsole({
    topic: `${METHOD}:${status}`,
    topicColor: METHOD_COLOR_MAP[METHOD] || 'black',
    title: `${url}${paramSerialized}`,
    data: {
      request: reqData,
      response: resData,
    },
    method: consoleMethod,
    errors,
  })
}

const METHOD_COLOR_MAP: Record<string, Properties<string | number>['color']> = {
  GET: 'skyblue',
  PATCH: 'green',
  POST: 'orange',
  PUT: 'darkorange',
  DELETE: 'red',
}
