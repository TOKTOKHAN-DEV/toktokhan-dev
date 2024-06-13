import { Eta } from 'eta'

/**
 * 지정된 변수 이름과 데이터를 사용하여 내보낼 상수를 렌더링합니다.
 *
 * @category Utils/Render
 *
 * @param varName - 상수의 변수 이름입니다.
 * @param data - 상수의 데이터입니다.
 * @returns 렌더링된 상수를 반환합니다.
 * @throws {Error} 대상 템플릿을 찾을 수 없을 때 발생합니다.
 *
 * @example
 * ```typescript
 * // 내보낼 상수를 렌더링하는 예시
 * const renderedConst = renderExportConst('myConst', 'someData');
 * ```
 */
export const renderExportConst = (varName: string, data: string) => {
  const view = new Eta().renderString(
    'export const <%~ it.varName %> = <%~ it.data %>',
    {
      varName,
      data,
    },
  )
  if (!view) {
    throw new Error('Not found target template')
  }

  return view
}
