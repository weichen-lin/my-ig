import { useRef, useCallback } from 'react'

const DELAY = 250

const debounce = (callback: (...arg: any) => any, delay: number) => {
  let debounceTimer: ReturnType<typeof setTimeout>
  return (...arg: any) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => callback(...arg), delay)
  }
}

export default function useSingleAndDoubleClick(onClick, onDoubleClick) {
  const clicks = useRef(0)

  const callFunction = useCallback(
    debounce(() => {
      clicks.current === 3 ? onDoubleClick() : onClick()
      clicks.current = 0
    }, DELAY),
    []
  )

  const handleClick = () => {
    clicks.current++
    callFunction()
  }

  const handleDoubleClick = () => {
    clicks.current++
  }

  return { handleClick, handleDoubleClick }
}
