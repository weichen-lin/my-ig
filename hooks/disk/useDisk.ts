import { useState } from 'react'
import { DiskData } from './type'

export enum ListMethod {
  Lattice,
  List
}

type listMethodState = 0 | 1

export enum FileType {
  Folder,
  File
}

const fakeData: DiskData[] = [
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
    type: FileType.File,
    id: 1,
    name: '測試圖片 1',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg',
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
    type: FileType.File,
    id: 3,
    name: '測試圖片 2',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg',
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
  },
  {
    type: FileType.File,
    id: 5,
    name: '測試圖片 3',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg',
    last_modified_data: '2022/12/10',
    index: 3,
    isDragHovered: false,
    isBeingDragged: false,
    before: 2,
    next: 4
  },
  {
    type: FileType.Folder,
    id: 6,
    name: '測試資料夾 4',
    last_modified_data: '2022/12/10',
    index: 4,
    isDragHovered: false,
    isBeingDragged: false,
    before: 3,
    next: 5
  },
  {
    type: FileType.File,
    id: 7,
    name: '測試圖片 4',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg',
    last_modified_data: '2022/12/10',
    index: 4,
    isDragHovered: false,
    isBeingDragged: false,
    before: 3,
    next: 5
  },
  {
    type: FileType.Folder,
    id: 8,
    name: '測試資料夾 5',
    last_modified_data: '2022/12/10',
    index: 5,
    isDragHovered: false,
    isBeingDragged: false,
    before: 4,
    next: null
  },
  {
    type: FileType.File,
    id: 9,
    name: '測試圖片 5',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg',
    last_modified_data: '2022/12/10',
    index: 5,
    isDragHovered: false,
    isBeingDragged: false,
    before: 4,
    next: null
  }
]

export default function useDisk() {
  const [listMethod, setListMethod] = useState<listMethodState>(
    ListMethod.Lattice
  )
  const [data, setData] = useState<DiskData[]>(fakeData)

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
