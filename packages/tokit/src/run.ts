import { Argument, Option, program } from 'commander'

import { $, infoLog, json } from '@toktokhan-dev/node'

import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'

import { PACKAGE_PATH } from './constants'
import { initialQuestion } from './prompts/initial'
import { cacheToLocal } from './utils/cache-to-local'
import { cachedPackage } from './utils/cached-package'
import { createRepository } from './utils/create-repository'
import { getSummaryByPackageName } from './utils/get-summary-by-package-name'
import { logMissingConfigMessage } from './utils/log-missing-config-msg'
import { proceedGit } from './utils/proceed-git'
import { storeCache } from './utils/store-cache'

const name = 'tokit'
const version = json<{ version: string }>(PACKAGE_PATH).version

/**
 * 똑똑한개발자 보일러 플레이트를 생성하는 CLI Tool 입니다.
 * 템플릿을 선택하는 대화형 인터페이스를 제공하고, 선택한 템플릿을 로컬에 캐시하며, 지정된 경로에 설치합니다.
 *
 * @packageDocumentation
 */

async function main() {
  clear()
  await welcome()

  const app = program
    .name(name)
    .description("CLI to help install tok's template")
    .version(version)
    .addArgument(new Argument('path', 'source code path').argOptional())
    .addOption(new Option('-p, --project-name', ''))
    .addOption(new Option('-t, --template', 'output the version number'))
    .addOption(new Option('-m, --manager', 'output the version number'))

  app.parse(process.argv)

  if (app.args.length < 1) app.outputHelp()

  const [$pathname] = app.args
  const config = await initialQuestion($pathname)

  if (!config.isCached) {
    await storeCache(config)
    infoLog('stored cache', cachedPackage(config.template, config.version))
  }

  await cacheToLocal(config)
  infoLog('Successfully cached to local', config.pathname)

  if (config.createRemoteRepo === 'Yes') {
    const { data } = await createRepository(config)

    await proceedGit({
      baseDir: config.pathname,
      cloneUrl: data.cloneUrl,
    })

    infoLog(
      'Successfully connected to the remote repository. You can check it at =>',
      data.url,
    )
  }
  $(config.manager, ['install'], { cwd: config.pathname })
}

main()

async function welcome() {
  const welcome = figlet.textSync(name, { horizontalLayout: 'full' })
  console.log(chalk.greenBright(welcome))
}
