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

start.setUTCHours(0, 0, 0, 0)
end.setUTCHours(23, 59, 59, 999)

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
