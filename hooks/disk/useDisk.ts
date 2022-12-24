import { useState } from 'react'

export enum ListMethod {
  Lattice,
  List,
}

type listMethodState = 0 | 1

export enum FileType {
  Folder,
  File,
}

export interface Data {
  type: number
  name: string
  url?: string | ArrayBuffer
  last_modified_data: string
}

const fakeData: Data[] = [
  {
    type: FileType.Folder,
    name: '測試資料夾',
    last_modified_data: '2022/12/10',
  },
  {
    type: FileType.File,
    name: '測試圖片',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg',
    last_modified_data: '2022/12/10',
  },
  {
    type: FileType.Folder,
    name: 'ascasasd',
    last_modified_data: '2022/12/10',
  },
  {
    type: FileType.File,
    name: '測試圖片',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg',
    last_modified_data: '2022/12/10',
  },
  {
    type: FileType.Folder,
    name: 'asdasdasdasdsada qwdq w',
    last_modified_data: '2022/12/10',
  },
  {
    type: FileType.File,
    name: '測試圖片',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg',
    last_modified_data: '2022/12/10',
  },
  {
    type: FileType.Folder,
    name: 'asdasdasd adasdas',
    last_modified_data: '2022/12/10',
  },
  {
    type: FileType.File,
    name: '測試圖片',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg',
    last_modified_data: '2022/12/10',
  },
  {
    type: FileType.Folder,
    name: '測試資料夾',
    last_modified_data: '2022/12/10',
  },
  {
    type: FileType.File,
    name: '測試圖片',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg',
    last_modified_data: '2022/12/10',
  },
]

export default function useDisk() {
  const [listMethod, setListMethod] = useState<listMethodState>(
    ListMethod.Lattice
  )
  const [data, setData] = useState<Data[]>(fakeData)

  return { listMethod, setListMethod, data, setData }
}
