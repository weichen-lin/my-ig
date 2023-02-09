import { atom } from 'recoil'

export interface DiskStatus {
  startDate: Date
  endDate: Date | null
  searchValue: string
  isFetching: boolean
  current_folder: string
}

const start = new Date()
const end = new Date()

export const diskStatusInitState = atom<DiskStatus>({
  key: 'diskStatus',
  default: {
    startDate: start,
    endDate: end,
    searchValue: '',
    isFetching: true,
    current_folder: ''
  }
})
