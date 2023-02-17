export interface FormatProp {
  listMethod: number
}

export interface GdriveSelectTarget {
  folders: Set<string>
  files: Set<string>
}

export interface SelectionStringList {
  selected: Set<string>
  dragged: Set<string>
}

export interface SelectionValue {
  isSelected: boolean
  isDragged: boolean
}

export enum FileType {
  Folder,
  File
}

export enum ListMethod {
  Lattice,
  List
}
