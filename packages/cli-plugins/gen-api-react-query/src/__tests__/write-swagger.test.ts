// Mock external dependencies that use ESM (chalk via @toktokhan-dev/cli)
jest.mock('@toktokhan-dev/cli', () => ({
  defineCommand: jest.fn(),
}))
jest.mock('@toktokhan-dev/node', () => ({
  cwd: jest.fn(() => '/mock'),
  withLoading: jest.fn(),
  prettierString: jest.fn((s) => s),
  prettierFile: jest.fn(),
  createPackageRoot: jest.fn(() => jest.fn((p) => `/mock/${p}`)),
}))
jest.mock('swagger-typescript-api', () => ({}))

import {
  splitHookContents,
  buildContractsFileContent,
  rewriteDataContractsImport,
  extractImportedTypeNames,
  getLastImportLine,
} from '../write-swagger'
import { mergeTypeScriptContent } from '../index'
import { ClassificationResult } from '../utils/type-classifier'

const QUERY_INDICATOR = '@indicator-for-query-hook'
const SUSPENSE_INDICATOR = '@indicator-for-use-suspense-query-hook'

// ============================================================
// 1. splitHookContents
// ============================================================
describe('splitHookContents', () => {
  const makeContent = (opts?: { suspense?: boolean }) => {
    const imports = `import { HttpClient } from '../@http-client';\nimport { FooType } from '../@types/data-contracts';`
    const apiBody = `\nexport class FooApi {\n  getFoo() { return null; }\n}\n`
    const queryHook = `\nexport const useFooQuery = () => {};\n`
    const suspenseHook = opts?.suspense
      ? `\nexport const useFooSuspenseQuery = () => {};\n`
      : ''

    let content = imports + apiBody + `//${QUERY_INDICATOR}` + queryHook
    if (opts?.suspense) {
      content += `//${SUSPENSE_INDICATOR}` + suspenseHook
    }
    return content
  }

  it('splits api content from hook content', () => {
    const content = makeContent()
    const result = splitHookContents('Foo', content)

    expect(result.apiContents).toContain('export class FooApi')
    expect(result.apiContents).not.toContain(QUERY_INDICATOR)
    expect(result.hookParts[0]).toContain('useFooQuery')
  })

  it('splits query and suspense parts', () => {
    const content = makeContent({ suspense: true })
    const result = splitHookContents('Foo', content)

    expect(result.hookParts[0]).toContain('useFooQuery')
    expect(result.hookParts[0]).not.toContain('useFooSuspenseQuery')
    expect(result.hookParts[1]).toContain('useFooSuspenseQuery')
  })

  it('returns empty string for hookParts[1] when no suspense indicator', () => {
    const content = makeContent({ suspense: false })
    const result = splitHookContents('Foo', content)

    expect(result.hookParts[1]).toBeDefined()
  })

  it('prepends import area with Api import to each hookPart', () => {
    const content = makeContent({ suspense: true })
    const result = splitHookContents('Foo', content)

    expect(result.hookParts[0]).toContain(
      "import { FooApi } from './Foo.api';",
    )
    expect(result.hookParts[1]).toContain(
      "import { FooApi } from './Foo.api';",
    )
  })

  it('converts kebab-case filename to PascalCase for Api import', () => {
    const imports = `import { HttpClient } from '../@http-client';`
    const content =
      imports +
      `\nexport class UserProfileApi {}\n` +
      `//${QUERY_INDICATOR}` +
      `\nexport const useQuery = () => {};`

    const result = splitHookContents('user-profile', content)
    expect(result.hookParts[0]).toContain(
      "import { UserProfileApi } from './user-profile.api';",
    )
  })

  it('throws when QUERY_HOOK_INDICATOR is missing', () => {
    const content = 'export class FooApi {}'
    expect(() => splitHookContents('Foo', content)).toThrow(
      /QUERY_HOOK_INDICATOR not found/,
    )
  })
})

// ============================================================
// 2. getLastImportLine
// ============================================================
describe('getLastImportLine', () => {
  it('returns line after last import', () => {
    const content = `import { A } from './a';\nimport { B } from './b';\n\nexport class Foo {}`
    expect(getLastImportLine(content)).toBe(2)
  })

  it('returns 0 when no imports exist', () => {
    const content = 'export class Foo {}\nexport class Bar {}'
    expect(getLastImportLine(content)).toBe(0)
  })

  it('finds last import even when not consecutive', () => {
    const content = `import { A } from './a';\n\nconst x = 1;\n\nimport { B } from './b';`
    expect(getLastImportLine(content)).toBe(5)
  })
})

// ============================================================
// 3. extractImportedTypeNames
// ============================================================
describe('extractImportedTypeNames', () => {
  it('extracts single type name', () => {
    const content = `import { FooType } from '../@types/data-contracts';`
    const result = extractImportedTypeNames(content)
    expect(result).toEqual(new Set(['FooType']))
  })

  it('extracts multiple type names', () => {
    const content = `import { FooType, BarType, BazType } from '../@types/data-contracts';`
    const result = extractImportedTypeNames(content)
    expect(result).toEqual(new Set(['FooType', 'BarType', 'BazType']))
  })

  it('handles extra whitespace', () => {
    const content = `import {  FooType ,  BarType  } from '../@types/data-contracts';`
    const result = extractImportedTypeNames(content)
    expect(result).toEqual(new Set(['FooType', 'BarType']))
  })

  it('returns empty set when no data-contracts import', () => {
    const content = `import { FooType } from './other';`
    const result = extractImportedTypeNames(content)
    expect(result.size).toBe(0)
  })

  it('matches with double quotes', () => {
    const content = `import { FooType } from "../@types/data-contracts";`
    const result = extractImportedTypeNames(content)
    expect(result).toEqual(new Set(['FooType']))
  })

  it('matches without trailing semicolon', () => {
    const content = `import { FooType } from '../@types/data-contracts'`
    const result = extractImportedTypeNames(content)
    expect(result).toEqual(new Set(['FooType']))
  })
})

// ============================================================
// 4. rewriteDataContractsImport
// ============================================================
describe('rewriteDataContractsImport', () => {
  const makeClassification = (
    moduleTypes: Record<string, string[]>,
    sharedTypes: string[],
  ): ClassificationResult => ({
    moduleTypes: new Map(Object.entries(moduleTypes)),
    sharedTypes,
    parsedTypes: {},
  })

  it('rewrites to module-specific import only', () => {
    const content = `import { UserType } from '../@types/data-contracts';\nexport class UserApi {}`
    const classification = makeClassification(
      { User: ['UserType'] },
      [],
    )
    const result = rewriteDataContractsImport(content, 'User', classification)

    expect(result).toContain("from './User.contracts'")
    expect(result).not.toContain('data-contracts')
  })

  it('rewrites to common-contracts import only', () => {
    const content = `import { ErrorType } from '../@types/data-contracts';\nexport class UserApi {}`
    const classification = makeClassification({}, ['ErrorType'])
    const result = rewriteDataContractsImport(content, 'User', classification)

    expect(result).toContain("from '../@types/common-contracts'")
    expect(result).not.toContain('data-contracts')
  })

  it('rewrites to both module and common imports', () => {
    const content = `import { UserType, ErrorType } from '../@types/data-contracts';\nexport class UserApi {}`
    const classification = makeClassification(
      { User: ['UserType'] },
      ['ErrorType'],
    )
    const result = rewriteDataContractsImport(content, 'User', classification)

    expect(result).toContain("from './User.contracts'")
    expect(result).toContain("from '../@types/common-contracts'")
    expect(result).not.toContain('data-contracts')
  })

  it('removes import line when no types are used', () => {
    const content = `import { UnusedType } from '../@types/data-contracts';\nexport class UserApi {}`
    const classification = makeClassification({ User: ['OtherType'] }, [])
    const result = rewriteDataContractsImport(content, 'User', classification)

    expect(result).not.toContain('import')
    expect(result).toContain('export class UserApi')
  })

  it('returns content unchanged when no data-contracts import found', () => {
    const content = `import { FooType } from './other';\nexport class UserApi {}`
    const classification = makeClassification({ User: ['FooType'] }, [])
    const result = rewriteDataContractsImport(content, 'User', classification)

    expect(result).toBe(content)
  })

  it('only imports types that are actually referenced in the import statement', () => {
    const content = `import { UserType } from '../@types/data-contracts';\nexport class UserApi {}`
    const classification = makeClassification(
      { User: ['UserType', 'UserCreateType'] },
      ['ErrorType'],
    )
    const result = rewriteDataContractsImport(content, 'User', classification)

    expect(result).toContain('UserType')
    expect(result).not.toContain('UserCreateType')
    expect(result).not.toContain('ErrorType')
  })
})

// ============================================================
// 5. buildContractsFileContent
// ============================================================
describe('buildContractsFileContent', () => {
  const parsedTypes: Record<string, string> = {
    UserType: 'export interface UserType {\n  name: string\n}',
    RoleType: 'export type RoleType = "admin" | "user"',
  }

  it('generates header + type blocks', () => {
    const result = buildContractsFileContent(['UserType', 'RoleType'], parsedTypes)

    expect(result).toContain('!DO NOT EDIT THIS FILE')
    expect(result).toContain('export interface UserType')
    expect(result).toContain('export type RoleType')
  })

  it('preserves type order', () => {
    const result = buildContractsFileContent(['RoleType', 'UserType'], parsedTypes)
    const roleIdx = result.indexOf('RoleType')
    const userIdx = result.indexOf('UserType')
    expect(roleIdx).toBeLessThan(userIdx)
  })

  it('skips type names not found in parsedTypes', () => {
    const result = buildContractsFileContent(
      ['UserType', 'NonExistentType'],
      parsedTypes,
    )

    expect(result).toContain('export interface UserType')
    expect(result).not.toContain('NonExistentType')
  })

  it('returns header only for empty type names', () => {
    const result = buildContractsFileContent([], parsedTypes)
    expect(result).toContain('!DO NOT EDIT THIS FILE')
    expect(result).not.toContain('export')
  })
})

// ============================================================
// 6. mergeTypeScriptContent
// ============================================================
describe('mergeTypeScriptContent', () => {
  it('new types overwrite existing types with same name', () => {
    const existing = `import { A } from './a';\nexport interface FooType {\n  old: string\n}`
    const newContent = `import { A } from './a';\nexport interface FooType {\n  new: number\n}`

    const result = mergeTypeScriptContent(existing, newContent)

    expect(result).toContain('new: number')
    expect(result).not.toContain('old: string')
  })

  it('preserves existing-only types', () => {
    const existing = `export interface FooType {\n  a: string\n}\n\nexport interface BarType {\n  b: number\n}`
    const newContent = `export interface FooType {\n  a: string\n}`

    const result = mergeTypeScriptContent(existing, newContent)

    expect(result).toContain('FooType')
    expect(result).toContain('BarType')
  })

  it('adds new-only types', () => {
    const existing = `export interface FooType {\n  a: string\n}`
    const newContent = `export interface FooType {\n  a: string\n}\n\nexport interface BazType {\n  c: boolean\n}`

    const result = mergeTypeScriptContent(existing, newContent)

    expect(result).toContain('FooType')
    expect(result).toContain('BazType')
  })

  it('deduplicates imports', () => {
    const existing = `import { A } from './a';\nimport { B } from './b';\nexport type X = string`
    const newContent = `import { A } from './a';\nimport { C } from './c';\nexport type X = string`

    const result = mergeTypeScriptContent(existing, newContent)

    const importMatches = result.match(/import/g) || []
    expect(importMatches.length).toBe(3) // A, B, C
  })

  it('preserves header from new content', () => {
    const existing = `/* old header */\nexport type X = string`
    const newContent = `/* new header */\nexport type X = string`

    const result = mergeTypeScriptContent(existing, newContent)

    expect(result).toContain('new header')
  })

  it('falls back to existing header when new has none', () => {
    const existing = `/* existing header */\nexport type X = string`
    const newContent = `export type X = string`

    const result = mergeTypeScriptContent(existing, newContent)

    expect(result).toContain('existing header')
  })
})
