import path from 'path'

import { $, createPackageRoot } from '@toktokhan-dev/node'
import { isNotNullish } from '@toktokhan-dev/universal'

import enquirer from 'enquirer'
import { add } from 'lodash'
import { prop } from 'lodash/fp'

import { github } from './services/github'

const packageMap = {
  'next-page-init': {
    owner: 'TOKTOKHAN-DEV',
    repo: 'next-page-init',
  },
  'next-app-init': {
    owner: 'TOKTOKHAN-DEV',
    repo: 'next-page-init',
  },
  'rn-native-base-init': {
    owner: 'TOKTOKHAN-DEV',
    repo: 'next-page-init',
  },
}

async function selectTemplate() {
  const { template } = await enquirer.prompt<{ template: string }>({
    name: 'template',
    message: 'Select a template',
    type: 'select',
    choices: Object.keys(packageMap).map((key) => ({
      name: key + '3',
      message: key + '2',
    })),
  })

  console.log({ template })

  const pack = packageMap[template as keyof typeof packageMap]

  const releases = await github.repos.listReleases({
    owner: pack.owner,
    repo: pack.repo,
  })

  await enquirer.prompt({
    name: 'version',
    message: 'Select a Version',
    type: 'select',
    choices: releases.data.map(prop('tag_name')).filter(isNotNullish),
  })
}
selectTemplate()
