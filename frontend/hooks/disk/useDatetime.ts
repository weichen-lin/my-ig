import { useState, useRef } from 'react'
import useClickOutside from 'hooks/utils/useClickOutside'

export default function useDatetime() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates

    setStartDate(start || new Date())
    if (endDate && startDate.getTime() <= endDate?.getTime()) {
      setEndDate(null)
    }
    if (end) {
      setEndDate(end)
      setIsOpen(false)
    }
  }

  useClickOutside(ref, () => {
    setIsOpen(false)

    if (!endDate) {
      setEndDate(startDate)
    }
  })

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isOpen,
    setIsOpen,
    ref,
    handleChange
  }
}
