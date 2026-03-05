import {
  buildDependencyGraph,
  getTransitiveDependencies,
} from './type-dependency-graph'
import { buildTypeToModuleMap } from './type-route-mapper'
import { parseTypeDefinitions } from './parse-type-definitions'

export interface ClassificationResult {
  /** 모듈 전용 타입 이름 목록. key는 PascalCase moduleName */
  moduleTypes: Map<string, string[]>
  /** 공유 타입 이름 목록 (2+ 모듈에서 사용 또는 orphan) */
  sharedTypes: string[]
  /** 파싱된 타입 블록 (typeName -> rendered code block) */
  parsedTypes: Record<string, string>
}

/**
 * data-contracts.ts의 타입들을 모듈별/공유로 분류합니다.
 *
 * 분류 알고리즘:
 * 1. 직접 매핑: route에서 참조하는 타입 → 해당 모듈에 소속
 * 2. 의존성 전파: 타입이 참조하는 다른 타입도 같은 모듈에 소속
 * 3. 공유 판별: 2개 이상 모듈에 소속된 타입 → shared
 * 4. Orphan 처리: 어디에도 소속되지 않은 타입 → shared
 * 5. 전이적 공유: shared 타입이 참조하는 타입도 shared로 격상
 * 6. enumMap 동반 이동: *Map const는 base type과 동일 파일에 배치
 */
export function classifyTypes(
  dataContractsContent: string,
  routesCombined:
    | { moduleName: string; routes: any[] }[]
    | undefined,
): ClassificationResult {
  const parsedTypes = parseTypeDefinitions(dataContractsContent)
  const allTypeNames = new Set(Object.keys(parsedTypes))

  // Step 1: 타입-모듈 직접 매핑
  const typeToModules = buildTypeToModuleMap(routesCombined, allTypeNames)

  // Step 2: 의존성 그래프 구축 + 의존성 전파
  const depGraph = buildDependencyGraph(parsedTypes)

  // 의존성 전파: 각 타입의 전이적 의존성도 같은 모듈에 추가
  for (const [typeName, modules] of typeToModules.entries()) {
    const transitiveDeps = getTransitiveDependencies(depGraph, typeName)
    for (const dep of transitiveDeps) {
      if (!typeToModules.has(dep)) {
        typeToModules.set(dep, new Set())
      }
      for (const mod of modules) {
        typeToModules.get(dep)!.add(mod)
      }
    }
  }

  // Step 3: 분류 (module-exclusive vs shared vs orphan)
  const moduleTypesMap = new Map<string, Set<string>>()
  const sharedTypesSet = new Set<string>()

  for (const typeName of allTypeNames) {
    const modules = typeToModules.get(typeName)

    if (!modules || modules.size === 0) {
      // Orphan: 어디서도 참조되지 않음 → shared (안전 기본값)
      sharedTypesSet.add(typeName)
    } else if (modules.size === 1) {
      // Module-exclusive: 한 모듈에서만 사용
      const moduleName = [...modules][0]
      if (!moduleTypesMap.has(moduleName)) {
        moduleTypesMap.set(moduleName, new Set())
      }
      moduleTypesMap.get(moduleName)!.add(typeName)
    } else {
      // Shared: 2개 이상 모듈에서 사용
      sharedTypesSet.add(typeName)
    }
  }

  // Step 5: 전이적 공유 — shared 타입이 참조하는 타입도 shared로 격상
  // 순회 중 Set에 추가하지 않고 별도 배열에 수집 후 일괄 적용
  let changed = true
  while (changed) {
    changed = false
    const toPromote: string[] = []

    for (const sharedType of sharedTypesSet) {
      const deps = depGraph.get(sharedType) || new Set()
      for (const dep of deps) {
        if (!sharedTypesSet.has(dep)) {
          toPromote.push(dep)
        }
      }
    }

    for (const dep of toPromote) {
      sharedTypesSet.add(dep)
      for (const [, moduleSet] of moduleTypesMap) {
        moduleSet.delete(dep)
      }
      changed = true
    }
  }

  // Step 6: enumMap 동반 이동 — *Map const는 base type과 동일 위치에 배치
  for (const typeName of allTypeNames) {
    if (typeName.endsWith('Map')) {
      const baseTypeName = typeName.slice(0, -3) // FooTypeMap -> FooType
      if (!allTypeNames.has(baseTypeName)) continue

      // base type이 있는 위치를 찾아서 Map도 같은 곳으로 이동
      if (sharedTypesSet.has(baseTypeName)) {
        // base가 shared → Map도 shared
        sharedTypesSet.add(typeName)
        for (const [, moduleSet] of moduleTypesMap) {
          moduleSet.delete(typeName)
        }
      } else {
        // base가 특정 모듈에 있음 → Map도 같은 모듈로
        for (const [moduleName, moduleSet] of moduleTypesMap) {
          if (moduleSet.has(baseTypeName)) {
            moduleSet.add(typeName)
            // 다른 모듈이나 shared에서 제거
            sharedTypesSet.delete(typeName)
            for (const [otherMod, otherSet] of moduleTypesMap) {
              if (otherMod !== moduleName) {
                otherSet.delete(typeName)
              }
            }
            break
          }
        }
      }
    }
  }

  // 빈 모듈 제거
  for (const [moduleName, typeSet] of moduleTypesMap) {
    if (typeSet.size === 0) {
      moduleTypesMap.delete(moduleName)
    }
  }

  // Set → Array 변환
  const moduleTypes = new Map<string, string[]>()
  for (const [moduleName, typeSet] of moduleTypesMap) {
    moduleTypes.set(moduleName, [...typeSet])
  }

  return {
    moduleTypes,
    sharedTypes: [...sharedTypesSet],
    parsedTypes,
  }
}
