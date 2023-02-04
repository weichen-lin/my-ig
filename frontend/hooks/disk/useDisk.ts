import { useState } from 'react'
import { DiskData } from './type'
import { FileType, ListMethod } from './type'
import { useRecoilState } from 'recoil'

const fakeFolder: DiskData[] = [
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

const fakeFile: DiskData[] = [
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
    next: 2
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
    next: 3
  }
]

type listMethodState = 0 | 1

const fakeData: DiskData[] = [
  // {
  //   type: FileType.Folder,
  //   id: 0,
  //   name: '測試資料夾 1',
  //   last_modified_data: '2022/12/10',
  //   index: 1,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: null,
  //   next: 2
  // },
  // {
  //   type: FileType.File,
  //   id: 1,
  //   name: '測試圖片 1',
  //   url: 'https://img95.699pic.com/photo/50085/7021.jpg_wh300.jpg',
  //   last_modified_data: '2022/12/10',
  //   index: 1,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: null,
  //   next: 2
  // },
  // {
  //   type: FileType.Folder,
  //   id: 2,
  //   name: '測試資料夾 2',
  //   last_modified_data: '2022/12/10',
  //   index: 2,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: 1,
  //   next: 3
  // },
  // {
  //   type: FileType.File,
  //   id: 3,
  //   name: '測試圖片 2',
  //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ILNpSl3GUdnkYJ8h4nrhTxuvnQh7Kb2H9g&usqp=CAU',
  //   last_modified_data: '2022/12/10',
  //   index: 2,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: 1,
  //   next: 3
  // },
  // {
  //   type: FileType.Folder,
  //   id: 4,
  //   name: '測試資料夾 3',
  //   last_modified_data: '2022/12/10',
  //   index: 3,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: 2,
  //   next: 4
  // },
  // {
  //   type: FileType.File,
  //   id: 5,
  //   name: '測試圖片 3',
  //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq6_irvtrL7374-mW6_a1f_ly9RuuMpPRV0w&usqp=CAU',
  //   last_modified_data: '2022/12/10',
  //   index: 3,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: 2,
  //   next: 4
  // },
  // {
  //   type: FileType.Folder,
  //   id: 6,
  //   name: '測試資料夾 4',
  //   last_modified_data: '2022/12/10',
  //   index: 4,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: 3,
  //   next: 5
  // },
  // {
  //   type: FileType.File,
  //   id: 7,
  //   name: '測試圖片 4',
  //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ-OkovXSe8dSCrSUedf22LT2b1nDpilrITA&usqp=CAU',
  //   last_modified_data: '2022/12/10',
  //   index: 4,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: 3,
  //   next: 5
  // },
  // {
  //   type: FileType.Folder,
  //   id: 8,
  //   name: '測試資料夾 5測試資料夾 3測試資料夾 3測試資料夾 3',
  //   last_modified_data: '2022/12/10',
  //   index: 4,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: 4,
  //   next: null
  // },
  // {
  //   type: FileType.File,
  //   id: 9,
  //   name: '測試圖片 5',
  //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQWCS-virQk74by2FXdoHKkiYglVKPsYrL2Q&usqp=CAU',
  //   last_modified_data: '2022/12/10',
  //   index: 5,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: 4,
  //   next: null
  // },
  // {
  //   type: FileType.File,
  //   id: 10,
  //   name: '測試圖片 6',
  //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLIBhNbqc6AZoJCa24KOFAVXZ_lUdK6aQgrA&usqp=CAU',
  //   last_modified_data: '2022/12/10',
  //   index: 6,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: 4,
  //   next: null
  // },
  // {
  //   type: FileType.File,
  //   id: 11,
  //   name: '測試圖片 hehexd測試圖片 hehexd測試圖片 hehexd測試圖片 hehexd測試圖片 hehexd測試圖片 hehexd',
  //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTc-YRUKLl064AWHpTb64qB8Y93tID5zMgHg&usqp=CAU',
  //   last_modified_data: '2022/12/10',
  //   index: 7,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: 4,
  //   next: null
  // },
  // {
  //   type: FileType.File,
  //   id: 12,
  //   name: '測試圖片 asdasd',
  //   url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg',
  //   last_modified_data: '2022/12/10',
  //   index: 8,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: 4,
  //   next: null
  // },
  // {
  //   type: FileType.File,
  //   id: 13,
  //   name: '測試圖片 asdasda',
  //   url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQASurDBcs1nX1Im0cwnRvX3sIYN09ePidkUeluGP8w96T6F-FWRexLddrRWkvI51_8AFg&usqp=CAU',
  //   last_modified_data: '2022/12/10',
  //   index: 9,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: 4,
  //   next: null
  // },
  // {
  //   type: FileType.File,
  //   id: 14,
  //   name: '測試圖片 64564',
  //   url: 'https://imgv3.fotor.com/images/homepage-feature-card/%E5%9C%96%E7%89%87%E8%A3%81%E5%89%AA.jpg',
  //   last_modified_data: '2022/12/10',
  //   index: 10,
  //   isDragHovered: false,
  //   isBeingDragged: false,
  //   before: 4,
  //   next: null
  // }
]

export default function useDisk() {
  const [listMethod, setListMethod] = useState<listMethodState>(
    ListMethod.Lattice
  )
  const [data, setData] = useState<DiskData[]>([])

  const folderData = fakeData.filter((e) => e.type === FileType.Folder)
  const fileData = fakeData.filter((e) => e.type === FileType.File)

  const [folders, setFolders] = useState(folderData)
  const [files, setFiles] = useState(fileData)

  const handleListMethod = () => {
    if (listMethod === ListMethod.Lattice) {
      setListMethod(ListMethod.List)
    } else {
      setListMethod(ListMethod.Lattice)
    }
  }

  return {
    listMethod,
    handleListMethod,
    data,
    setData,
    folders,
    setFolders,
    files,
    setFiles
  }
}
