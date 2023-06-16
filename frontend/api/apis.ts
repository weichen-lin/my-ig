export enum APIS {
  AUTH = '/api/auth',
  USER_LOGIN = '/api/user/login',
  USER_REGISTER = '/api/user/register',
  FOLDER = '/api/folder',
  FILE = '/api/file',
  DISK = '/api/disk',
  UPDATE_DESCRIPTION = '/api/file/description',
  UPDATE_TAG = '/api/file/tag',
  UPDATE_FILE_LOCATE = '/api/file/locate',
  UPDATE_FOLDER_LOCATE = '/api/folder/locate',
  HEALTH_CHECK = 'healthz',
}

export enum AuthErrorMsgs {
  LOGIN_INVALID = '帳號或密碼錯誤，請重新輸入',
  EMAIL_INVALID = 'Email 格式錯誤，請重新輸入',
}
