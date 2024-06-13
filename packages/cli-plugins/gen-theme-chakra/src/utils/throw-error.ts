export const throwError = (message: string): never => {
  throw new Error(`\x1b[31m⚠️ Tokript Error: ${message} ⚠️\x1b[0m`)
}
