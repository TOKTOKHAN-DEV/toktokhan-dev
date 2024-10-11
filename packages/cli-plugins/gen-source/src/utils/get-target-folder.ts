import fs from 'fs'
import path from 'path'

import { cwd, pathOn } from '@toktokhan-dev/node'
import { removeStr } from '@toktokhan-dev/universal'

import Enquirer from 'enquirer'
import { flow, prop } from 'lodash/fp'

const isDirectory = (file: fs.Dirent) => file.isDirectory()

const getSubFolder = (path: string) => {
  return fs
    .readdirSync(path, {
      encoding: 'utf-8',
      withFileTypes: true,
    })
    .filter(isDirectory)
}

export async function getTargetFolder(dirs: string[]): Promise<string> {
  const { target } = await Enquirer.prompt<{ target: string }>({
    type: 'autocomplete',
    name: 'target',
    message: 'Select path to be created',
    initial: 0,
    choices: [...dirs],
  })

  return target
}

export async function getTargetFolderRecursive(
  targetFolder: string,
): Promise<string> {
  const files = fs.readdirSync(targetFolder, {
    encoding: 'utf-8',
    withFileTypes: true,
  })

  const removeBasePath = flow(
    removeStr(cwd()), //
    (str) => (str.startsWith(path.sep) ? str.substring(1) : str),
  )

  const getNextList = flow(prop('name'), pathOn(targetFolder), removeBasePath)

  const dirs = files
    .filter(isDirectory)
    .map(getNextList)
    .concat([removeBasePath(targetFolder)])
    .reverse()

  const target = await getTargetFolder(dirs)
  const targetStaticPath = cwd(target)
  const targetSubFolders = getSubFolder(targetStaticPath)

  const isSelectCurrentFolder = targetStaticPath === targetFolder
  const hasSubFolder = !!targetSubFolders.length
  const isRecursive = !isSelectCurrentFolder && hasSubFolder

  if (isRecursive) return await getTargetFolderRecursive(targetStaticPath)
  return targetStaticPath
}
