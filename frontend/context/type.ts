export interface FileData {
  name: string
  url: string
  last_modified_at: string
  index: number
  id: number
  tags: string[]
}

export interface FolderData {
  name: string
  last_modified_at: string
  id: number
}
