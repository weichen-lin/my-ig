import { FileData } from './type'
import { atom } from 'recoil'
import { FileType } from 'hooks/disk/type'

const fakeFile: FileData[] = [
  {
    type: FileType.File,
    id: 1,
    name: '測試圖片 1',
    url: 'https://img95.699pic.com/photo/50085/7021.jpg_wh300.jpg',
    last_modified_data: '2022/12/10',
    index: 1,
    isDragHovered: false,
    isBeingDragged: false,
    before: null,
    next: 2,
    tags: []
  },
  {
    type: FileType.File,
    id: 3,
    name: '測試圖片 2',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ILNpSl3GUdnkYJ8h4nrhTxuvnQh7Kb2H9g&usqp=CAU',
    last_modified_data: '2022/12/10',
    index: 2,
    isDragHovered: false,
    isBeingDragged: false,
    before: 1,
    next: 3,
    tags: []
  }
]

export const filesInitState = atom<FileData[]>({
  key: 'fileData',
  default: fakeFile
})
