import { atom } from 'recoil'

export enum ListMethod {
  Lattice,
  List,
}

export interface CommonProps {
  id: string
  name: string
  last_modified_at: string
}

export interface ListProps {
  listMethod: ListMethod
}

export const diskLoadingState = atom({
  key: 'diskLoadingState',
  default: true,
})

export const fileState = atom({
  key: 'fileState',
  default: [],
})

export const folderState = atom({
  key: 'folderState',
  default: [],
})

export const driveState = atom({
  key: 'driveState',
  default: {
    isLoading: true,
    files: [],
    folders: [],
  },
})

export const breadcrumbState = atom({
  key: 'breadcrumbState',
  default: {
    isLoading: true,
    breadcrumbs: [],
  },
})

export const listMethodState = atom({
  key: 'listMethodState',
  default: ListMethod.Lattice,
})