import { FolderData, FileData } from './type'
import { atom } from 'recoil'

// const fakeFolder: FolderData[] = [
//   {
//     id: 0,
//     name: '測試資料夾 1',
//     last_modified_at: '2022/12/10'
//   },
//   {
//     id: 2,
//     name: '測試資料夾 2',
//     last_modified_at: '2022/12/10'
//   },
//   {
//     id: 4,
//     name: '測試資料夾 3',
//     last_modified_at: '2022/12/10'
//   }
// ]

const fakeFolder: FolderData[] = []
const fakeFile: FileData[] = [
  {
    id: 1,
    name: '測試圖片 1',
    url: 'https://img95.699pic.com/photo/50085/7021.jpg_wh300.jpg',
    last_modified_at: '2022/12/10',
    index: 1,
    tags: []
  },
  {
    id: 3,
    name: '測試圖片 2',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ILNpSl3GUdnkYJ8h4nrhTxuvnQh7Kb2H9g&usqp=CAU',
    last_modified_at: '2022/12/10',
    index: 2,
    tags: []
  },
  {
    id: 5,
    name: '測試圖片 2',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ILNpSl3GUdnkYJ8h4nrhTxuvnQh7Kb2H9g&usqp=CAU',
    last_modified_at: '2022/12/10',
    index: 3,
    tags: []
  },
  {
    id: 7,
    name: '測試圖片 2',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ILNpSl3GUdnkYJ8h4nrhTxuvnQh7Kb2H9g&usqp=CAU',
    last_modified_at: '2022/12/10',
    index: 4,
    tags: []
  },
  {
    id: 9,
    name: '測試圖片 2',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ILNpSl3GUdnkYJ8h4nrhTxuvnQh7Kb2H9g&usqp=CAU',
    last_modified_at: '2022/12/10',
    index: 5,
    tags: []
  }
]

export interface DiskDataInterface {
  folders: FolderData[]
  files: FileData[]
}

export const diskInitState = atom<DiskDataInterface>({
  key: 'diskData',
  default: {
    folders: fakeFolder,
    files: fakeFile
  }
})
