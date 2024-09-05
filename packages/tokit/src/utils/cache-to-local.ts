import fs, { readFileSync, readdirSync } from 'fs'
import path from 'path'

import { removeStr } from '@toktokhan-dev/universal'

import { mapValues } from 'lodash'

import { InitialQuestionResponse } from '../prompts/initial'
import { cachedPackage } from '../utils/cached-package'
import { modifyPackageJson } from '../utils/modify-package-json'

export async function cacheToLocal(config: InitialQuestionResponse) {
  const cachePath = cachedPackage(config.template, config.version)
  fs.cpSync(cachePath, path.resolve(config.pathname), { recursive: true })

  // modify .gitignore
  ;(() => {
    const gitignorePath = path.resolve(config.pathname, '.gitignore')
    const prev = readFileSync(gitignorePath, 'utf-8')

    const updated = removeStr(/\.*pnpm-lock.yaml/g, prev)
    fs.writeFileSync(gitignorePath, updated)
  })()

  // modify husky
  ;(() => {
    const huskyPath = path.resolve(config.pathname, '.husky')
    const files = readdirSync(huskyPath)

    files.forEach((file) => {
      const prev = readFileSync(path.resolve(huskyPath, file), 'utf-8')
      const updated = prev.replaceAll('pnpm', config.manager)
      fs.writeFileSync(path.resolve(huskyPath, file), updated)
    })
  })()

  // remove .github
  ;(() => {
    const changesetPath = path.resolve(config.pathname, '.github')
    fs.rmSync(changesetPath, { recursive: true })
  })()
  // remove .changeset
  ;(() => {
    const changesetPath = path.resolve(config.pathname, '.changeset')
    fs.rmSync(changesetPath, { recursive: true })
  })()
  // remove scripts
  ;(() => {
    const changesetPath = path.resolve(config.pathname, '.scripts')
    fs.rmSync(changesetPath, { recursive: true })
  })()

  // modify package.json scripts
  const modifyScripts = (scripts: Record<string, string>) => {
    const IGNORED = ['changeset']
    const updated = Object.entries(scripts).filter(
      ([key]) => !IGNORED.includes(key),
    )

    return mapValues(Object.fromEntries(updated), (value) =>
      value.replaceAll('pnpm', config.manager),
    )
  }

  // modify package.json dev dependencies
  const modifyDevDependencies = (dependencies: Record<string, string>) => {
    const IGNORED = ['@changesets/']
    const updated = Object.entries(dependencies).filter(
      ([key]) => !IGNORED.includes(key),
    )
    return Object.fromEntries(updated)
  }

  await modifyPackageJson((prev) => {
    return {
      ...prev,
      name: config.projectname,
      version: '0.0.0',
      devDependencies: modifyDevDependencies(
        prev.devDependencies as Record<string, string>,
      ),
      scripts: modifyScripts(prev.scripts as Record<string, string>),
    }
  }, config.pathname)
}
