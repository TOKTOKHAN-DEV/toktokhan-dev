require('dotenv').config()
const [first, second, ...args] = process.argv

const [prNumber, publishPackages] = args
type Pkgs = { name: string; version: string }[]
const pkgs: Pkgs = JSON.parse(publishPackages)

const DOMAIN = 'https://github.com/TOKTOKHAN-DEV/toktokhan-dev'

const WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || ''
// const WEBHOOK_URL =
//   process.env.TEST_SLACK_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL

if (!WEBHOOK_URL) throw new Error('WEBHOOK_URL is missing or not configured.')

const pkgList = pkgs?.map((item) => `${item.name}@${item.version}`).join(' ')

const title = [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: ':blob-sign-yes: @toktokhan-dev/* 패키지가 배포되었습니다.',
      emoji: true,
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '개별 패키지의 변경사항은 아래의 각 패키지 링크를 통해 확인해 주세요.',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        text: ':meow_bread_appear: 변경사항 모아보기',
        emoji: true,
      },
      value: 'update detail info',
      url: `${DOMAIN}/pull/${prNumber}`,
      action_id: 'button-action',
    },
  },
]
const body = [
  {
    type: 'divider',
  },
  {
    type: 'rich_text',
    elements: [
      {
        type: 'rich_text_list',
        style: 'bullet',
        elements: pkgs?.map((item) => {
          return {
            type: 'rich_text_section',
            elements: [
              {
                type: 'link',
                url: `${DOMAIN}/releases/tag/${item.name}@${item.version}`,
                text: `${item.name}@${item.version}`,
                style: {
                  bold: true,
                },
              },
            ],
          }
        }),
      },
    ],
  },
]

const notes = [
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `\`\`\`
// 일괄 업데이트 
pnpm update "@toktokhan-dev/*"@latest
// 설치
pnpm add(or add -D) ${pkgList}
\`\`\``,
    },
  },
]

const content = {
  unfurl_links: false,
  blocks: [...title, ...body, ...notes],
}
namespace ToktokhanDevRepo {
  export async function sendToWebhook(url: string, data: any): Promise<void> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error(`fetch error! status: ${response.status}`)
      }
    } catch (error) {
      console.error(`Error in sendToWebhook:`, error)
      throw error
    }
  }

  export async function notifySlack(content: any) {
    try {
      await sendToWebhook(WEBHOOK_URL, content)
      // await sendToWebhook(WEBHOOK_URL, body)
      // await sendToWebhook(WEBHOOK_URL, notes)
    } catch (error) {
      console.error('Error in notifySlack:', error)
    }
  }
}
ToktokhanDevRepo.notifySlack(content)
