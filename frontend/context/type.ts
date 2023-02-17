export interface FileData {
  name: string
  url: string
  last_modified_at: string
  id: string
  tags: string[]
  description: string | null
}

export interface FolderData {
  name: string
  last_modified_at: string
  id: string
}
