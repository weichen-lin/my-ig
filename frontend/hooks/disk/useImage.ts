import { useState } from 'react'

export default function useImage() {
  const [currentIndex, setCurrentIndex] = useState(4)
  const [isOpen, setIsOpen] = useState(true)

  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return { currentIndex, setCurrentIndex, isOpen, handleOpen }
}
