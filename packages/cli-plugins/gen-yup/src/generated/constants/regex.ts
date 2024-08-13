export const REGEX = {
  ID: /^[A-Za-z\d]{4,16}$/,

  PHONE_VERIFICATION_CODE: /^\d+$/g,

  BIRTHDATE_FORMAT: /^\d{4}-\d{2}-\d{2}$/,
  BIRTHDATE_DETAIL_FORMAT: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,

  NICKNAME: /^[0-9a-zA-Z가-힣]+$/,

  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,

  PHONE: /^010-(\d){4}-(\d){4}$/,

  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,

  EMAIL_VERIFICATION_CODE: /^\d+$/g,

  USERNAME: /^[0-9a-zA-Z가-힣]+$/,

  NUMBER: /^\d+$/g,

  SPECIAL_CHARACTER: /[!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/~`]/,

  POSTCODE_EXCEPT_HYPHEN: /[^\w\s\-]/,
}
