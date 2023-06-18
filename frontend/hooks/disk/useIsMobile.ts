import { useState, useEffect, useCallback } from 'react'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  const onResize = useCallback(() => {
    const checker = window?.innerWidth <= 768
    setIsFullScreen(window?.innerWidth >= 1280)
    setIsMobile(checker)
  }, [])

  useEffect(() => {
    const checker = window?.innerWidth <= 768
    setIsMobile(checker)
    setIsFullScreen(window?.innerWidth >= 1280)

    window?.addEventListener('resize', onResize)

    return () => {
      window?.removeEventListener('resize', onResize)
    }
  }, [])

  return { isMobile, isFullScreen }
}
