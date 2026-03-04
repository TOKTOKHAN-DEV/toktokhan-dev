import { upperFirst, camelCase } from 'lodash'

/**
 * route의 type 문자열에서 알려진 타입 이름들을 추출합니다.
 * 제네릭, 유니온, 인터섹션, 배열 등에서 타입 이름을 추출합니다.
 *
 * 예: "PaginatedResponse<UserType>" -> ["PaginatedResponse", "UserType"]
 */
export function extractTypeNames(
  typeString: string | undefined | null,
  knownTypes: Set<string>,
): string[] {
  if (!typeString) return []
  const identifiers = typeString.match(/\b[A-Z]\w+/g) || []
  return identifiers.filter((id) => knownTypes.has(id))
}

/**
 * swagger-typescript-api의 routes.combined에서 타입-모듈 매핑을 구축합니다.
 *
 * 각 route의 response.type, response.errorType, request.payload.type,
 * request.query.type에서 타입 이름을 추출하여, 어느 모듈에서 사용하는지 매핑합니다.
 *
 * @returns Map<typeName, Set<moduleName>> (moduleName은 PascalCase로 정규화)
 */
export function buildTypeToModuleMap(
  combined:
    | { moduleName: string; routes: any[] }[]
    | undefined,
  knownTypeNames: Set<string>,
): Map<string, Set<string>> {
  const typeToModules = new Map<string, Set<string>>()

  if (!combined) return typeToModules

  for (const moduleGroup of combined) {
    // moduleName을 PascalCase로 정규화 (write-swagger.ts의 filename과 일치시키기 위해)
    const normalizedModuleName = upperFirst(camelCase(moduleGroup.moduleName))

    for (const route of moduleGroup.routes) {
      // ParsedRoute의 .d.ts는 request: Request, response: Response (DOM 타입)으로 선언되어 있으나
      // 런타임에는 swagger-typescript-api 내부 객체임. as any 캐스팅 필요.
      const r = route as any

      const typeStrings: (string | undefined)[] = [
        r.response?.type,
        r.response?.errorType,
        r.request?.payload?.type,
        r.request?.query?.type,
      ]

      // request.parameters에서도 타입 추출 (path params 등)
      if (r.request?.parameters) {
        for (const param of Object.values(r.request.parameters) as any[]) {
          if (param?.type) {
            typeStrings.push(param.type)
          }
        }
      }

      for (const typeStr of typeStrings) {
        const extracted = extractTypeNames(typeStr, knownTypeNames)
        for (const typeName of extracted) {
          if (!typeToModules.has(typeName)) {
            typeToModules.set(typeName, new Set())
          }
          typeToModules.get(typeName)!.add(normalizedModuleName)
        }
      }
    }
  }

  return typeToModules
}
