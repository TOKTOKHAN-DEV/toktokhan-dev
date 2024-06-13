import type {
  IApiDocumenterPluginManifest,
  IMarkdownDocumenterFeatureOnBeforeWritePageArgs,
} from '@microsoft/api-documenter'
import { MarkdownDocumenterFeature } from '@microsoft/api-documenter'

import dedent from 'dedent'
import path from 'node:path'

const REPLACERS = new Map<RegExp, string>([
  [/\\\*/g, '*'],
  [/\\_/g, '_'],
  [/\\`/g, '`'],
  [/\\\[/g, '['],
  [/\\\]/g, ']'],
  [/<!-- -->/g, ''],
  [/<!--[\s\S]*?-->/g, ''],
  [/\{([^}]+)\}/g, '\\{$1\\}'],
])

const TITLE_REGEXP = /\n## ([\S]*).*\n/

const replaceMdSyntax = (
  eventArgs: IMarkdownDocumenterFeatureOnBeforeWritePageArgs,
) => {
  let inCodeBlock = false
  const lines = eventArgs.pageContent.split('\n')
  eventArgs.pageContent = lines
    .map((line) => {
      const isStartCodeBlock = line.trim().startsWith('```')
      const isEndCodeBlock = line.trim().endsWith('```')

      if (isStartCodeBlock) inCodeBlock = true
      if (isEndCodeBlock) inCodeBlock = false

      if (!inCodeBlock) {
        Array.from(REPLACERS.entries()).forEach((replacer) => {
          line = line.replace(...replacer)
        })
      }
      return line
    })
    .join('\n')
}

const replaceMdFunctionDescription = (pageContent: string) => {
  const descriptionFlag =
    '<th>\n' + '\n' + 'Description\n' + '\n' + '\n' + '</th>'
  const returnFlag = '## Returns\n'

  const idxDes = pageContent.indexOf(descriptionFlag)
  const idxRet = pageContent.indexOf(returnFlag)

  if (idxDes === -1 || idxRet === -1) return pageContent

  const content = pageContent.slice(idxDes, idxRet)
  const updatedContent = content.replaceAll(/(?<!\\)[{}|]/g, '\\$&')

  return pageContent.replace(content, updatedContent)
}

class MarkdownDocumenter extends MarkdownDocumenterFeature {
  onBeforeWritePage(
    eventArgs: IMarkdownDocumenterFeatureOnBeforeWritePageArgs,
  ): void {
    replaceMdSyntax(eventArgs)

    const id = path.basename(eventArgs.outputFilename, '.md')
    const [, title] = TITLE_REGEXP.exec(eventArgs.pageContent) || []

    // const updateTitle = TITLE(title)
    const _title = title.charAt(0).toUpperCase() + title.slice(1)
    const newTitle = title === 'API' ? 'Overview' : _title
    const metadata = dedent(`
      ---
      id: ${id}
      title: ${newTitle}
      sidebar_label: ${newTitle}
      slug: /${id}
      ---
      `).trim()

    eventArgs.pageContent = `${metadata}\n\n${eventArgs.pageContent}`

    eventArgs.pageContent = eventArgs.pageContent.replace(
      /\[Home\]\(.*\.md\).*$/gm,
      '',
    )

    eventArgs.pageContent = eventArgs.pageContent.replace(/\.md/g, (match) => {
      return match.replace('.md', '')
    })

    eventArgs.pageContent = eventArgs.pageContent.replace(
      '**Signature:**',
      '## Signature',
    )

    eventArgs.pageContent = eventArgs.pageContent.replace(
      '**Returns:**',
      '## Returns',
    )
    eventArgs.pageContent = eventArgs.pageContent.replace(
      '**References:**',
      '## References\n',
    )

    eventArgs.pageContent = eventArgs.pageContent.replace(TITLE_REGEXP, '')

    eventArgs.pageContent = replaceMdFunctionDescription(eventArgs.pageContent)
  }
}

export const apiDocumenterPluginManifest: IApiDocumenterPluginManifest = {
  manifestVersion: 1000,
  features: [
    {
      featureName: 'toktokhan-doc-plugin',
      kind: 'MarkdownDocumenterFeature',
      subclass: MarkdownDocumenter,
    },
  ],
}
