import { useState, useEffect, createRef } from 'react'
// import Selectable from '@weichen-lin/gdrive-select-and-drag'
// import Selectable from 'selection'

import { useRecoilValue, useRecoilState } from 'recoil'
import { diskStatusInitState, diskInitState } from 'context'

// import { APIS } from 'api/apis'
import fetcher from 'api/fetcher'

interface SelectionEvent {
  stored: string[]
  canSelected: Element[]
  changed: {
    added: string[]
    removed: string[]
  }
}

declare global {
  interface Window {
    folderOnHover?: Map<string, string>
    draggedElement?: Map<string, Set<string>>
  }
}

export interface GdriveSelectTarget {
  folders: Set<string>
  files: Set<string>
}

export type HoverHandler = Pick<ReturnType<typeof useGdrive>, 'hoverHandler'>

export default function useGdrive() {
  const [diskStatus, setDiskStatus] = useRecoilState(diskStatusInitState)
  const [diskData, setDiskData] = useRecoilState(diskInitState)
  const [selected, setSelected] = useState<GdriveSelectTarget>({
    folders: new Set(),
    files: new Set(),
  })
  const [dragged, setDragged] = useState<GdriveSelectTarget>({
    folders: new Set(),
    files: new Set(),
  })
  const [isMoving, setIsMoving] = useState(false)

  const root = createRef<HTMLDivElement>()

  const handleSelected = ({ stored, changed: { added, removed } }: SelectionEvent) => {
    const stored_files = stored.filter((e) => e.includes('file'))
    const stored_folders = stored.filter((e) => e.includes('folder'))

    const new_files = new Set<string>(stored_files)
    const new_folders = new Set<string>(stored_folders)

    window.draggedElement?.set('files', new_files)
    window.draggedElement?.set('folders', new_folders)

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

  const handleDragged = ({ stored, changed: { added, removed } }: SelectionEvent) => {
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
    console.log('revert happen')

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

  const handleFolderOnHover = (e: string) => {
    const dragChecker = dragged.files.size > 0 || dragged.folders.size > 0
    if (!dragChecker) return
    window.folderOnHover?.set('current_folder', e)
  }

  const hoverHandler = {
    handleFolderOnHover,
    isMoving,
  }

  const handleMoving = (type: 'file' | 'folder', update_locate_at: string, obj_need_update_w_prefix: string) => {
    window.folderOnHover?.set('current_folder', '')

    const need_update = obj_need_update_w_prefix.replace(`selectable-${type}-`, '')
    const api = type === 'file' ? "/file/move" : "/folder/move"

    return fetcher
      .patch(api, { update_locate_at, need_update })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // useEffect(() => {
  //   window.folderOnHover = new Map()
  //   window.draggedElement = new Map()

  //   const selection = new Selectable({
  //     boundary: root?.current as HTMLDivElement,
  //     canStartSelect: diskStatus.canSelect,
  //     selectAreaClassName: 'selection-area',
  //     selectablePrefix: 'selectable',
  //     select_cb: handleSelected,
  //     drag_cb: handleDragged,
  //     transformFunc: {
  //       transform: {
  //         func: handleTransform,
  //         css: {
  //           width: 200,
  //           margin: 0,
  //           height: 48,
  //           textAlign: 'left',
  //         },
  //       },
  //       revert: {
  //         func: handleRevert,
  //         css: {
  //           width: 220,
  //           margin: 0,
  //           opacity: '100%',
  //           willChange: 'top left width height',
  //         },
  //       },
  //       iconPositionX: 200,
  //     },
  //     dragEndCallback: async () => {
  //       const isDragEndOnFolder = window.folderOnHover?.get('current_folder') ?? ''

  //       if (!isDragEndOnFolder) return false

  //       setDiskStatus((prev) => ({ ...prev, shouldRefresh: true }))
  //       setIsMoving(true)

  //       const FILE_MOVING = Array.from(window.draggedElement?.get('files') ?? []).map((e) =>
  //         handleMoving('file', isDragEndOnFolder, e)
  //       )

  //       const FOLDER_MOVING = Array.from(window.draggedElement?.get('folders') ?? []).map((e) =>
  //         handleMoving('folder', isDragEndOnFolder, e)
  //       )

  //       await Promise.all([...FILE_MOVING, ...FOLDER_MOVING])

  //       setIsMoving(false)

  //       return false
  //     },
  //   })

  //   return () => selection?.destroy()
  // }, [diskStatus.canSelect])

  return { root, selected, dragged, hoverHandler }
}
