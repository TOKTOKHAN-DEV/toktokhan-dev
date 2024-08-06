# @toktokhan-dev/cli-plugin-gen-api-react-query

[@toktokhan-dev/cli](../../cli/README.md) 의 plugin 입니다.
openapi json 을 조회해 type 정의된 통신 모듈과, react-query hook 을 만들어 주는 플러그인 입니다. 자세한 내용은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-api-react-query)에서 확인 할 수 있습니다.

## Preview

```ts
import instance from '@apis/_axios/instance'
import { useQuery } from '@tanstack/react-query'

import { HttpClient, RequestParams } from '../@http-client'
import { CalenderListType } from '../@types/data-contracts'
import {
  Parameter,
  QueryHookParams,
  RequestFnReturn,
} from '../@types/react-query-type'

export class CalendarApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags calendar
   * @name BusinessCalendarList
   * @request GET:/v1/business/{business_id}/calendar/
   * @secure
   */
  businessCalendarList = (variables: {
    businessId: number
    query: {
      /** 끝 날짜 */
      end_date: string
      /** 시작 날짜 */
      start_date: string
    }
    params?: RequestParams
  }) =>
    this.request<CalenderListType[], any>({
      path: `/v1/business/${variables.businessId}/calendar/`,
      method: 'GET',
      query: variables.query,
      secure: true,
      format: 'json',
      ...variables.params,
    })
}

export const calendarApi = new CalendarApi({ instance })

/**
 * QUERY_KEYS
 */
export const QUERY_KEY_CALENDAR_API = {
  BUSINESS_CALENDAR_LIST: (
    variables?: Parameter<typeof calendarApi.businessCalendarList>,
  ) =>
    ['BUSINESS_CALENDAR_LIST', variables].filter(
      (key) => typeof key !== 'undefined',
    ),
  BUSINESS_CALENDAR_DAY_LIST: (
    variables?: Parameter<typeof calendarApi.businessCalendarDayList>,
  ) =>
    ['BUSINESS_CALENDAR_DAY_LIST', variables].filter(
      (key) => typeof key !== 'undefined',
    ),
}

/**
 * No description
 *
 * @tags calendar
 * @name BusinessCalendarList
 * @request GET:/v1/business/{business_id}/calendar/
 * @secure */

export const useBusinessCalendarListQuery = <
  TData = RequestFnReturn<typeof calendarApi.businessCalendarList>,
>(
  params: QueryHookParams<typeof calendarApi.businessCalendarList, any, TData>,
) => {
  const queryKey = QUERY_KEY_CALENDAR_API.BUSINESS_CALENDAR_LIST(
    params.variables,
  )
  return useQuery({
    queryKey,
    queryFn: () => calendarApi.businessCalendarList(params.variables),
    ...params?.options,
  })
}
```

## Installation

```
npm i -D @toktokhan-dev/cli @toktokhan-dev/cli-plugin-gen-api-react-query
```

## Register Plugin

```ts
// tok-cli.config.ts
import { genApi } from '@toktokhan-dev/cli-plugin-gen-api-react-query'

const config: RootConfig<{
  plugins: [typeof genApi]
}> = {
  plugins: [genApi],
  'gen:api': {
    /** 조회할 스웨거의 url 혹은 file(yaml, json) 경로 입니다.*/
    swaggerSchemaUrl: 'https://petstore.swagger.io/v2/swagger.json',
    /** 생성될 파일들이 위치할 경로입니다. */
    output: 'src/generated/openapi',
    /** Api 의 axios 혹은 fetch 요청 instance 주소입니다. */
    instancePath: 'src/configs/axios.ts',
  },
}
```

## Run Script

`tokript2` 명령어로 각 플러그인으로 등록된 기능들을 사용할 수 있습니다.

```
npx tokript2 gen:api
```

## Configuration

자세한 내용은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/gen-api-react-query)에서 확인 할 수 있습니다.
