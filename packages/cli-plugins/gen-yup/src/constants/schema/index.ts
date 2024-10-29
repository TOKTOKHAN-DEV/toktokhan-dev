type Profile =
  | 'phone'
  | 'cellPhone'
  | 'businessPhone'
  | 'birthdate'
  | 'nickname'
  | 'username'
  | 'lastName'
  | 'firstName'

type Authentication =
  | 'id'
  | 'email'
  | 'password'
  | 'passwordConfirm'
  | 'newPassword'
  | 'newPasswordConfirm'

type VerificationCode = 'emailVerificationCode' | 'cellPhoneVerificationCode'

type Address = 'postcode' | 'addressMain' | 'addressDetail' | 'city' | 'region'

export type SchemaValue = Authentication | VerificationCode | Profile | Address

export const schemaList: {
  name: string
  value: SchemaValue
}[] = [
  { name: '아이디', value: 'id' },
  { name: '비밀번호', value: 'password' },
  { name: '비밀번호_확인', value: 'passwordConfirm' },
  { name: '새_비밀번호', value: 'newPassword' },
  { name: '새_비밀번호_확인', value: 'newPasswordConfirm' },
  { name: '이메일', value: 'email' },
  { name: '이메일_인증번호', value: 'emailVerificationCode' },
  { name: '휴대폰_번호', value: 'cellPhone' },
  { name: '휴대폰_인증번호', value: 'cellPhoneVerificationCode' },
  { name: '유선_번호', value: 'phone' },
  { name: '회사_번호', value: 'businessPhone' },
  { name: '생년월일', value: 'birthdate' },
  { name: '닉네임', value: 'nickname' },
  { name: '우편번호', value: 'postcode' },
  { name: '기본주소', value: 'addressMain' },
  { name: '상세주소', value: 'addressDetail' },
  { name: '도시', value: 'city' },
  { name: '주/지역', value: 'region' },
  { name: '이름_(username)', value: 'username' },
  { name: '이름_(first_name)', value: 'firstName' },
  { name: '성_(last_name)', value: 'lastName' },
]
