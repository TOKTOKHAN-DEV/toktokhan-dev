export const ifElse =
  <V, T, F>(
    condition: (params: V) => boolean,
    onTrue: (params: V) => T,
    onFalse: (params: V) => F,
  ) =>
  (params: V) => {
    return condition(params) ? onTrue(params) : onFalse(params)
  }
