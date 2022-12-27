import { useState } from 'react'
import { FileType, DiskData } from 'hooks/disk/type'

const checkIdAtInterval = (id: number, min: number, max: number) => {
  return id >= min && id <= max
}

export default function useDrag(data: DiskData[]) {
  const [folders, setFolders] = useState(
    data.filter((e) => e.type === FileType.Folder)
  )
  const [files, setFiles] = useState(
    data.filter((e) => e.type === FileType.File)
  )

  const [dragObj, setDragObj] = useState(0)
  const [dragEnterObj, setDragEnterObj] = useState(0)
  const [isOnDrag, setIsOnDrag] = useState(false)
  const [dragType, setDragType] = useState(0)

  const handleOndrag = (e: number) => {
    setIsOnDrag(true)
    setDragType(0)

    if (dragType === FileType.Folder) {
      const newFolders = folders.map( folder => {
        if(folder.id !== e)
      })
    }
  }

  const handleDragEnter = () => {}

  const handleDragEnd = () => {}

  return {
    isOnDrag,
    folders,
    files,
    handleOndrag,
    handleDragEnter,
    handleDragEnd
  }
}
