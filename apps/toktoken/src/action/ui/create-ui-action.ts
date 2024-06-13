export const createUIAction = <Payload, Result>(type: string) => {
  const prefix = (type: string) => `ui-action:${type}`

  const request = (payload: Payload) =>
    new Promise<Result>((resolve, reject) => {
      parent.postMessage(
        { pluginMessage: { type: prefix(type), payload } },
        '*',
      )

      const handleMessage = (event: MessageEvent) => {
        const { type: _type, result, error } = event.data.pluginMessage
        if (_type !== prefix(type)) return

        window.removeEventListener('message', handleMessage)
        if (error) return reject(error)
        resolve(result)
      }

      window.addEventListener('message', handleMessage)
    })

  const on = (listener: (payload: Payload) => Result | Promise<Result>) => {
    const handleMessage = async (message: {
      type: string
      payload: Payload
    }) => {
      if (message.type !== prefix(type)) return
      try {
        figma.ui.postMessage({
          type: prefix(type),
          result: await listener(message.payload),
        })
      } catch (e: any) {
        figma.ui.postMessage({ type: prefix(type), error: e.message || e })
      }
    }

    figma.ui.on('message', handleMessage)
    return () => figma.ui.off('message', handleMessage)
  }

  return {
    request,
    on,
  }
}
