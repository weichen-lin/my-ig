import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { diskInitState } from 'context'

export default function useImageDisplay() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const diskData = useRecoilValue(diskInitState)

  const handleEscape = () => {
    setIsOpen(false)
  }

  const handleImageDisplay = (id: string) => {
    const index = diskData.files.map((e) => e.id).indexOf(id)
    if (index < 0) return
    setCurrentIndex(index)
    setIsOpen(true)
  }

  return {
    isOpen,
    currentIndex,
    handleEscape,
    handleImageDisplay,
    setCurrentIndex
  }
}
