export const resize = async (size: { w: number; h: number }): Promise<void> => {
  figma.clientStorage
    .getAsync('size')
    .then((size) => {
      if (size) figma.ui.resize(size.w, size.h)
    })
    .catch((err) => {})
  figma.ui.resize(size.w, size.h)
  figma.clientStorage.setAsync('size', size).catch((err) => {})
}
