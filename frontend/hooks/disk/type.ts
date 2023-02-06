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

export enum FileType {
  Folder,
  File
}

export enum ListMethod {
  Lattice,
  List
}
