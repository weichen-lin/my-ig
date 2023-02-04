import { FolderData } from './type'
import { atom } from 'recoil'
import { FileType } from 'hooks/disk/type'

const fakeFolder: FolderData[] = [
  {
    type: FileType.Folder,
    id: 0,
    name: '測試資料夾 1',
    last_modified_data: '2022/12/10',
    index: 1,
    isDragHovered: false,
    isBeingDragged: false,
    before: null,
    next: 2
  },
  {
    type: FileType.Folder,
    id: 2,
    name: '測試資料夾 2',
    last_modified_data: '2022/12/10',
    index: 2,
    isDragHovered: false,
    isBeingDragged: false,
    before: 1,
    next: 3
  },
  {
    type: FileType.Folder,
    id: 4,
    name: '測試資料夾 3',
    last_modified_data: '2022/12/10',
    index: 3,
    isDragHovered: false,
    isBeingDragged: false,
    before: 2,
    next: 4
  }
]

export const folderInitState = atom<FolderData[]>({
  key: 'folderData',
  default: fakeFolder
})
