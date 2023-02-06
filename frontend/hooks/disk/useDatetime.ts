import { useState, useRef } from 'react'
import { useClickOutside } from 'hooks/utils'
import { diskStatusInitState } from 'context/diskStatus'
import { useRecoilState } from 'recoil'
import useUpdateDisk from './useUpdateDisk'

export default function useDatetime() {
  const [diskStatus, setDiskStatus] = useRecoilState(diskStatusInitState)
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const { getFolders } = useUpdateDisk()

  const handleChange = async (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    start ? start.setUTCHours(0, 0, 0, 0) : new Date().setUTCHours(0, 0, 0, 0)

    setDiskStatus((prev) => ({ ...prev, startDate: start || new Date() }))
    if (
      diskStatus.endDate &&
      diskStatus.startDate.getTime() <= diskStatus.endDate?.getTime()
    ) {
      setDiskStatus((prev) => ({ ...prev, endDate: null }))
    }
    if (end) {
      end.setUTCHours(23, 59, 59, 999)
      setDiskStatus((prev) => ({ ...prev, endDate: end }))
      setIsOpen(false)
      // getFolders(start || new Date(), end)
    }
  }

  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  useClickOutside(ref, () => {
    setIsOpen(false)

    if (!diskStatus.endDate) {
      setDiskStatus((prev) => ({
        ...prev,
        startDate: diskStatus.startDate || new Date()
      }))
    }
  })

  return {
    diskStatus,
    isOpen,
    handleOpen,
    ref,
    handleChange
  }
}
