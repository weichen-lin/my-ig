import { DragState, fileState, folderState, SelectedState, diskLoadingState } from 'store'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useFetch, moveDisk } from 'api'

interface EndProps {
  stored: string[]
  dragOnEle: string | null
}

export default function useDrag() {
  const setFiles = useSetRecoilState(fileState)
  const setFolders = useSetRecoilState(folderState)
  const { run } = useFetch(moveDisk)
  const [dragState, setDragState] = useRecoilState(DragState)
  const [selected, setSelected] = useRecoilState(SelectedState)
  const setDiskLoading = useSetRecoilState(diskLoadingState)

  const startDrag = () => {
    setDragState(prev => ({ ...prev, isDrag: true }))
  }

  const endDrag = ({ stored, dragOnEle }: EndProps) => {
    if (stored.length === 0 || !dragOnEle) return
    const moveTo = dragOnEle.replace('folder-', '')
    setDiskLoading(true)
    run({ fileIds: selected.files, folderIds: selected.folders, targetId: moveTo })
    setDiskLoading(false)
    setDragState(prev => ({ ...prev, isDrag: false }))
    setFiles(prev => prev.filter(e => !selected.files.includes(e.id)))
    setFolders(prev => prev.filter(e => !selected.folders.includes(e.id)))
    setSelected({ files: [], folders: [] })
  }

  const selectDisk = (s: string[]) => {
    if (s.length === 0) {
      setDragState(prev => ({ ...prev, isDrag: false }))
    }
    const files = s.filter((e: string) => e.startsWith('file-')).map((e: string) => e.replace('file-', ''))
    const folders = s.filter((e: string) => e.startsWith('folder-')).map((e: string) => e.replace('folder-', ''))
    setSelected({ files: [...files], folders: [...folders] })
  }

  const setTargetFolder = (id: string | null) => {
    setDragState(prev => ({ ...prev, targetFolder: id }))
  }

  return { dragState, selectDisk, startDrag, endDrag, setTargetFolder }
}
