import { Command } from 'commander'

import { json } from '@toktokhan-dev/node'

import chalk from 'chalk'
import clear from 'clear'
import enquirer from 'enquirer'
import figlet from 'figlet'

import { ConfigType, MyCommand } from './types/my-command'
import { RootConfig } from './types/root-config'
import { defineCommand, registry } from './utils'
import { loadConfigFile } from './utils/load'

const program = new Command()

const appName = 'tokript'
const version = json<{ version: string }>('package.json').version

/**
 * 똑똑한개발자의 플러그인을 사용할 수 있는 **CLI TOOL**입니다.
 * `gen:api`, `gen:theme`, `gen:route`, `gen:sitemap` 등 다양한 플러그인을 지원하며, 사용자가 개발한 스크립트를 플러그인으로 등록할 수 있습니다.
 *
 * @packageDocumentation
 */
const cli = async () => {
  clear()
  await welcome()

  program.name(appName).version(version)

  program
    .description("CLI to help tok's working")
    .option('-c, --config', 'config file path')
    .helpCommand(true)
    .action(async () => {
      program.outputHelp()
      console.log('\n')

      const { name } = await enquirer.prompt<{ name: string }>({
        type: 'autocomplete',
        name: 'name',
        message: 'Pick Resolver',
        choices: program.commands.map((c) => c.name()),
      })

      const target = program.commands.find((c) => c.name() === name)

      target?.parse()
    })

  const config = await loadConfigFile(process.cwd())
  const commands = config?.data.plugins || []

  commands.forEach(registry(program, config?.data))

  program.parse(process.argv)
}

async function welcome() {
  const welcome = figlet.textSync(appName, { horizontalLayout: 'full' })
  console.log(chalk.blueBright(welcome))
}

export { cli, defineCommand, registry, MyCommand, ConfigType, RootConfig }
