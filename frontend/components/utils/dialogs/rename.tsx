import { useEffect, useRef } from 'react'
import { folderState, fileState } from 'store'
import { useRecoilState } from 'recoil'
import { BaseDialog } from '.'
import { useDialog } from 'hooks/disk'
import { renamFile, renameFolder, useFetch } from 'api'

interface RenameProps {
  id: string
  name: string
  type: 'file' | 'folder'
}

const Rename = (prop: RenameProps) => {
  const { close } = useDialog()
  const { id, name, type } = prop

  const [folders, setFolders] = useRecoilState(folderState)
  const [files, setFiles] = useRecoilState(fileState)

  const api = type === 'file' ? renamFile : renameFolder

  const { isLoading, error, run } = useFetch<{ id: string; name: string }, { id: string }>(api, {
    onSuccess: res => {
      close()
      if (type === 'file') {
        const index = files?.findIndex(e => e.id === res.id)
        setFiles(prev => [
          ...prev?.slice(0, index),
          { ...prev[index], name: res.name, lastModifiedAt: Date().toLocaleString() },
          ...prev?.slice(index + 1),
        ])
      } else {
        const index = folders?.findIndex(e => e.id === res.id)
        setFolders(prev => [
          ...prev?.slice(0, index),
          { ...prev[index], name: res.name, lastModifiedAt: Date().toLocaleString() },
          ...prev?.slice(index + 1),
        ])
      }
    },
  })

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ref.current?.select()
    ref.current?.focus()
  }, [])

  return (
    <BaseDialog
      title='重新命名'
      submit='確定'
      ref={ref}
      initValue={name ?? ''}
      disabled={isLoading}
      onClick={e => {
        if (e) {
          run({ id, name: e.trim() })
        }
      }}
      error={error?.error}
      close={close}
    />
  )
}

Rename.displayName = 'Rename'
export default Rename
