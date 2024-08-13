export type RequiredOrNot = 'required' | 'not_required'
export type RequiredOrNotText =
  | "required(HELPER_TEXT['REQUIRED_INPUT'])"
  | 'notRequired()'

/**
 * @description required(...) 혹은 notRequired()를 반환합니다.
 * @param type required | not_required
 */
export const getRequiredOrNot = (type: RequiredOrNot): RequiredOrNotText => {
  return type === 'required' ?
      "required(HELPER_TEXT['REQUIRED_INPUT'])"
    : 'notRequired()'
}
