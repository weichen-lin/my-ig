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
  const [dragFileType, setDragFileType] = useState(0)

  const handleOndrag = (dragFileType: number, draggedFile: number) => {
    setIsOnDrag(true)
    setDragFileType(dragFileType)

    if (dragFileType === FileType.Folder) {
      setDragObj(draggedFile)
      const getDraggedFolder = folders.map((folder) => {
        if (folder.id === draggedFile) {
          return { ...folder, isBeingDragged: true }
        } else {
          return folder
        }
      })
      setFolders(getDraggedFolder)
    }
  }

  const handleDragEnter = (
    dragHoverdFileType: number,
    dragHoverdFile: number
  ) => {
    if (dragHoverdFileType === FileType.Folder) {
      const beingDraggedFolderMove = folders.map((folder) => {
        if (folder.id === dragHoverdFile && folder.id !== dragObj) {
          return { ...folder, isDragHovered: true }
        } else {
          return { ...folder, isDragHovered: false }
        }
      })
      setFolders(beingDraggedFolderMove)
    }
    setDragEnterObj(dragHoverdFile)
  }

  const handleDragEnd = (dragFileType: number) => {
    let clearDraggedStatus
    if (dragFileType === FileType.Folder) {
      clearDraggedStatus = folders.map((e) => ({
        ...e,
        isBeingDragged: false,
        isDragHovered: false,
      }))
      setFolders(clearDraggedStatus)
    } else {
      clearDraggedStatus = files.map((e) => ({ ...e, isBeingDragged: false }))
    }
    console.log(
      `最後進入的檔案夾是 ${
        folders.filter((e) => e.id === dragEnterObj)[0].name
      }`
    )
    setIsOnDrag(false)
  }

  return {
    isOnDrag,
    folders,
    files,
    handleOndrag,
    handleDragEnter,
    handleDragEnd,
  }
}
