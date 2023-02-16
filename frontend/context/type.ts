export interface FileData {
  name: string
  url: string
  last_modified_at: string
  id: string
  tags: string[]
}

export interface FolderData {
  name: string
  last_modified_at: string
  id: number
}

export type UploadingFiles = Map<string, number>
