import { DragState, SelectedState, diskLoadingState } from 'store'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useFetch, moveDisk } from 'api'
import { useState } from 'react'

export default function useDrag() {
  const setDiskLoading = useSetRecoilState(diskLoadingState)
  const { run } = useFetch(moveDisk)
  const [isDrag, setIsDrag] = useState(false)
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)

  const startDrag = () => {
    setIsDrag(true)
  }

  const endDrag = (currentFolder: string | null) => {
    console.log({ currentFolder })
    setIsDrag(false)
  }

  return { isDrag, startDrag, endDrag, currentFolder, setCurrentFolder }
}
