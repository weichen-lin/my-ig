import { folderState, fileState } from 'store'
import { useRecoilState } from 'recoil'
import { ConfirmDialog } from './confirm'
import { useDialog } from 'hooks/disk'
import { deleteFiles, deleteFolders, useFetch } from 'api'
import { useResetRecoilState } from 'recoil'
import { SelectedState } from 'store'
import { toast } from 'react-toastify'

interface DeleteProps {
  message: string
  selected: { files: string[]; folders: string[] }
}

const Delete = (props: DeleteProps) => {
  const { close } = useDialog()
  const { message, selected } = props
  const reset = useResetRecoilState(SelectedState)
  const [folders, setFolders] = useRecoilState(folderState)
  const [files, setFiles] = useRecoilState(fileState)

  const {
    isLoading: fileDeleteLoading,
    error: fileDeleteError,
    run: runDeleteFiles,
  } = useFetch<{ ids: string[] }, string>(deleteFiles, {
    onSuccess: () => {
      const remainFiles = files.filter(file => !selected.files.includes(file.id))
      setFiles(remainFiles)
    },
  })

  const {
    isLoading: folderDeleteLoading,
    error: folderDeleteError,
    run: runDeleteFolders,
  } = useFetch<{ ids: string[] }, string>(deleteFolders, {
    onSuccess: () => {
      const remainFolders = folders.filter(folder => !selected.folders.includes(folder.id))
      setFolders(remainFolders)
    },
  })

  const onClick = () => {
    const toastId = toast.loading(`刪除 ${selected.folders} 個資料夾以及 ${selected.files} 個檔案中`, {
      position: 'bottom-left',
    })
    if (selected.files.length > 0) {
      runDeleteFiles({ ids: selected.files })
    }
    if (selected.folders.length > 0) {
      runDeleteFolders({ ids: selected.folders })
    }
    const isFailed = folderDeleteError || fileDeleteError

    toast.update(toastId, {
      render: !isFailed ? `成功刪除` : `刪除失敗`,
      type: !isFailed ? 'success' : 'error',
      isLoading: false,
      autoClose: 2000,
    })
    reset()
    close()
  }

  return (
    <ConfirmDialog
      submit='確定'
      disabled={fileDeleteLoading || folderDeleteLoading}
      message={message}
      onClick={onClick}
      error={folderDeleteError?.error || fileDeleteError?.error}
      close={close}
    />
  )
}

Delete.displayName = 'Delete'
export default Delete
