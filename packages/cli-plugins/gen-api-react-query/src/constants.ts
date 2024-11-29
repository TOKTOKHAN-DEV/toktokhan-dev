import { packageRoot } from './package-root'

export const GENERATE_SWAGGER_DATA = {
  CUSTOM_AXIOS_TEMPLATE_FOLDER: packageRoot('templates/custom-axios'),
  CUSTOM_FETCH_TEMPLATE_FOLDER: packageRoot('templates/custom-fetch'),
  EXTRA_TEMPLATE_FOLTER: packageRoot('templates/my'),
  TYPE_FILE: ['react-query-type.ts', 'data-contracts.ts', 'util-types.ts'],
  UTIL_FILE: ['param-serializer-by.ts'],
  QUERY_HOOK_INDICATOR: '@indicator-for-query-hook',
  USE_SUSPENSE_QUERY_HOOK_INDICATOR: '@indicator-for-use-suspense-query-hook',
  AXIOS_DEFAULT_INSTANCE_PATH: '@/configs/axios/instance',
  FETCH_DEFAULT_INSTANCE_PATH: '@/configs/fetch/fetch-extend',
}
