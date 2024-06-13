export const isNullish = <T>(value: T): value is Extract<null | undefined, T> =>
  value === null || value === undefined

const a = () => {}
