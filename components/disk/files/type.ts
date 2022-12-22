export interface FormatProp {
  listMethod: number;
}

export interface FolderProps extends FormatProp {
  folderName: string;
}

export interface FilesProps extends FormatProp {
  imgUrl: string;
  fileName: string;
}
