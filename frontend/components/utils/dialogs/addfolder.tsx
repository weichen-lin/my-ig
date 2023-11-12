import { useEffect, useRef } from 'react'
import { createFolder, useFetch } from 'api'
import { useRouter } from 'next/router'
import { folderState } from 'store'
import { useSetRecoilState } from 'recoil'
import { BaseDialog } from './base'
import { useDialog } from 'hooks/disk'

interface CreateFolderProps {
  name: string
  locateAt: string | null
}

interface CreateFolderResponse {
  id: string
  name: string
  last_modified_at: string
}

const AddFolder = () => {
  const { close } = useDialog()
  const setFolders = useSetRecoilState(folderState)
  const router = useRouter()

  const { isLoading, error, run } = useFetch<CreateFolderProps, CreateFolderResponse>(createFolder, {
    onSuccess: res => {
      close()
      res && setFolders(prev => [...prev, { id: res.id, name: res.name, lastModifiedAt: Date().toLocaleString() }])
    },
  })

  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    ref.current?.select()
    ref.current?.focus()
  }, [])

  return (
    <BaseDialog
      title='新增資料夾'
      submit='新增'
      ref={ref}
      initValue={'未命名資料夾'}
      disabled={isLoading}
      onClick={e => {
        if (e) {
          const locate_at = (router.query.f as string) ?? null
          run({ name: e.trim(), locateAt: locate_at })
        }
      }}
      error={error?.error}
      close={close}
    />
  )
}

AddFolder.displayName = 'AddFolder'
export default AddFolder
