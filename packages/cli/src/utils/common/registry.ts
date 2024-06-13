import { Command } from 'commander'

import { curry, merge } from 'lodash'

import { MyCommand } from '../../types/my-command'
import { RootConfig } from '../../types/root-config'

const _registry = (
  program: Command,
  config: RootConfig,
  command: MyCommand,
) => {
  const cmd = program.command(command.name)
  cmd.description(command.description)

  command.cliOptions?.forEach((option) => {
    if (!option) return

    const name =
      option.alias ? `-${option.alias}, --${option.name}` : `--${option.name}`

    const type = (() => {
      if (!option.type) {
        return ''
      }
      if (option.type === 'boolean') {
        return ''
      }
      if (option.type.includes('[]')) {
        return `<${option.type.replace('[]', '')}...>`
      }

      return `<${option.type}>`
    })()

    cmd.option(
      `${name} ${type}`.trim(),
      option.description,
      config?.[command.name]?.[option.name] ?? command.default[option.name],
    )
  })

  cmd.action((options) => {
    const defaultConfig = command.default
    const fileConfig = config?.[command.name] || {}

    const merged = merge(defaultConfig, fileConfig, options)

    command.run(merged)
  })
}

export const registry: {
  (program: Command, config: RootConfig, command: MyCommand): void
  (program: Command, config: RootConfig): (command: MyCommand) => void
  (program: Command): (config: RootConfig, command: MyCommand) => void
} = curry(_registry)
