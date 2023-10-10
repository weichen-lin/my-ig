import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { HintState } from 'store'
import { Action, Hint } from 'store'

function generate_uuid() {
  var d = Date.now()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now() //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

const hintsMap = new Map<Hint['id'], ReturnType<typeof setTimeout>>()

export default function useHints() {
  const setHints = useSetRecoilState(HintState)

  const clearHint = useCallback((hintId: string) => {
    if (hintsMap.has(hintId)) {
      setHints((prev) => prev.filter((e) => e.id !== hintId))
      clearTimeout(hintsMap.get(hintId))
    }
  }, [])

  const AddHints = (message: string, status: Action, isPromise: boolean): string => {
    const uuid = generate_uuid()

    const timeOutId = setTimeout(() => {
      if (!isPromise) {
        clearHint(uuid)
      }
    }, 4500)

    hintsMap.set(uuid, timeOutId)

    const newHint = {
      id: uuid,
      message,
      status,
      isPromised: true,
      createAt: new Date(),
    }

    setHints((prev) => [...prev, newHint])

    return uuid
  }

  return { AddHints }
}
