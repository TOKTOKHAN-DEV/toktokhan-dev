import { successLog } from './logger'
import { withLoading } from './process'

console.log('HI')
successLog('dsf', 'Sdfdsf')

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
withLoading('dsfsd', 'asdasd', async () => {
  await delay(10000)
  return 'sdf'
})
