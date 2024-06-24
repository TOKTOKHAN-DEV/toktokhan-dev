import fs from 'fs'
import path from 'path'

import { errorLog } from '@toktokhan-dev/node'

type DefaultReturnType = {
  dir: string
  sections: string[]
}

class FileOrganizer {
  private static readonly DIRECTORY_MAP = {
    index: 'api',
    universal: 'api/Universal',
    'react-universal': 'api/React/Universal',
    'react-app': 'api/React/App',
    'react-web': 'api/React/Web',
    cli: 'api/cli',
    node: 'api/node',
    chakra: 'api/Chakra',
    'cli-plugin-gen-api-react-query': 'api/cli-plugins/gen-api-react-query',
    'cli-plugin-gen-icon-chakra': 'api/cli-plugins/gen-icon-chakra',
    'cli-plugin-gen-img': 'api/cli-plugins/gen-img',
    'cli-plugin-gen-route-pages': 'api/cli-plugins/gen-route-pages',
    'cli-plugin-gen-sitemap-next-page': 'api/cli-plugins/gen-sitemap-next-page',
    'cli-plugin-gen-theme-chakra': 'api/cli-plugins/gen-theme-chakra',
    'cli-plugin-commit': 'api/cli-plugins/commit',
    github: 'api/Services/Github',
  } as const

  private sourceDir = 'apps/docs/docs'
  private targetDir = 'apps/docs/docs/api'

  private mainOverviewDirMap = Object.values(
    FileOrganizer.DIRECTORY_MAP,
  ).filter((dir) => dir !== 'api')

  private ensureDirectoryExists = (dirPath: string): void => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  }

  public categorizeMainFolder = (): void => {
    fs.readdirSync(this.targetDir).forEach((file) => {
      const filePath = path.join(this.targetDir, file)
      const fileNameWithoutExt = path.parse(file).name
      const fileSubject = fileNameWithoutExt.split('.')[0]
      const fileName = fileNameWithoutExt.split('.')[1] ? file : 'index.md'

      const newDir = Object.keys(FileOrganizer.DIRECTORY_MAP).find(
        (key) => fileSubject === key,
      )

      if (newDir) {
        const newDirPath = path.join(
          this.sourceDir,
          FileOrganizer.DIRECTORY_MAP[newDir],
        )
        this.ensureDirectoryExists(newDirPath)
        const newFilePath = path.join(newDirPath, fileName)
        fs.renameSync(filePath, newFilePath)
      }
    })
  }

  public categorizeSubFolder = (): void => {
    const sectionsByh2 = (dir: string): DefaultReturnType | void => {
      const overviewPath = path.join(this.sourceDir, dir, 'index.md')

      if (!fs.existsSync(overviewPath)) {
        errorLog(
          'sectionsByh2: File existsSync error',
          `no such file or directory, -> ${overviewPath}`,
        )
        return
      }

      const overviewContent = fs.readFileSync(overviewPath, 'utf-8')

      const sections = overviewContent.split('## ')
      sections.shift()
      return { dir, sections }
    }

    const getOldNewPath = ({
      dir,
      sections,
    }: DefaultReturnType): {
      dir: string
      oldPath: string
      newPath: string
    }[] => {
      if (!dir) {
        errorLog('empty dir')
        return []
      }
      const paths = []

      sections.forEach((section) => {
        const lines = section.split('\n')
        const sectionTitle = lines[0].trim() // Utils/Logger // Hooks/...
        lines.forEach((line) => {
          const match = line.match(/\[(.*?)\]\((.*?)\)/) // [useSyncWebStorage(connector)](./react-universal.usesyncwebstorage)
          if (!match) return

          const link = match[2] // ./react-universal.usesyncwebstorage
          const fileName = path.basename(link) //react-universal.usesyncwebstorage
          if (!fileName) return

          const dirPath = path.join(dir, sectionTitle) //api/React/Universal/Hooks
          const oldPath = path.join(this.sourceDir, dir, `${fileName}.md`) //apps/docs/docs/api/React/Universal/react-universal.usesyncwebstorage.md
          const newPath = path.join(this.sourceDir, `${dirPath}/${fileName}.md`) // apps/docs/docs/api/React/Universal/Hooks/react-universal.usesyncwebstorage.md
          paths.push({ dir, oldPath, newPath })
        })
      })

      return paths
    }

    const writeFiles = (
      params: { dir: string; oldPath: string; newPath: string }[],
    ): void => {
      if (!params || params.length === 0) {
        errorLog('writeFiles', 'no params')
        return
      }
      params.forEach(({ oldPath, newPath }) => {
        this.ensureDirectoryExists(path.dirname(newPath))
        try {
          fs.renameSync(oldPath, newPath)
        } catch (err) {
          console.warn(`Failed to move file: ${oldPath} to ${newPath}`)
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath)
          }
        }
      })
    }

    const hideUnCategorized = (dir: string): void => {
      const dirPath = path.join(this.sourceDir, dir)

      if (!fs.existsSync(dirPath)) {
        errorLog(
          'hideUnCategorized: File existsSync error',
          `no such file or directory, -> ${dirPath}`,
        )
        return
      }
      const files = fs.readdirSync(dirPath)

      files.forEach((fileName) => {
        const filePath = path.join(dirPath, fileName)
        const stats = fs.statSync(filePath)
        const isMain = path.basename(filePath) === 'index.md'

        if (stats.isFile() && !isMain) {
          fs.writeFileSync(
            filePath,
            fs
              .readFileSync(filePath, 'utf-8')
              .replace('---', '---\nsidebar_class_name : hidden'),
          )
        }
      })
    }

    this.mainOverviewDirMap.forEach((dir) => {
      const sections = sectionsByh2(dir)
      if (sections) {
        const paths = getOldNewPath(sections)
        writeFiles(paths)
      }
    })

    this.mainOverviewDirMap.forEach((dir) => hideUnCategorized(dir))
  }
}

export const handleApiDocFolderStructure = (): void => {
  const organizer = new FileOrganizer()
  organizer.categorizeMainFolder()
  organizer.categorizeSubFolder()
}
