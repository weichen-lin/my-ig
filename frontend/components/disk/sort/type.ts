import { RefObject } from 'react'
import { DiskStatus } from 'context/diskStatus'

export interface DateTimePickerProps {
  diskStatus: DiskStatus
  isOpen: boolean
  handleOpen: () => void
  ref: RefObject<HTMLDivElement> | null
  handleChange: (dates: [Date | null, Date | null]) => void
}
