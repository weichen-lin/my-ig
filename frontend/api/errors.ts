export type RegisterStatus = 0 | 1 | 2 | 3 | 4

interface RegisterResponseInterface extends Record<RegisterStatus, string> {}

export const RegisterResponse: RegisterResponseInterface = {
  0: '註冊成功',
  1: '未知的錯誤，請聯繫開者人員',
  2: '此 Email已被註冊',
  3: 'Email或密碼格式錯誤',
  4: 'Email格式錯誤',
}

export type FolderStatus = 0 | 1 | 2 | 3 | 4 | 5

export interface FolderResponseInterface extends Record<FolderStatus, string> {}

export const FolderResponse: FolderResponseInterface = {
  0: '新增成功',
  1: '未知的錯誤，請聯繫開者人員',
  2: '資料夾名稱重複',
  3: '資料夾名稱過長',
  4: '請輸入資料夾名稱',
  5: '名稱請勿含有特殊字元',
}
