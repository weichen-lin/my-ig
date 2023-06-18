export enum APIS {
  AUTH = '/auth',
  USER_LOGIN = '/user/login',
  USER_REGISTER = '/user/register',
  FOLDER = '/folder',
  FILE = '/file',
  DISK = '/disk',
  UPDATE_DESCRIPTION = '/file/description',
  UPDATE_TAG = '/file/tag',
  UPDATE_FILE_LOCATE = '/file/locate',
  UPDATE_FOLDER_LOCATE = '/folder/locate',
  HEALTH_CHECK = 'healthz',
}

export enum AuthErrorMsgs {
  LOGIN_INVALID = '帳號或密碼錯誤，請重新輸入',
  EMAIL_INVALID = 'Email 格式錯誤，請重新輸入',
}
