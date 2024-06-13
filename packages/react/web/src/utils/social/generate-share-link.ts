/**
 * 소셜 공유 유형을 나타내는 타입입니다.
 */
export type SocialShareType = 'facebook' | 'x' | 'copy'

const FACEBOOK_SHARE_URL = 'http://www.facebook.com/sharer/sharer.php'
const X_SHARE_URL = 'https://twitter.com/intent/tweet'

/**
 * 주어진 소셜 공유 유형, 텍스트, URL에 따라 공유 링크를 생성합니다.
 * 'kakao'의 경우, 카카오에서 제공하는 자체 SDK를 사용해야 합니다.
 * @see {@link https://developers.kakao.com/docs/latest/ko/message/js-link}\
 *
 * @category Utils/Social
 * @param {SocialShareType} type - 소셜 공유 유형
 * @param {string} text - 공유할 텍스트
 * @param {string} url - 공유할 URL
 * @returns {string} 생성된 공유 링크
 * @throws {Error} 지원하지 않는 소셜 공유 유형이 주어진 경우
 */
export const generateShareLink = (
  type: SocialShareType,
  text: string,
  url: string,
) => {
  const shareUrl = `${window.origin}${url}`

  switch (type) {
    case 'facebook':
      return `${FACEBOOK_SHARE_URL}?u=${shareUrl}`
    case 'x':
      return `${X_SHARE_URL}?text=${text}&url=${shareUrl}`
    case 'copy':
      return `${shareUrl}`
    default:
      throw new Error('Unsupported social type')
  }
}
