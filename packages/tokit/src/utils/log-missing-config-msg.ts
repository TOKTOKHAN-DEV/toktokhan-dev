import { boxLog } from '@toktokhan-dev/node'

import chalk from 'chalk'
import { flow, includesFrom, toLower } from 'lodash/fp'

export const logMissingConfigMessage = (missing: string[]) => {
  const missingItems = missing.join(', ')
  const isAre = missing.length > 1 ? 'are' : 'is'
  const missingMsg = [
    `The following required item(s) ${isAre} missing: ${chalk.green.bgGray.bold(missingItems)}.`,
  ]

  const isMissedGithub = missing.map(flow(toLower, includesFrom('github')))

  const envGuide = `
  It looks like you need to set up your GitHub information in your environment variables.

  Please set the following environment variables in your terminal:
    
  ${chalk.bgWhite.blackBright('export TOKIT_GITHUB_TOKEN=<your-github-token>')}
  ${chalk.bgWhite.blackBright('export TOKIT_GITHUB_OWNER=<your-github-owner>')}
  ${chalk.bgWhite.blackBright('export TOKIT_GITHUB_USERNAME=<your-github-username>')}
  
  Replace <your-github-token>, <your-github-owner>, and <your-github-username> with your actual GitHub information.
  
  For more detailed instructions on how to do this, please refer to ${chalk.blue.bold.underline('https://www.xx')}.`

  const msg = isMissedGithub ? missingMsg.concat(envGuide) : missingMsg

  throw boxLog(msg, {
    title: 'Message from Tokit',
  })
}
