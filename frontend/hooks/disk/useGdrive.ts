import { useState, useEffect, createRef } from 'react'
import Selectable from '@weichen-lin/gdrive-select-and-drag'

import { useRecoilValue } from 'recoil'
import { diskStatusInitState } from 'context'
interface SelectionEvent {
  stored: string[]
  canSelected: Element[]
  changed: {
    added: string[]
    removed: string[]
  }
}

export interface GdriveSelectTarget {
  folders: Set<string>
  files: Set<string>
}

export default function useGdrive() {
  const diskStatus = useRecoilValue(diskStatusInitState)

  const [selected, setSelected] = useState<GdriveSelectTarget>({
    folders: new Set(),
    files: new Set()
  })
  const [dragged, setDragged] = useState<GdriveSelectTarget>({
    folders: new Set(),
    files: new Set()
  })

  const root = createRef<HTMLDivElement>()

  const handleSelected = ({
    stored,
    changed: { added, removed }
  }: SelectionEvent) => {
    const stored_files = stored.filter((e) => e.includes('file'))
    const stored_folders = stored.filter((e) => e.includes('folder'))

    const new_files = new Set<string>(stored_files)
    const new_folders = new Set<string>(stored_folders)

    added.forEach((e) => {
      if (e.includes('file')) {
        new_files.add(e)
      } else if (e.includes('folder')) {
        new_folders.add(e)
      }
    })

    removed.forEach((e) => {
      if (e.includes('file')) {
        new_files.delete(e)
      } else if (e.includes('folder')) {
        new_folders.delete(e)
      }
    })

    setSelected({ folders: new_folders, files: new_files })
  }

  const handleDragged = ({
    stored,
    changed: { added, removed }
  }: SelectionEvent) => {
    const stored_files = stored.filter((e) => e.includes('file'))
    const stored_folders = stored.filter((e) => e.includes('folder'))

    const new_files = new Set<string>(stored_files)
    const new_folders = new Set<string>(stored_folders)

    added.forEach((e) => {
      if (e.includes('file')) {
        new_files.add(e)
      } else if (e.includes('folder')) {
        new_folders.add(e)
      }
    })

    removed.forEach((e) => {
      if (e.includes('file')) {
        new_files.delete(e)
      } else if (e.includes('folder')) {
        new_folders.delete(e)
      }
    })
    setDragged({ folders: new_folders, files: new_files })
  }

  const handleTransform = (e: Element) => {
    let target = e as HTMLElement

    target.style.backgroundColor = 'white'
    target.style.border = '1px solid gray'
    if (e.querySelector('img') || e.classList.contains('LIST')) {
      const image = target.querySelector('img')
      const DATE = target.querySelector('.DATE') as HTMLElement
      if (image?.parentElement) {
        image.parentElement.style.display = 'none'
      }
      if (DATE) {
        DATE.style.display = 'none'
      }
    }
    return target
  }

  const handleRevert = (e: Element) => {
    let target = e as HTMLElement

    if (target.querySelector('img')) {
      const image = target.querySelector('img')
      const ListChecker = e.querySelector('.LIST')

      if (!image) return target
      if (image.parentElement) {
        image.parentElement.style.display = 'block'
        target.style.height = ListChecker ? '48px' : '220px'
        return target
      }
    }
    return target
  }

  useEffect(() => {
    const selection = new Selectable({
      boundary: root?.current as HTMLDivElement,
      canStartSelect: diskStatus.canSelect,
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

    return () => selection?.destroy()
  }, [diskStatus.canSelect])

  return { root, selected, dragged }
}
