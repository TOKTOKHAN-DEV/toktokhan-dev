/**
 * data-contracts.ts의 렌더링된 내용을 타입 블록 단위로 파싱합니다.
 * 각 export type/interface/enum/const를 독립된 블록으로 분리합니다.
 *
 * lookahead로 `\nexport\s`를 사용하여 export function/class 등
 * 비표준 export도 블록 경계로 인식합니다.
 */
export const TYPE_BLOCK_REGEX =
  /(export\s+(?:type|interface|enum|const)\s+(\w+)[\s\S]*?)(?=\nexport\s|$)/g

export function parseTypeDefinitions(content: string): Record<string, string> {
  const types: Record<string, string> = {}
  const typeRegex = new RegExp(TYPE_BLOCK_REGEX.source, TYPE_BLOCK_REGEX.flags)

  let match
  while ((match = typeRegex.exec(content)) !== null) {
    const typeName = match[2]
    const typeContent = match[1].trim()
    types[typeName] = typeContent
  }

  return types
}
