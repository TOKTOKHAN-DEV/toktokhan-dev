require('dotenv').config()
const [first, second, ...args] = process.argv

const [prNumber, publishPackages] = args
type Pkgs = { name: string; version: string }[]
const pkgs: Pkgs = JSON.parse(publishPackages)
const WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
if (!WEBHOOK_URL) throw new Error('WEBHOOK_URL is missing or not configured.')
const DOMAIN = 'https://github.com/TOKTOKHAN-DEV/toktokhan-dev'

const title = {
  unfurl_links: false,
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:star2:*@toktokhan-dev 패키지가 배포되었습니다.* <${DOMAIN}/pull/${prNumber}|버전 업데이트 정보>:star2:`,
      },
    },
  ],
}

const body = {
  unfurl_links: true,
  blocks: [
    {
      type: 'divider',
    },
    {
      type: 'rich_text',
      elements: [
        {
          type: 'rich_text_list',
          style: 'bullet',
          elements: pkgs?.map((item, idx) => {
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
  ],
}

async function sendToWebhook(url: string, data: any): Promise<void> {
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
async function notifySlack(title: any, body: any) {
  try {
    await sendToWebhook(WEBHOOK_URL, title)
    await sendToWebhook(WEBHOOK_URL, body)
  } catch (error) {
    console.error('Error in notifySlack:', error)
  }
}

notifySlack(title, body)
