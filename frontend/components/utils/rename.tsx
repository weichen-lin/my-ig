import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { folderState } from 'store'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { BaseDialog } from './dialogs'
import { useDialog } from 'hooks/disk'

interface RenameProps {
  name?: string
}

const Rename = (prop: RenameProps) => {
  const { close } = useDialog()
  const { name } = prop
  const setFolders = useSetRecoilState(folderState)
  const router = useRouter()

  //   const { isLoading, error, run } = useFetch<RenameProps, CreateFolderResponse>(createFolder, {
  //     onSuccess: res => {
  //       close()
  //       res && setFolders(prev => [...prev, { id: res.id, name: res.name, lastModifiedAt: Date().toLocaleString() }])
  //     },
  //   })

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
      disabled={false}
      onClick={e => {}}
      error={undefined}
      close={close}
    />
  )
}

Rename.displayName = 'Rename'
export default Rename
