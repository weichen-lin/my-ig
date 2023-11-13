import { useRef, useCallback } from 'react'

const DELAY = 200

export const debounce = (callback: (...arg: any) => any, delay: number) => {
  let debounceTimer: ReturnType<typeof setTimeout>
  return (...arg: any) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => callback(...arg), delay)
  }
}

type anyfunc = (...args: any[]) => any

export default function useSingleAndDoubleClick(onClick: anyfunc, onDoubleClick: anyfunc) {
  const clicks = useRef(0)

  const callFunction = useCallback(
    debounce(() => {
      clicks.current === 1 ? onClick() : onDoubleClick()
      clicks.current = 0
    }, DELAY),
    [onClick, onDoubleClick],
  )

  const handleClick = () => {
    clicks.current++
    callFunction()
  }

  return { handleClick }
}
