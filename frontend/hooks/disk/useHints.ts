import { useState, useEffect } from 'react'

function generate_uuid() {
  var d = Date.now()
  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
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

type Action = 'success' | 'failed'

const hintsTimeout = new Map<Hint['id'], ReturnType<typeof setTimeout>>()

let rememberHints: Hint[] = []

export default function useHints() {
  const [hints, setHints] = useState<Hint[]>([])

  const AddHints = (message: string, status: Action = 'success') => {
    console.log(hints)
    const uuid = generate_uuid()

    const newHint = {
      id: uuid,
      message,
      status,
      createAt: new Date(),
    }

    rememberHints = [...hints, newHint]

    setHints((prev) => [...prev, newHint])

    const timeOutId = setTimeout(() => {
      const index = rememberHints.findIndex((e) => e.id === uuid)
      if (index > -1) {
        setHints(rememberHints.filter((e) => e.id !== uuid))
        clearTimeout(timeOutId)
      }
    }, 4500)
  }

  return { hints, AddHints }
}
