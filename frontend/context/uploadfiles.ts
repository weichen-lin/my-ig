import { atom } from 'recoil'
import { UploadingFiles } from './type'

export const uploadInitState = atom<UploadingFiles>({
  key: 'uploadfiles',
  default: new Map()
})
