import { useState, UIEvent } from 'react'

export default function useScroll() {
  const [scrollTop, setScrollTop] = useState(0)
  const [isScrollDown, setIsScrollDown] = useState(false)

  const handleOnScroll = (e: UIEvent<HTMLDivElement>) => {
    setIsScrollDown(e.currentTarget.scrollTop > scrollTop)
    setScrollTop(e.currentTarget.scrollTop)
  }

  return { isScrollDown, handleOnScroll }
}
