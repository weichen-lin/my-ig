import { useState } from 'react'

export default function useOperator() {
  const [creatFolderOpen, setCreateFolderOpen] = useState(false)
  const [operatorOpen, setOperatorOpen] = useState(false)

  const toogleCreateFolder = () => {
    setCreateFolderOpen((prev) => !prev)
  }
  const toogleOperatorOpen = () => {
    setOperatorOpen((prev) => !prev)
  }

  return {
    creatFolderOpen,
    operatorOpen,
    toogleCreateFolder,
    toogleOperatorOpen,
  }
}
