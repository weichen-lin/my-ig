import { useState, useEffect, useCallback } from 'react'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true)

  const onResize = useCallback(() => {
    const checker = window?.innerWidth <= 768
    setIsMobile(checker)
  }, [])

  useEffect(() => {
    window?.addEventListener('resize', onResize)

    return () => {
      window?.removeEventListener('resize', onResize)
    }
  }, [])

  return isMobile
}
