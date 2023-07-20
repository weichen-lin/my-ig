import { useState, useEffect, useCallback } from 'react'

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

export interface Hint {
  id: string
  message: string
  status: Action
  createAt: Date
}

export type Action = 'success' | 'failed'

const hintsTimeout = new Map<Hint['id'], ReturnType<typeof setTimeout>>()

export default function useHints() {
  const [hints, setHints] = useState<Hint[]>([])

  const clearHint = useCallback((hintId: string) => {
    if (hintsTimeout.has(hintId)) {
      setHints((prev) => prev.filter((e) => e.id !== hintId))
      clearTimeout(hintsTimeout.get(hintId))
    }
  }, [])

  const AddHints = (message: string, status: Action = 'success') => {
    const uuid = generate_uuid()

    const timeOutId = setTimeout(() => {
      clearHint(uuid)
    }, 4500)

    hintsTimeout.set(uuid, timeOutId)

    const newHint = {
      id: uuid,
      message,
      status,
      createAt: new Date(),
    }

    setHints((prev) => [...prev, newHint])
  }

  return { hints, AddHints }
}
