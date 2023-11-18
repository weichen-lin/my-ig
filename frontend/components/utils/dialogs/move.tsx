import clsx from 'clsx'
import { folderState, fileState } from 'store'
import { useRecoilState } from 'recoil'
import { useDialog } from 'hooks/disk'
import { getFolders, getCurrentFolder, moveDisk, useFetch } from 'api'
import { useResetRecoilState } from 'recoil'
import { SelectedState } from 'store'
import { toast } from 'react-toastify'
import { Icon } from '@iconify/react'
import { useSingleAndDoubleClick } from 'hooks/utils'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

interface MoveProps {
  selected: { files: string[]; folders: string[] }
}

const BackBoneNumber = 5

const Move = (props: MoveProps) => {
  const { selected } = props
  const { close } = useDialog()
  const router = useRouter()

  const currentFolderId = router.query.f as string | undefined

  const reset = useResetRecoilState(SelectedState)
  const [folders, setFolders] = useRecoilState(folderState)
  const [files, setFiles] = useRecoilState(fileState)

  const [currentFolder, setCurrentFolder] = useState<{ id: string; name: string } | null>(
    !currentFolderId ? { id: 'root', name: '根目錄' } : null,
  )

  const [isSelect, setIsSelect] = useState<string | null>(null)
  const [folderCanMoves, setFolderCanMoves] = useState<{ id: string; name: string }[]>([])

  const { isLoading, run } = useFetch(getFolders, {
    onSuccess: data => {
      setFolderCanMoves(data)
    },
  })

  const { run: runGetCurrentFolder } = useFetch(getCurrentFolder, {
    onSuccess: data => {
      setCurrentFolder(data)
    },
  })

  const { run: runMove, isLoading: moveLoading } = useFetch(moveDisk, {
    onSuccess: data => {
      if (data) {
        toast.success('移動成功', { position: 'bottom-left' })
        reset()
        const remainFiles = files.filter(file => !selected.files.includes(file.id))
        const remainFolders = folders.filter(folder => !selected.folders.includes(folder.id))
        setFiles(remainFiles)
        setFolders(remainFolders)
        close()
      }
    },
    onError: () => {
      toast.error('移動失敗', { position: 'bottom-left' })
    },
  })

  const onDoubleClick = () => {
    console.log('test')
  }

  const getName = () => {
    return selected.files.length === 1
      ? files.find(e => e.id === selected.files[0])?.name
      : folders.find(e => e.id === selected.folders[0])?.name
  }

  const selectedCount = selected.files.length + selected.folders.length
  const message = selectedCount === 1 ? `移動 「 ${getName()} 」` : `移動 ${selectedCount} 個項目`
  const canMoveFolders = folderCanMoves.filter(e => e.id !== router.query.f && !selected.folders.includes(e.id))
  if (currentFolder?.name !== '根目錄') {
    canMoveFolders.push({ id: 'root', name: '根目錄' })
  }

  useEffect(() => {
    if (currentFolderId) {
      runGetCurrentFolder(currentFolderId)
    }
  }, [currentFolderId])

  useEffect(() => {
    run(0)
  }, [])

  return (
    <div className='rounded-lg bg-white drop-shadow-lg flex flex-col p-4 gap-y-4 w-full'>
      <p className='text-lg font-semibold'>{message}</p>
      <div className='flex gap-x-4 items-center'>
        <span className='text-slate-700 pb-1'>目前位置 :</span>
        {currentFolder ? (
          <button className='border-[1px] border-slate-500 rounded-md pr-3 pl-2 py-[2px] flex items-center hover:hover:bg-googleDriveGray mb-1'>
            <Icon icon='material-symbols-light:location-on-outline' className='w-4 h-4' />
            <span className='text-slate-700 ml-1 text-sm pb-[1.5px]'>{currentFolder.name}</span>
          </button>
        ) : (
          <div className='w-[120px] bg-googleDriveGray rounded-xl h-4 animate-pulse'></div>
        )}
      </div>
      <div className='w-full h-[1px] bg-gray-200'></div>
      <div className='flex flex-col h-[200px] overflow-auto'>
        {isLoading ? (
          Array.from(Array(BackBoneNumber).keys()).map(e => <BackBone key={`option-bone-${e}`} />)
        ) : canMoveFolders.length === 0 ? (
          <div className='flex flex-col w-full h-full items-center justify-center gap-y-1'>
            <Image width={150} height={150} alt='nofolder' src='/static/noFolder.jpg' className='mx-auto' />
            <span className='text-sm font-semibold text-slate-500/60'>目前暫無可移動之資料夾</span>
          </div>
        ) : (
          canMoveFolders
            ?.sort(e => (e.name === '根目錄' ? -1 : 1))
            .map(e => (
              <Option
                key={`option-${e.id}`}
                id={e.id}
                name={e.name}
                isSelect={isSelect}
                onClick={() => {
                  setIsSelect(e.id)
                }}
                onDoubleClick={onDoubleClick}
              />
            ))
        )}
      </div>
      <div className='flex justify-end gap-x-2'>
        <button className='px-4 py-1 hover:bg-gray-100 rounded-lg' onClick={close} disabled={false}>
          取消
        </button>
        <button
          className='px-4 py-1 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white'
          disabled={!isSelect || moveLoading}
          onClick={() => {
            if (!isSelect) return
            runMove({ fileIds: selected.files, folderIds: selected.folders, targetId: isSelect })
          }}
        >
          {moveLoading ? <Icon icon='mdi-light:loading' className='animate-spin w-5 h-5 mx-1' /> : '移動'}
        </button>
      </div>
    </div>
  )
}

interface OptionProps {
  id: string
  name: string
  isSelect: string | null
  onClick: (e: string) => void
  onDoubleClick: () => void
}

const Option = (props: OptionProps) => {
  const { id, name, isSelect, onClick, onDoubleClick } = props
  const { handleClick } = useSingleAndDoubleClick(onClick, onDoubleClick)

  return (
    <button
      className={clsx(
        'w-full flex px-2 py-1 gap-x-4 items-center justify-start cursor-pointer',
        `${isSelect === id ? 'bg-blue-300/40' : 'hover:bg-googleDriveGray '}`,
      )}
      onClick={() => {
        handleClick()
      }}
    >
      <Icon icon='material-symbols-light:folder' className={clsx('w-5 h-5', `${isSelect === id && 'text-blue-700'}`)} />
      <span className={clsx('text-slate-700 select-none text')}>{name}</span>
    </button>
  )
}

const BackBone = () => {
  return (
    <div className='w-full flex px-2 py-1 gap-x-4 items-center justify-start cursor-pointer my-1'>
      <div className='w-4 h-4 rounded-sm animate-pulse bg-googleDriveGray'></div>
      <span className='rounded-xl w-[180px] h-4 animate-pulse bg-googleDriveGray'></span>
    </div>
  )
}

Move.displayName = 'Select'
export default Move
