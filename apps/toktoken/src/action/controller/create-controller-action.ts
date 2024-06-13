export const createControllerAction = <Payload, Result>(type: string) => {
  const prefix = (type: string) => `controller-action:${type}`
  const request = (payload: Payload) =>
    new Promise<Result>((resolve, reject) => {
      figma.ui.postMessage({ type: prefix(type), payload })

      const handleMessage = (message: {
        type: string
        result: Result
        error?: any
      }) => {
        const { type: _type, result, error } = message
        if (_type !== prefix(type)) return

        figma.ui.off('message', handleMessage)
        if (error) return reject(error)
        resolve(result)
      }

      figma.ui.off('message', handleMessage)
      figma.ui.on('message', handleMessage)
    })

  const on = (listener: (payload: Payload) => Result | Promise<Result>) => {
    const message = async (message: MessageEvent) => {
      if (message.data.pluginMessage.type !== prefix(type)) return
      try {
        parent.postMessage(
          {
            pluginMessage: {
              type: prefix(type),
              result: await listener(message.data.pluginMessage.payload),
            },
          },
          '*',
        )
      } catch (e: any) {
        parent.postMessage({ type: prefix(type), error: e.message || e })
      }
    }
    window.addEventListener('message', message)
    return () => window.removeEventListener('message', message)
  }
  return {
    request,
    on,
  }
}
