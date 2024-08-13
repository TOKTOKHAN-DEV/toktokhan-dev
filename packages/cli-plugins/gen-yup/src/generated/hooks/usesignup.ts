
import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormProps, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { REGEX } from '@/generated/constants/regex'
import { HELPER_TEXT } from '@/generated/constants/helper-text'

export type signupFormDataType = {
  // required
  id: string;
  password: string;
  passwordConfirm: string;
  newPassword: string;
  
  // not required
  newPasswordConfirm: string;
  email: string;
  emailVerificationCode: string;
  };

export type signupFormKeys = keyof signupFormDataType;

export function signupFormSchema() {
  return yup.object().shape({
    
    /** @name 아이디 */
    id: yup
      .string()
      .required(HELPER_TEXT['REQUIRED_INPUT'])
        .test(
        HELPER_TEXT['ID'].SPECIAL_CHARACTER,
        HELPER_TEXT['ID'].SPECIAL_CHARACTER,
        (value) => !REGEX['SPECIAL_CHARACTER'].test(value || ''),
        )
        .matches(REGEX['ID'], HELPER_TEXT['ID'].COMMON),    
      
    /** @name 비밀번호 */
    password: yup
      .string()
      .required(HELPER_TEXT['REQUIRED_INPUT']).matches(REGEX['PASSWORD'], HELPER_TEXT['PASSWORD']),    
      
    /** @name 비밀번호_확인 */
    passwordConfirm: yup
      .string()
      .required(HELPER_TEXT['REQUIRED_INPUT']).oneOf([yup.ref('password')], HELPER_TEXT['PASSWORD_CONFIRM']),    
      
    /** @name 새 비밀번호 */
    newPassword: yup
      .string()
      .required(HELPER_TEXT['REQUIRED_INPUT']).matches(REGEX['PASSWORD'], HELPER_TEXT['PASSWORD']),    
      
    /** @name 새 비밀번호_확인 */
    newPasswordConfirm: yup
      .string()
      .notRequired().oneOf([yup.ref('newPassword')], HELPER_TEXT['PASSWORD_CONFIRM']),    
      
    /** @name 이메일 */
    email: yup
      .string()
      .notRequired().matches(REGEX['EMAIL'], HELPER_TEXT['EMAIL']),    
      
    /** @name 이메일_인증번호 */
    emailVerificationCode: yup
      .string()
      .notRequired(),    
  })
}

export default function usesignupForm(
  options?: UseFormProps<signupFormDataType>,
) {
  return useForm<signupFormDataType>({
    resolver: yupResolver(signupFormSchema()),
    mode: 'onChange',
    ...options,
  });
}
