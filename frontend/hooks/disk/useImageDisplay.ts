import { useState } from 'react'

export default function useImageDisplay() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const handleEscape = () => {
    setIsOpen(false)
  }

  const handleImageDisplay = (index: number) => {
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
