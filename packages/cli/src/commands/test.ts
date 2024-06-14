import { defineCommand } from '../utils/common/define-command'

interface TestConfig {
  name: string
}

export const test = defineCommand<'test', TestConfig>({
  name: 'test',
  description: 'test',
  default: {
    name: 'test',
  },
  run: async (config) => {
    console.log(config.name)
  },
})
