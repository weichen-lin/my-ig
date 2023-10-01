import { atom } from 'recoil'

export enum ListMethod {
  Lattice,
  List,
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

const breadcrumbState = atom({
  key: 'breadcrumbState',
  default: [],
})

export const listMethodState = atom({
  key: 'listMethodState',
  default: ListMethod.Lattice,
})
