export const notify = async ({
  msg,
  options,
}: {
  msg: string
  options: NotificationOptions
}): Promise<void> => {
  figma.notify(msg, options)
}
