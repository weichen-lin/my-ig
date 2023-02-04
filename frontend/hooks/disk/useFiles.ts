import { useState } from 'react'
import { FileType, ListMethod } from './type'
import { useRecoilState } from 'recoil'
import { filesInitState } from 'context/file'

// const fakeFolder: DiskData[] = [
//   {
//     type: FileType.Folder,
//     id: 0,
//     name: '測試資料夾 1',
//     last_modified_data: '2022/12/10',
//     index: 1,
//     isDragHovered: false,
//     isBeingDragged: false,
//     before: null,
//     next: 2
//   },
//   {
//     type: FileType.Folder,
//     id: 2,
//     name: '測試資料夾 2',
//     last_modified_data: '2022/12/10',
//     index: 2,
//     isDragHovered: false,
//     isBeingDragged: false,
//     before: 1,
//     next: 3
//   },
//   {
//     type: FileType.Folder,
//     id: 4,
//     name: '測試資料夾 3',
//     last_modified_data: '2022/12/10',
//     index: 3,
//     isDragHovered: false,
//     isBeingDragged: false,
//     before: 2,
//     next: 4
//   }
// ]

// const fakeFile: DiskData[] = [
//   {
//     type: FileType.File,
//     id: 1,
//     name: '測試圖片 1',
//     url: 'https://img95.699pic.com/photo/50085/7021.jpg_wh300.jpg',
//     last_modified_data: '2022/12/10',
//     index: 1,
//     isDragHovered: false,
//     isBeingDragged: false,
//     before: null,
//     next: 2
//   },
//   {
//     type: FileType.File,
//     id: 3,
//     name: '測試圖片 2',
//     url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ILNpSl3GUdnkYJ8h4nrhTxuvnQh7Kb2H9g&usqp=CAU',
//     last_modified_data: '2022/12/10',
//     index: 2,
//     isDragHovered: false,
//     isBeingDragged: false,
//     before: 1,
//     next: 3
//   }
// ]

export default function useFile() {
  const [files, setFiles] = useRecoilState(filesInitState)

  return {}
}
