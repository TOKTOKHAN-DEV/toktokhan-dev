export const delay = (
  ms: number,
  option?: {
    success?: any
    error?: any
  },
) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (option?.error) return reject(option?.error)
      resolve(option?.success || true)
    }, ms),
  )
