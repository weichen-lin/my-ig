import { FolderData, FileData } from './type'
import { atom } from 'recoil'

export interface DiskDataInterface {
  folders: FolderData[]
  files: FileData[]
}

export const diskInitState = atom<DiskDataInterface>({
  key: 'diskData',
  default: {
    folders: [],
    files: []
  }
})
