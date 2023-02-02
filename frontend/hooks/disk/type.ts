export interface FormatProp {
  listMethod: number
}

export interface SelectionStringList {
  selected: Set<string>
  dragged: Set<string>
}

export interface SelectionValue {
  selected: boolean
  dragged: boolean
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
  url?: string
  last_modified_data: string
  index: number
  isDragHovered: boolean
  isBeingDragged: boolean
  id: number
  before: number | null
  next: number | null
  tags?: string[]
}

export enum ListMethod {
  Lattice,
  List
}

export interface FormatProp {
  listMethod: number
}
