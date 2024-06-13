import { Obj } from '@toktokhan-dev/universal'

import { notify } from '../../controller/workflows/notify'
import { createUIAction } from './create-ui-action'

export const uiAction = {
  test: createUIAction<string, string>('test'),
  resize: createUIAction<{ w: number; h: number }, void>('resize'),
  currentUserId: createUIAction<void, string | null>('current-user-id'),
  getUser: createUIAction<void, string>('get-user'),
  setUser: createUIAction<string, void>('set-user'),
  parseTextStyle: createUIAction<void, Obj>('parse-text-style'),
  parseColorStyle: createUIAction<void, Obj>('parse-color-style'),
  editorType: createUIAction<void, PluginAPI['editorType']>('editorType'),
  restart: createUIAction<void, void>('restart'),
  notify: createUIAction<Parameters<typeof notify>['0'], void>('notify'),
}
