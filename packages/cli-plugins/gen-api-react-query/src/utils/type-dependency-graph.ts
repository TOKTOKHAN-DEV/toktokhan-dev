/**
 * 코드에서 주석과 문자열 리터럴을 제거합니다.
 * false positive 의존성 감지를 방지합니다. (예: 주석 내 타입명 언급)
 */
function stripNonCode(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/'[^']*'/g, '""')
    .replace(/"[^"]*"/g, '""')
    .replace(/`[^`]*`/g, '""')
}

/**
 * 렌더링된 타입 블록들 간의 의존성 그래프를 구축합니다.
 *
 * 각 타입 블록의 TypeScript 코드에서 다른 타입 이름이 참조되는지를
 * 단어 경계 기반 정규식으로 감지합니다.
 * 주석과 문자열 리터럴은 제거 후 매칭하여 false positive를 줄입니다.
 *
 * @param parsedTypes - parseTypeDefinitions의 결과 (typeName -> renderedBlock)
 * @returns Map<typeName, Set<referencedTypeName>> - 직접 의존성 그래프
 */
export function buildDependencyGraph(
  parsedTypes: Record<string, string>,
): Map<string, Set<string>> {
  const knownTypes = Object.keys(parsedTypes)
  const graph = new Map<string, Set<string>>()

  // Pre-compile regexes once (O(n) instead of O(n²) compilations)
  const compiledPatterns = new Map<string, RegExp>()
  for (const known of knownTypes) {
    const escaped = known.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    compiledPatterns.set(known, new RegExp(`\\b${escaped}\\b`))
  }

  for (const [typeName, typeBlock] of Object.entries(parsedTypes)) {
    const deps = new Set<string>()
    const cleanBlock = stripNonCode(typeBlock)

    for (const known of knownTypes) {
      if (known !== typeName && compiledPatterns.get(known)!.test(cleanBlock)) {
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
