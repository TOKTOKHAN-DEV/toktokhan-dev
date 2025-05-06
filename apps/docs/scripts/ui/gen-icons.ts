import { readFileSync, readdirSync, writeFileSync } from 'fs'
import path, { join } from 'path'

import {
  createObjBySelector,
  pass,
  removeStr,
  suffix,
} from '@toktokhan-dev/universal'

import { identity } from 'lodash'
import { flow, map, replace } from 'lodash/fp'
import prettier from 'prettier'

const SVG_PATH = 'static/icons'
const OUTPUT_PATH = 'src/generated'
const convertToPascalCase = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word) {
      return word.toUpperCase()
    })
    .replace(/(-|_)/g, '')
    .replace(/\s+/g, '')
}

const svgContent = flow((fileName: string) => {
  const filePath = join(SVG_PATH, fileName)
  const fileContent = readFileSync(filePath, 'utf-8')
  return fileContent
})

const indexingSvg = flow(pass(SVG_PATH), readdirSync)
const replaceAll = (pattern: string, replacement: string) =>
  replace(new RegExp(pattern, 'g'), replacement)
console.log('indexingSvg', indexingSvg)
flow(
  indexingSvg,
  map(
    flow(
      createObjBySelector({
        pathname: identity,
        iconName: flow(
          (identity: any) => convertToPascalCase(identity),
          removeStr('.Svg'),
          suffix('Icon'),
        ),
        svgContent: flow(
          svgContent,
          replaceAll('clip-path', 'clipPath'),
          replaceAll('stroke-width', 'strokeWidth'),
          replaceAll('stroke-linecap', 'strokeLinecap'),
          replaceAll('stroke-linejoin', 'strokeLinejoin'),
          replaceAll('fill-rule', 'fillRule'),
          replaceAll('clip-rule', 'clipRule'),
          replaceAll('xlink:href', 'xlinkHref'),
          replaceAll('xmlns:xlink', 'xmlnsXlink'),
          replaceAll('stroke-miterlimit', 'strokeMiterlimit'),
          replaceAll('fill-opacity', 'fillOpacity'),
          replaceAll('class', 'className'),

          replaceAll('class="[^"]*"', ''),
          replaceAll('style="[^"]*"', ''),

          replace('<svg', '<svg ref={ref}'),
          replace('>', `{...props} >`),
        ),
      }),
      flow(
        (
          obj,
        ) => `export const ${obj.iconName} = forwardRef<SVGSVGElement, IconProps>(
          function ${obj.iconName}(props, ref) {
            return (
              ${obj.svgContent.trim()}
            );
          },
        );`,
      ),
    ),
  ),

  (identity) => {
    const newFilePath = path.join(OUTPUT_PATH, 'icons.tsx')
    const content = identity.join('\n')

    const head = `import { SVGProps, forwardRef } from 'react'

    interface IconProps extends SVGProps<SVGSVGElement> {}
    `

    const fileContent = head + '\n' + content

    return writeFileSync(newFilePath, fileContent, 'utf-8')
  },
)()
