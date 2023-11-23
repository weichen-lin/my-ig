import { DragState, fileState, folderState } from 'store'
import { useRecoilState } from 'recoil'
import { useFetch, moveDisk } from 'api'
import { DragStatus } from 'selection'

interface EndProps {
  stored: string[]
  dragOnEle: string | null
}

export default function useDrag() {
  const [files, setFiles] = useRecoilState(fileState)
  const [folders, setFolders] = useRecoilState(folderState)
  const { run } = useFetch(moveDisk)
  const [dragState, setDragState] = useRecoilState(DragState)

  const startDrag = () => {
    setDragState(prev => ({ ...prev, isDrag: true }))
  }

  const endDrag = ({ stored, dragOnEle }: EndProps) => {
    const draggedFiles = stored?.filter((e: string) => e.startsWith('file-')).map((e: string) => e.replace('file-', ''))
    const draggedFolders = stored
      ?.filter((e: string) => e.startsWith('folder-'))
      .map((e: string) => e.replace('folder-', ''))
    if (dragOnEle && dragOnEle.startsWith('folder-')) {
      run({ fileIds: draggedFiles, folderIds: draggedFolders, targetId: dragOnEle.replace('folder-', '') })
      const remainFiles = files.filter(file => !draggedFiles.includes(file.id))
      const remainFolders = folders.filter(folder => !draggedFolders.includes(folder.id))
      setFiles(remainFiles)
      setFolders(remainFolders)
    }
    setDragState(prev => ({ ...prev, isDrag: false }))
  }

  const selectCallback = (s: string[]) => {
    // const files = s.stored.filter((e: string) => e.startsWith('file-')).map((e: string) => e.replace('file-', ''))
    // const folders = s.stored.filter((e: string) => e.startsWith('folder-')).map((e: string) => e.replace('folder-', ''))
    // setSelected({ files: [...files], folders: [...folders] })
  }

  const setTargetFolder = (id: string | null) => {
    setDragState(prev => ({ ...prev, targetFolder: id }))
  }

  return { dragState, startDrag, endDrag, setTargetFolder }
}
