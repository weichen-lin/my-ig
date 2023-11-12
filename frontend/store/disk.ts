import { atom } from 'recoil'

export enum ListMethod {
  Lattice,
  List,
}

export interface CommonProps {
  id: string
  name: string
  lastModifiedAt: string
}

export interface ListProps {
  listMethod: ListMethod
}

export const diskLoadingState = atom({
  key: 'diskLoadingState',
  default: true,
})

export const fileState = atom<CommonProps[]>({
  key: 'fileState',
  default: [],
})

export const folderState = atom<CommonProps[]>({
  key: 'folderState',
  default: [],
})

export const driveState = atom({
  key: 'driveState',
  default: {
    files: [],
    folders: [],
  },
})

export interface Breadcrumb {
  id: string
  name: string
  depth: number
}

export const breadcrumbState = atom<Breadcrumb[]>({
  key: 'breadcrumbState',
  default: [],
})

export const listMethodState = atom({
  key: 'listMethodState',
  default: ListMethod.Lattice,
})

export const OpenImageState = atom({
  key: 'OpenImageState',
  default: {
    isOpen: false,
    index: 0,
  },
})

interface ISelected {
  folders: string[]
  files: string[]
}

export const ContextMenuState = atom({
  key: 'ContextMenuState',
  default: {
    isOpen: false,
    x: 0,
    y: 0,
  },
})

export const SelectedState = atom<ISelected>({
  key: 'Selected',
  default: {
    folders: [],
    files: [],
  },
})
