import { existsSync, rmSync } from 'fs'
import path from 'path'

export const removeGit = async (baseDir: string) => {
  const gitDirPath = path.join(baseDir, '.git')
  if (existsSync(gitDirPath)) {
    rmSync(gitDirPath, { recursive: true, force: true })
  }
}
