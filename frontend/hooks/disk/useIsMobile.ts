import { useState, useEffect, useCallback } from 'react'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  const onResize = useCallback(() => {
    const checker = window?.innerWidth <= 768
    setIsMobile(checker)
  }, [])

  useEffect(() => {
    const checker = window?.innerWidth <= 768
    setIsMobile(checker)

    window?.addEventListener('resize', onResize)

    return () => {
      window?.removeEventListener('resize', onResize)
    }
  }, [])

  return isMobile
}