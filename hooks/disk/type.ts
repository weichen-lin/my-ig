export interface FormatProp {
  listMethod: number
}

export interface FolderProps extends FormatProp {
  id: number
  folderName: string
  isOnDrag: boolean
  isDragHovered: boolean
  handleOndrag: (e: number) => void
  handleDragEnter: (e: number) => void
  handleDragEnd: () => void
}

export interface FilesProps extends FormatProp {
  imgUrl: string
  fileName: string
}

export enum FileType {
  Folder,
  File
}

export interface DiskData {
  type: number
  name: string
  url?: string | ArrayBuffer
  last_modified_data: string
  index: number
  isDragHovered: boolean
  id: number
  before: number | null
  next: number | null
}

export interface FormatProp {
  listMethod: number
}

export enum ListMethod {
  Lattice,
  List
}
