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
  writeSwaggerApiFile,
} from '../write-swagger'
import { mergeTypeScriptContent } from '../index'
import { ClassificationResult } from '../utils/type-classifier'
import { parseTypeDefinitions } from '../utils/parse-type-definitions'

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

  it('adds import when module type body references a shared type', () => {
    const types: Record<string, string> = {
      ResponseDTOAlpha:
        'export interface ResponseDTOAlpha {\n  data: AlphaType\n}',
    }
    const result = buildContractsFileContent(
      ['ResponseDTOAlpha'],
      types,
      ['AlphaType', 'BetaType'],
    )

    expect(result).toContain(
      "import { AlphaType } from '../@types/common-contracts'",
    )
    // BetaType is shared but not referenced — must NOT be imported
    expect(result).not.toContain('BetaType')
  })

  it('imports multiple shared types when all are referenced', () => {
    const types: Record<string, string> = {
      CompositeDTO:
        'export interface CompositeDTO {\n  alpha: AlphaType\n  beta: BetaType\n}',
    }
    const result = buildContractsFileContent(
      ['CompositeDTO'],
      types,
      ['AlphaType', 'BetaType', 'GammaType'],
    )

    expect(result).toContain('AlphaType')
    expect(result).toContain('BetaType')
    expect(result).not.toContain('GammaType')
    expect(result).toContain("from '../@types/common-contracts'")
  })

  it('does not false-positive on substring matches (word boundary)', () => {
    // "Foo" is shared, but module type only contains "FooBar" — should NOT import "Foo"
    const types: Record<string, string> = {
      MyDTO: 'export interface MyDTO {\n  field: FooBarType\n}',
    }
    const result = buildContractsFileContent(
      ['MyDTO'],
      types,
      ['Foo'],
    )

    expect(result).not.toContain('import')
  })

  it('detects shared types in generic parameters', () => {
    const types: Record<string, string> = {
      PagedResponse:
        'export interface PagedResponse {\n  items: PaginatedList<ItemType>\n}',
    }
    const result = buildContractsFileContent(
      ['PagedResponse'],
      types,
      ['ItemType', 'OtherType'],
    )

    expect(result).toContain('ItemType')
    expect(result).not.toContain('OtherType')
  })

  it('detects shared types in union/array type expressions', () => {
    const types: Record<string, string> = {
      MixedDTO:
        'export interface MixedDTO {\n  nullable: SharedEnum | null\n  list: SharedItem[]\n}',
    }
    const result = buildContractsFileContent(
      ['MixedDTO'],
      types,
      ['SharedEnum', 'SharedItem'],
    )

    expect(result).toContain('SharedEnum')
    expect(result).toContain('SharedItem')
  })

  it('does not add import when no shared types are referenced', () => {
    const result = buildContractsFileContent(
      ['UserType', 'RoleType'],
      parsedTypes,
      ['UnrelatedType', 'AnotherType'],
    )

    expect(result).not.toContain('import')
  })

  it('omits import section when sharedTypeNames is not provided', () => {
    const result = buildContractsFileContent(['UserType'], parsedTypes)
    expect(result).not.toContain('import')
  })

  it('omits import section when sharedTypeNames is empty array', () => {
    const result = buildContractsFileContent(['UserType'], parsedTypes, [])
    expect(result).not.toContain('import')
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

// ============================================================
// 7. parseTypeDefinitions
// ============================================================
describe('parseTypeDefinitions', () => {
  it('parses interface blocks', () => {
    const content = `export interface UserType {\n  name: string\n}\n\nexport interface RoleType {\n  id: number\n}`
    const result = parseTypeDefinitions(content)

    expect(Object.keys(result)).toEqual(['UserType', 'RoleType'])
    expect(result.UserType).toContain('name: string')
    expect(result.RoleType).toContain('id: number')
  })

  it('parses type aliases', () => {
    const content = `export type Status = "active" | "inactive"\n\nexport type Id = number`
    const result = parseTypeDefinitions(content)

    expect(result.Status).toContain('"active"')
    expect(result.Id).toContain('number')
  })

  it('parses enum and const blocks', () => {
    const content = `export enum Color {\n  Red = "red",\n  Blue = "blue"\n}\n\nexport const ColorMap = { Red: "red" } as const`
    const result = parseTypeDefinitions(content)

    expect(result.Color).toContain('Red = "red"')
    expect(result.ColorMap).toContain('as const')
  })

  it('does not corrupt blocks when export function appears between types', () => {
    const content = [
      'export interface UserType {',
      '  name: string',
      '}',
      '',
      'export function helper() { return true }',
      '',
      'export interface RoleType {',
      '  id: number',
      '}',
    ].join('\n')
    const result = parseTypeDefinitions(content)

    expect(result.UserType).toContain('name: string')
    expect(result.UserType).not.toContain('helper')
    expect(result.RoleType).toContain('id: number')
    // export function is correctly skipped
    expect(result['helper']).toBeUndefined()
  })

  it('does not corrupt blocks when export class appears between types', () => {
    const content = [
      'export type Foo = string',
      '',
      'export class SomeClass { }',
      '',
      'export type Bar = number',
    ].join('\n')
    const result = parseTypeDefinitions(content)

    expect(result.Foo).toBe('export type Foo = string')
    expect(result.Bar).toBe('export type Bar = number')
    expect(result['SomeClass']).toBeUndefined()
  })

  it('handles content with leading comments/whitespace before first export', () => {
    const content = `/* header comment */\n\nexport type Foo = string`
    const result = parseTypeDefinitions(content)

    expect(result.Foo).toBe('export type Foo = string')
  })

  it('returns empty object for content with no type exports', () => {
    const content = `export function foo() {}\nexport class Bar {}`
    const result = parseTypeDefinitions(content)

    expect(Object.keys(result).length).toBe(0)
  })
})

// ============================================================
// 8. writeSwaggerApiFile integration tests
// ============================================================
jest.mock('fs', () => ({
  mkdirSync: jest.fn(),
  existsSync: jest.fn(() => false),
  readFileSync: jest.fn(() => ''),
  writeFileSync: jest.fn(),
}))

describe('writeSwaggerApiFile', () => {
  const fs = require('fs')

  beforeEach(() => {
    jest.clearAllMocks()
    fs.existsSync.mockReturnValue(false)
  })

  const QUERY_IND = '@indicator-for-query-hook'

  const makeInput = (opts?: { withDataContracts?: boolean }) => {
    const files = [
      {
        fileName: 'data-contracts',
        fileExtension: '.ts',
        fileContent: opts?.withDataContracts
          ? 'export interface UserType {\n  name: string\n}\n\nexport interface ErrorType {\n  message: string\n}'
          : 'export interface UserType {\n  name: string\n}',
      },
      {
        fileName: 'User',
        fileExtension: '.ts',
        fileContent: [
          "import { UserType } from '../@types/data-contracts';",
          'export class UserApi { getUser() { return null } }',
          `//${QUERY_IND}`,
          'export const useUserQuery = () => {};',
        ].join('\n'),
      },
    ]

    return {
      files,
      // Mock configuration for splitDataContracts
      configuration: {
        routes: {
          combined: [
            {
              moduleName: 'User',
              routes: [
                { response: { type: 'UserType' }, request: {} },
              ],
            },
          ],
        },
      },
    }
  }

  it('writes data-contracts.ts normally when splitDataContracts is false', async () => {
    const input = makeInput()

    await writeSwaggerApiFile({
      input: input as any,
      output: '/out',
      config: {
        swaggerSchemaUrl: '',
        output: '/out',
        includeReactQuery: true,
        includeReactSuspenseQuery: false,
        instancePath: '',
        httpClientType: 'axios',
        paginationSets: [],
        splitDataContracts: false,
      },
    })

    // data-contracts.ts should be written to @types folder
    const writeCalls = fs.writeFileSync.mock.calls
    const dataContractsWrite = writeCalls.find((call: any[]) =>
      String(call[0]).includes('data-contracts.ts'),
    )
    expect(dataContractsWrite).toBeDefined()

    // No .contracts.ts files should be generated
    const contractsWrite = writeCalls.find((call: any[]) =>
      String(call[0]).includes('.contracts.ts'),
    )
    expect(contractsWrite).toBeUndefined()

    // No common-contracts.ts should be generated
    const commonWrite = writeCalls.find((call: any[]) =>
      String(call[0]).includes('common-contracts.ts'),
    )
    expect(commonWrite).toBeUndefined()
  })

  it('suppresses data-contracts.ts and generates split files when splitDataContracts is true', async () => {
    const input = makeInput({ withDataContracts: true })

    await writeSwaggerApiFile({
      input: input as any,
      output: '/out',
      config: {
        swaggerSchemaUrl: '',
        output: '/out',
        includeReactQuery: true,
        includeReactSuspenseQuery: false,
        instancePath: '',
        httpClientType: 'axios',
        paginationSets: [],
        splitDataContracts: true,
      },
    })

    const writeCalls = fs.writeFileSync.mock.calls

    // data-contracts.ts should NOT be written
    const dataContractsWrite = writeCalls.find((call: any[]) =>
      String(call[0]).includes('data-contracts.ts'),
    )
    expect(dataContractsWrite).toBeUndefined()

    // Module contracts file should be generated
    const contractsWrite = writeCalls.find((call: any[]) =>
      String(call[0]).includes('User.contracts.ts'),
    )
    expect(contractsWrite).toBeDefined()
    expect(String(contractsWrite![1])).toContain('UserType')
  })

  it('rewrites import from data-contracts to module contracts when split is enabled', async () => {
    const input = makeInput()

    await writeSwaggerApiFile({
      input: input as any,
      output: '/out',
      config: {
        swaggerSchemaUrl: '',
        output: '/out',
        includeReactQuery: true,
        includeReactSuspenseQuery: false,
        instancePath: '',
        httpClientType: 'axios',
        paginationSets: [],
        splitDataContracts: true,
      },
    })

    const writeCalls = fs.writeFileSync.mock.calls
    const apiWrite = writeCalls.find((call: any[]) =>
      String(call[0]).includes('User.api.ts'),
    )
    expect(apiWrite).toBeDefined()

    // API file should import from User.contracts, not data-contracts
    const apiContent = String(apiWrite![1])
    expect(apiContent).not.toContain('data-contracts')
  })
})
