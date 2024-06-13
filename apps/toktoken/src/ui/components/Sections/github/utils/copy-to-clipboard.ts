const unsecuredCopyToClipboard = (text: string) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)

  textArea.select()

  try {
    document.execCommand('copy')
  } catch (e) {
    console.error('Unable to copy content to clipboard!', e)
  }

  document.body.removeChild(textArea)
}

export const copyToClipboard = (content: string) => {
  if (
    window.isSecureContext &&
    typeof navigator?.clipboard?.writeText === 'function'
  ) {
    navigator.clipboard.writeText(content)
  } else {
    unsecuredCopyToClipboard(content)
  }
}
