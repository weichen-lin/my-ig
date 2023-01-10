import { useState, useEffect, createRef } from 'react'
import Selectable from '@weichen-lin/gdrive-select-and-drag'

interface SelectionEvent {
  stored: string[]
  canSelected: Element[]
  changed: {
    added: string[]
    removed: string[]
  }
}

export default function useGdrive() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [dragged, setDragged] = useState<Set<string>>(new Set())

  const root = createRef<HTMLDivElement>()

  const handleSelected = ({
    stored,
    changed: { added, removed }
  }: SelectionEvent) => {
    const newSelected = new Set<string>(stored)
    added.forEach((e) => newSelected.add(e))
    removed.forEach((e) => newSelected.delete(e))

    setSelected(newSelected)
  }

  const handleDragged = ({
    stored,
    changed: { added, removed }
  }: SelectionEvent) => {
    const newSelected = new Set<string>(stored)
    added.forEach((e) => newSelected.add(e))
    removed.forEach((e) => newSelected.delete(e))

    setDragged(newSelected)
  }

  const handleTransform = (e: Element) => {
    let target = e as HTMLElement
    target.style.backgroundColor = 'white'
    target.style.border = '1px solid gray'
    if (e.querySelector('img')) {
      const image = target.querySelector('img')
      if (!image) return e
      if (image.parentElement) {
        image.parentElement.style.display = 'none'
        return target
      }
    }
    return e
  }

  const handleRevert = (e: Element) => {
    let target = e as HTMLElement
    if (e.querySelector('img')) {
      const image = target.querySelector('img')
      if (!image) return target
      if (image.parentElement) {
        image.parentElement.style.display = 'block'
        target.style.height = '220px'
        return target
      }
    }
    return e
  }

  useEffect(() => {
    const selection = new Selectable({
      boundary: root?.current as HTMLDivElement,
      selectAreaClassName: 'selection-area',
      selectablePrefix: 'selectable',
      select_cb: handleSelected,
      drag_cb: handleDragged,
      transformFunc: {
        transform: {
          func: handleTransform,
          css: {
            width: 200,
            margin: 0,
            height: 48,
            textAlign: 'left'
          }
        },
        revert: {
          func: handleRevert,
          css: {
            width: 220,
            margin: 0,
            opacity: '100%',
            willChange: 'top left width height'
          }
        },
        iconPositionX: 200
      }
    })
    return () => selection.destroy()
  }, [])

  return { root, selected, dragged }
}
