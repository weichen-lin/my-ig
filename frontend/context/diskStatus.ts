import { atom } from 'recoil'

export interface CurrentFolder {
  folder_id: string
  folder_name: string
}

export interface DiskStatus {
  startDate: Date
  endDate: Date | null
  searchValue: string
  current_folder: CurrentFolder[]
  canSelect: boolean
  shouldRefresh: boolean
}

const start = new Date()
const end = new Date()

export const diskStatusInitState = atom<DiskStatus>({
  key: 'diskStatus',
  default: {
    startDate: start,
    endDate: end,
    searchValue: '',
    current_folder: [],
    canSelect: true,
    shouldRefresh: false,
  },
})
