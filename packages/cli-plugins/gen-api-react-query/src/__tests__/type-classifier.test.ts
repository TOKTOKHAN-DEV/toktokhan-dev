import { extractTypeNames, buildTypeToModuleMap } from '../utils/type-route-mapper'
import { buildDependencyGraph, getTransitiveDependencies } from '../utils/type-dependency-graph'
import { parseTypeDefinitions } from '../utils/parse-type-definitions'
import { classifyTypes } from '../utils/type-classifier'

// ============================================================
// 1. extractTypeNames
// ============================================================
describe('extractTypeNames', () => {
  const knownTypes = new Set([
    'UserType',
    'ProductType',
    'PaginatedResponseType',
    'ErrorType',
  ])

  it('extracts simple type name', () => {
    expect(extractTypeNames('UserType', knownTypes)).toEqual(['UserType'])
  })

  it('extracts generic type names', () => {
    const result = extractTypeNames(
      'PaginatedResponseType<UserType>',
      knownTypes,
    )
    expect(result).toContain('PaginatedResponseType')
    expect(result).toContain('UserType')
  })

  it('extracts union type names', () => {
    const result = extractTypeNames('UserType | ProductType', knownTypes)
    expect(result).toContain('UserType')
    expect(result).toContain('ProductType')
  })

  it('ignores unknown types', () => {
    expect(extractTypeNames('UnknownType', knownTypes)).toEqual([])
  })

  it('handles null/undefined', () => {
    expect(extractTypeNames(null, knownTypes)).toEqual([])
    expect(extractTypeNames(undefined, knownTypes)).toEqual([])
    expect(extractTypeNames('', knownTypes)).toEqual([])
  })
})

// ============================================================
// 2. buildTypeToModuleMap
// ============================================================
describe('buildTypeToModuleMap', () => {
  const knownTypes = new Set([
    'UserResponseType',
    'UserCreateType',
    'ProductListType',
    'ErrorType',
  ])

  it('maps types to modules from route response/request', () => {
    const combined = [
      {
        moduleName: 'user',
        routes: [
          {
            response: { type: 'UserResponseType', errorType: 'ErrorType' },
            request: { payload: { type: 'UserCreateType' } },
          },
        ],
      },
      {
        moduleName: 'product',
        routes: [
          {
            response: { type: 'ProductListType', errorType: 'ErrorType' },
            request: {},
          },
        ],
      },
    ]

    const result = buildTypeToModuleMap(combined, knownTypes)

    // UserResponseType → User 모듈만
    expect(result.get('UserResponseType')).toEqual(new Set(['User']))
    // ErrorType → User + Product 모듈 (shared)
    expect(result.get('ErrorType')?.size).toBe(2)
    expect(result.get('ErrorType')).toContain('User')
    expect(result.get('ErrorType')).toContain('Product')
  })

  it('returns empty map for undefined combined', () => {
    const result = buildTypeToModuleMap(undefined, knownTypes)
    expect(result.size).toBe(0)
  })

  it('normalizes moduleName to PascalCase', () => {
    const combined = [
      {
        moduleName: 'user-profile',
        routes: [
          {
            response: { type: 'UserResponseType' },
            request: {},
          },
        ],
      },
    ]

    const result = buildTypeToModuleMap(combined, knownTypes)
    expect(result.get('UserResponseType')).toContain('UserProfile')
  })
})

// ============================================================
// 3. buildDependencyGraph
// ============================================================
describe('buildDependencyGraph', () => {
  it('detects direct dependencies between types', () => {
    const parsedTypes = {
      UserType: 'export interface UserType { name: string; role: RoleType }',
      RoleType: 'export type RoleType = "admin" | "user"',
      ProductType: 'export interface ProductType { id: number }',
    }

    const graph = buildDependencyGraph(parsedTypes)

    expect(graph.get('UserType')).toContain('RoleType')
    expect(graph.get('UserType')).not.toContain('ProductType')
    expect(graph.get('RoleType')?.size).toBe(0)
  })

  it('does not include self-references', () => {
    const parsedTypes = {
      TreeType: 'export interface TreeType { children: TreeType[] }',
    }

    const graph = buildDependencyGraph(parsedTypes)
    expect(graph.get('TreeType')?.size).toBe(0)
  })
})

// ============================================================
// 4. getTransitiveDependencies
// ============================================================
describe('getTransitiveDependencies', () => {
  it('tracks transitive dependencies (A -> B -> C)', () => {
    const graph = new Map<string, Set<string>>([
      ['A', new Set(['B'])],
      ['B', new Set(['C'])],
      ['C', new Set()],
    ])

    const deps = getTransitiveDependencies(graph, 'A')
    expect(deps).toContain('B')
    expect(deps).toContain('C')
  })

  it('handles circular references without infinite loop', () => {
    const graph = new Map<string, Set<string>>([
      ['A', new Set(['B'])],
      ['B', new Set(['A'])],
    ])

    const deps = getTransitiveDependencies(graph, 'A')
    expect(deps).toContain('B')
  })
})

// ============================================================
// 5. parseTypeDefinitions
// ============================================================
describe('parseTypeDefinitions', () => {
  it('parses interfaces, types, and consts', () => {
    const content = `export interface UserType {
  name: string
}

export type StatusType = keyof typeof StatusTypeMap

export const StatusTypeMap = {
  active: "active",
  inactive: "inactive",
} as const`

    const result = parseTypeDefinitions(content)

    expect(result).toHaveProperty('UserType')
    expect(result).toHaveProperty('StatusType')
    expect(result).toHaveProperty('StatusTypeMap')
    expect(result['UserType']).toContain('interface UserType')
  })
})

// ============================================================
// 6. classifyTypes (integration)
// ============================================================
describe('classifyTypes', () => {
  const dataContracts = `export interface UserResponseType {
  id: number
  name: string
}

export interface UserCreateType {
  name: string
}

export interface ProductListType {
  items: ProductItemType[]
}

export interface ProductItemType {
  id: number
  title: string
}

export interface ErrorType {
  message: string
  code: number
}

export interface OrphanType {
  unused: boolean
}`

  const combined = [
    {
      moduleName: 'user',
      routes: [
        {
          response: { type: 'UserResponseType', errorType: 'ErrorType' },
          request: { payload: { type: 'UserCreateType' } },
        },
      ],
    },
    {
      moduleName: 'product',
      routes: [
        {
          response: { type: 'ProductListType', errorType: 'ErrorType' },
          request: {},
        },
      ],
    },
  ]

  it('classifies module-exclusive types correctly', () => {
    const result = classifyTypes(dataContracts, combined)

    // UserResponseType, UserCreateType → User 모듈 전용
    const userTypes = result.moduleTypes.get('User') || []
    expect(userTypes).toContain('UserResponseType')
    expect(userTypes).toContain('UserCreateType')
  })

  it('classifies shared types correctly (used by 2+ modules)', () => {
    const result = classifyTypes(dataContracts, combined)

    // ErrorType → User + Product 둘 다에서 사용 → shared
    expect(result.sharedTypes).toContain('ErrorType')
  })

  it('classifies orphan types as shared', () => {
    const result = classifyTypes(dataContracts, combined)

    // OrphanType → 어디서도 참조 안 됨 → shared
    expect(result.sharedTypes).toContain('OrphanType')
  })

  it('propagates dependencies to the same module', () => {
    const result = classifyTypes(dataContracts, combined)

    // ProductItemType은 ProductListType의 content에서 참조됨
    // ProductListType → Product 모듈 → ProductItemType도 Product 모듈
    const productTypes = result.moduleTypes.get('Product') || []
    expect(productTypes).toContain('ProductListType')
    expect(productTypes).toContain('ProductItemType')
  })

  it('handles undefined combined (all types become shared)', () => {
    const result = classifyTypes(dataContracts, undefined)

    expect(result.moduleTypes.size).toBe(0)
    expect(result.sharedTypes.length).toBeGreaterThan(0)
  })

  it('ensures no type is duplicated across modules and shared', () => {
    const result = classifyTypes(dataContracts, combined)

    const allModuleTypes = new Set<string>()
    for (const types of result.moduleTypes.values()) {
      for (const t of types) {
        expect(allModuleTypes.has(t)).toBe(false)
        expect(result.sharedTypes.includes(t)).toBe(false)
        allModuleTypes.add(t)
      }
    }
  })

  it('ensures all types are accounted for (no missing types)', () => {
    const result = classifyTypes(dataContracts, combined)

    const allTypes = new Set<string>()
    for (const types of result.moduleTypes.values()) {
      types.forEach((t) => allTypes.add(t))
    }
    result.sharedTypes.forEach((t) => allTypes.add(t))

    const parsed = parseTypeDefinitions(dataContracts)
    for (const typeName of Object.keys(parsed)) {
      expect(allTypes.has(typeName)).toBe(true)
    }
  })
})

// ============================================================
// 7. enumMap co-location
// ============================================================
describe('enumMap co-location', () => {
  const dataContracts = `export type StatusType = keyof typeof StatusTypeMap

export const StatusTypeMap = {
  active: "active",
  inactive: "inactive",
} as const

export interface UserType {
  status: StatusType
}`

  it('places enumMap const in same location as its base type', () => {
    const combined = [
      {
        moduleName: 'user',
        routes: [
          {
            response: { type: 'UserType' },
            request: {},
          },
        ],
      },
    ]

    const result = classifyTypes(dataContracts, combined)

    // StatusType is referenced by UserType (via dependency graph) → User module
    // StatusTypeMap should follow StatusType
    const userTypes = result.moduleTypes.get('User') || []

    // Both StatusType and StatusTypeMap should be in the same place
    if (userTypes.includes('StatusType')) {
      expect(userTypes).toContain('StatusTypeMap')
    } else if (result.sharedTypes.includes('StatusType')) {
      expect(result.sharedTypes).toContain('StatusTypeMap')
    }
  })
})
