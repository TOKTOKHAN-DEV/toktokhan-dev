import { uiAction } from '../action/ui'
import { parseColorStyles } from './workflows/colors/parse-color-style'
import { getEditorType } from './workflows/editor-type'
import { notify } from './workflows/notify'
import { parseTextStyle } from './workflows/parse-text-style'
import { resize } from './workflows/resize'
import { restart } from './workflows/restart'
import { getCurrentUser, getUserToken, setUserToken } from './workflows/user'

figma.showUI(__html__)

uiAction.getUser.on(getUserToken)
uiAction.setUser.on(setUserToken)
uiAction.resize.on(resize)
uiAction.currentUserId.on(getCurrentUser)
uiAction.parseTextStyle.on(parseTextStyle)
uiAction.parseColorStyle.on(parseColorStyles)
uiAction.editorType.on(getEditorType)
uiAction.restart.on(restart)
uiAction.notify.on(notify)

// figma.clientStorage.deleteAsync('TOKTOKHAN_USER')
// figma.clientStorage.deleteAsync('TOKTOKHAN_USER')
