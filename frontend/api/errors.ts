// export enum User_CRUD_STATUS {
//   SUCCESS,
//   UNKNOWN_ERROR,
//   EMAIL_DUPLICATED,
//   INVALID_BODY_FORMAT,
//   INVALID_EAMIL_FORMAT
// }

// export enum Auth_STATUS {
//   NOT_AUTHORIZED,
//   OUT_DATED,
//   AUTHORIZED
// }

export type RegisterStatus = 0 | 1 | 2 | 3 | 4

interface RegisterResponseInterface extends Record<RegisterStatus, string> {}

export const RegisterResponse: RegisterResponseInterface = {
  0: '註冊成功',
  1: '未知的錯誤，請聯繫開者人員',
  2: '此 Email已被註冊',
  3: 'Email或密碼格式錯誤',
  4: 'Email格式錯誤'
}
