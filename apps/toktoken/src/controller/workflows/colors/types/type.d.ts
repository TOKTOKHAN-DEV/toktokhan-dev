export type ColorSchemaMap = Record<
  string,
  { id: string; value?: string; dark?: string }
>

export type SemanticTokenMode = {
  id: string | null
  refId?: string | null
  ref?: string | null
  value?: string
}

export type SemanticTokenMap = Record<
  string,
  Record<string, SemanticTokenMode>
>

export type ColorKey = 'colorSchema' | 'semanticTokens'

export type ColorResult = Record<ColorKey, object>
