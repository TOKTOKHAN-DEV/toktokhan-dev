export type ColorSchemaMap = Record<string, { id: string; value: string }>

export type SemanticTokenMap = Record<
  string,
  { id: string; refId?: string; ref?: string; value?: string }
>

export type ColorKey = 'colorSchema' | 'semanticTokens'

export type ColorResult = Record<ColorKey, object>
