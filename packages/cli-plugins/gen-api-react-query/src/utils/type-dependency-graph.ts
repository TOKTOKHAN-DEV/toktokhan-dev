/**
 * 렌더링된 타입 블록들 간의 의존성 그래프를 구축합니다.
 *
 * 각 타입 블록의 TypeScript 코드에서 다른 타입 이름이 참조되는지를
 * 단어 경계 기반 정규식으로 감지합니다.
 *
 * @param parsedTypes - parseTypeDefinitions의 결과 (typeName -> renderedBlock)
 * @returns Map<typeName, Set<referencedTypeName>> - 직접 의존성 그래프
 */
export function buildDependencyGraph(
  parsedTypes: Record<string, string>,
): Map<string, Set<string>> {
  const knownTypes = new Set(Object.keys(parsedTypes))
  const graph = new Map<string, Set<string>>()

  for (const [typeName, typeBlock] of Object.entries(parsedTypes)) {
    const deps = new Set<string>()

    for (const known of knownTypes) {
      const escaped = known.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      if (known !== typeName && new RegExp(`\\b${escaped}\\b`).test(typeBlock)) {
        deps.add(known)
      }
    }

    graph.set(typeName, deps)
  }

  return graph
}

/**
 * 직접 의존성 그래프에서 전이적 의존성을 포함한 전체 의존성을 계산합니다.
 * A -> B -> C면, A의 의존성은 {B, C}가 됩니다.
 */
export function getTransitiveDependencies(
  graph: Map<string, Set<string>>,
  typeName: string,
  visited: Set<string> = new Set(),
): Set<string> {
  if (visited.has(typeName)) return new Set()
  visited.add(typeName)

  const directDeps = graph.get(typeName) || new Set()
  const allDeps = new Set(directDeps)

  for (const dep of directDeps) {
    const transitiveDeps = getTransitiveDependencies(graph, dep, visited)
    for (const td of transitiveDeps) {
      allDeps.add(td)
    }
  }

  return allDeps
}
