import { Obj } from '@toktokhan-dev/universal'

export const objectToBlob = (object: Obj) => {
  const json = JSON.stringify(object)
  const blob = new Blob([json], { type: 'application/json' })
  return blob
}
