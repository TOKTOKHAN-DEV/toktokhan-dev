export const addAlpha = (color: string, opacity: number): string => {
  // opacity가 정확히 0(완전 투명)일 때 `||`는 falsy로 취급해 기본값 1(불투명)로
  // 뒤집어버리므로, undefined/null일 때만 기본값을 적용하는 `??`를 사용한다.
  const _opacity = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255)
  return color + _opacity.toString(16).padStart(2, '0').toUpperCase()
}
