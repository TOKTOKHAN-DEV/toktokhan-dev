export type ThemeToken = {
  textStyles: Record<string, TextStyleInputValue>
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

export type ColorModes = {
  light: string
  dark?: string
}
export type TextStyleModes = Partial<Record<BreakPoints, string>>
export type SwatTextStyleMode = Record<string, BreakPoints>

export type BreakPoints = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type TokenModes = {
  colors?: ColorModes
  textStyles?: TextStyleModes
}

export type Entry<T> = T extends Record<infer K, infer V> ? [K, V] : never

export type TextStyleInputObj<K extends string, V> = Record<K, V>

export type ResponsiveValue<T, ObjKey extends string> =
  | T
  | TextStyleInputObj<ObjKey, T>

export interface TextStyleInputValue {
  fontWeight: ResponsiveValue<number, string>
  fontFamily: string
  fontSize: ResponsiveValue<string, string>
  lineHeight: ResponsiveValue<string, string>
  letterSpacing: ResponsiveValue<string, string>
  textDecoration: ResponsiveValue<string, string>
}
export interface TextStyleOutputValue {
  fontWeight: ResponsiveValue<number, BreakPoints>
  fontFamily: string
  fontSize: ResponsiveValue<string, BreakPoints>
  lineHeight: ResponsiveValue<string, BreakPoints>
  letterSpacing: ResponsiveValue<string, BreakPoints>
  textDecoration: ResponsiveValue<string, BreakPoints>
}

export type ExtractResponsiveValue<T> =
  T extends ResponsiveValue<infer V, any> ? V : T
