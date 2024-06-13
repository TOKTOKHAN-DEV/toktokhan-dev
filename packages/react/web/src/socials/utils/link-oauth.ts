import { openPopup } from './open-popup'
import { pushToUrl } from './push-to-url'

export const linkToOauth = (screenType: 'screen' | 'popup', url: string) =>
  screenType === 'popup' ? openPopup(url) : pushToUrl(url)
