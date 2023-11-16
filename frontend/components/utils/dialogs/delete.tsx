import { folderState, fileState } from 'store'
import { useRecoilState } from 'recoil'
import { ConfirmDialog } from './confirm'
import { useDialog } from 'hooks/disk'
import { deleteDisk, useFetch } from 'api'
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

  const { isLoading, error, run } = useFetch<{ fileIds: string[]; folderIds: string[] }, string>(deleteDisk, {
    onSuccess: () => {
      const remainFiles = files.filter(file => !selected.files.includes(file.id))
      const remainFolders = folders.filter(folder => !selected.folders.includes(folder.id))
      setFiles(remainFiles)
      setFolders(remainFolders)
    },
  })

  const onClick = () => {
    const toastId = toast.loading(`刪除 ${selected.folders} 個資料夾以及 ${selected.files} 個檔案中`, {
      position: 'bottom-left',
    })
    run({ fileIds: selected.files, folderIds: selected.folders })
    toast.update(toastId, {
      render: !error ? `成功刪除` : `刪除失敗`,
      type: !error ? 'success' : 'error',
      isLoading: false,
      autoClose: 2000,
    })
    reset()
    close()
  }

  return (
    <ConfirmDialog
      submit='確定'
      disabled={isLoading}
      message={message}
      onClick={onClick}
      error={error?.error}
      close={close}
    />
  )
}

Delete.displayName = 'Delete'
export default Delete
