interface TextProps {
  /**
   * 텍스트
   */
  children: React.ReactNode
}

/**
 * 임시예제
 *
 * @param props - TextProps
 *
 * @returns JSX.Element
 *
 * @additional example/content.md
 */
export const Text = (props: TextProps) => {
  return <p>{props.children}</p>
}
