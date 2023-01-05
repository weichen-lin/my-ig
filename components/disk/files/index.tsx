import clsx from 'clsx'
import FileTypeElement from 'components/disk/files/file'
import FolderTypeElement from 'components/disk/files/folder'
import { FormatProp, ListMethod, DiskData } from 'hooks/disk/type'

import { useState, useEffect, createRef } from 'react'
import Selectable from 'dist/esm/index'

interface FilesPageProp extends FormatProp {
  files: DiskData[]
  folders: DiskData[]
}

export default function Files(props: FilesPageProp) {
  const { listMethod, files, folders } = props
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [dragged, setDragged] = useState<Set<string>>(new Set())

  const root = createRef<HTMLDivElement>()
  interface SelectionEvent {
    stored: string[]
    canSelected: Element[]
    changed: {
      added: string[]
      removed: string[]
    }
  }

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
    return e
  }

  const handleRevert = (e: Element) => {
    return e
  }

  useEffect(() => {
    console.log('trigger effect')

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
            height: 80
          }
        },
        revert: {
          func: handleRevert,
          css: {
            width: 108,
            margin: 30,
            opacity: '100%',
            willChange: 'top left width height'
          }
        },
        iconPositionX: 200
      }
    })
    return () => selection.destroy()
  }, [])

  return (
    <div
      className={clsx(
        'w-full flex justify-start mt-3 select-none',
        `${
          listMethod === ListMethod.Lattice
            ? 'flex-wrap mx-auto gap-x-6 gap-y-4'
            : 'flex-col'
        }`
      )}
      ref={root}
    >
      <p
        className={clsx(
          'w-full p-5 text-gray-400',
          `${listMethod === ListMethod.Lattice ? '' : 'hidden'}`
        )}
      >
        資料夾
      </p>
      {folders.map((e) => (
        <FolderTypeElement
          id={e.id}
          listMethod={listMethod}
          folderName={e.name}
          key={`folder_index_${e.id}`}
          selected={selected.has(`selectable-${e.id}`)}
        />
      ))}
      <p
        className={clsx(
          'w-full p-5 text-gray-400',
          `${listMethod === ListMethod.Lattice ? '' : 'hidden'}`
        )}
      >
        檔案
      </p>
      {files.map((e) => (
        <FileTypeElement
          id={e.id}
          listMethod={listMethod}
          fileName={e.name}
          imgUrl={e.url}
          key={`file_index_${e.id}`}
          selected={selected.has(`selectable-${e.id}`)}
        />
      ))}
    </div>
  )
}
