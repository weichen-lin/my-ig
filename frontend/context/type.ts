export interface FileData {
  type: number
  name: string
  url: string
  last_modified_data: string
  index: number
  isDragHovered: boolean
  isBeingDragged: boolean
  id: number
  before: number | null
  next: number | null
  tags: string[]
}

export interface FolderData {
  type: number
  name: string
  last_modified_data: string
  index: number
  isDragHovered: boolean
  isBeingDragged: boolean
  id: number
  before: number | null
  next: number | null
}
