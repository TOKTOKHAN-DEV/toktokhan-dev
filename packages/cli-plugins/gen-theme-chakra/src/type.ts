import { Obj } from '@toktokhan-dev/universal'

export type ThemeToken = {
  textStyles: Record<
    string,
    {
      fontFamily: string
      fontWeight: string
      fontSize: string
      lineHeight: string
      letterSpacing: string
    }
  >
  colors: {
    colorSchema: Record<string, { id: string; value: string }>
    semanticTokens: Record<
      string,
      Record<
        string,
        {
          id: string
          refId: string
          ref: string
          value: string
        }
      >
    >
  }
}

export type TokenModes = Record<'light' | 'dark', string>
export type TextStyleInfo = {
  key: string
  styles: Obj
  size?: string
}

export type Entry<T> = T extends Record<infer K, infer V> ? [K, V] : never
