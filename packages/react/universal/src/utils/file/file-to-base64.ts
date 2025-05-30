/**
 * @param
 * @category Utils/File
 *
 * 개선
 */
export const fileToBase64 = (
  file: File,
): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
