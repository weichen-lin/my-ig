import { folderState, fileState } from 'store'
import { useRecoilState } from 'recoil'
import { useDialog } from 'hooks/disk'
import { getFolders, useFetch } from 'api'
import { useResetRecoilState } from 'recoil'
import { SelectedState } from 'store'
import { toast } from 'react-toastify'
import Loading from 'components/utils/loading'
import { Icon } from '@iconify/react'
import { useSingleAndDoubleClick } from 'hooks/utils'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface SelectProps {
  message: string
  selected: { files: string[]; folders: string[] }
}

const BackBoneNumber = 5

const Select = () => {
  const { close } = useDialog()
  const router = useRouter()
  const reset = useResetRecoilState(SelectedState)
  const [folders, setFolders] = useRecoilState(folderState)
  const [files, setFiles] = useRecoilState(fileState)

  const [isSelect, setIsSelect] = useState<string | null>(null)
  const [folderCanMoves, setFolderCanMoves] = useState<{ id: string; name: string }[]>([])
  const { data, error, isLoading, run } = useFetch(getFolders, {
    onSuccess: data => {
      setFolderCanMoves(data)
    },
  })

  useEffect(() => {
    run(0)
  }, [])

  const onClick = () => {
    setIsSelect(prev => (prev === null ? 'test' : null))
  }

  const onDoubleClick = () => {
    console.log('test')
  }

  return (
    <div className='rounded-lg bg-white drop-shadow-lg flex flex-col p-4 gap-y-4 w-full'>
      <p className='text-lg font-semibold'>移動 「 {'測試資料夾'} 」</p>
      <div className='flex gap-x-4 items-center'>
        <span className='text-slate-700 pb-1'>目前位置 :</span>
        <button className='border-[1px] border-slate-500 rounded-md pr-3 pl-2 py-[2px] flex items-center hover:hover:bg-googleDriveGray mb-1'>
          <Icon icon='material-symbols-light:location-on-outline' className='w-4 h-4' />
          <span className='text-slate-700 ml-1 text-sm'>測試資料夾</span>
        </button>
      </div>
      <div className='w-full h-[1px] bg-gray-200'></div>
      <div className='flex flex-col h-[200px] overflow-auto'>
        {isLoading
          ? Array.from(Array(BackBoneNumber).keys()).map(e => <BackBone key={`option-bone-${e}`} />)
          : folderCanMoves.map(e => {
              if (e.id === router.query.f) return null
              return (
                <Option
                  key={`option-${e.id}`}
                  id={e.id}
                  name={e.name}
                  onClick={onClick}
                  onDoubleClick={onDoubleClick}
                />
              )
            })}
      </div>
      <div className='flex justify-end gap-x-2'>
        <button className='px-4 py-1 hover:bg-gray-100 rounded-lg' onClick={close} disabled={false}>
          取消
        </button>
        <button className='px-4 py-1 hover:bg-gray-100 rounded-lg' disabled={false} onClick={() => {}}>
          移動
          {/* {disabled ? <Icon icon='mdi-light:loading' className='animate-spin w-5 h-5 mx-1' /> : submit} */}
        </button>
      </div>
      {/* {error && <Error message={error} />} */}
    </div>
  )
}

interface OptionProps {
  id: string
  name: string
  onClick: () => void
  onDoubleClick: () => void
}

const Option = (props: OptionProps) => {
  const { id, name, onClick, onDoubleClick } = props
  const { handleClick } = useSingleAndDoubleClick(onClick, onDoubleClick)

  return (
    <div className='w-full hover:bg-googleDriveGray flex px-2 py-1 gap-x-4 items-center justify-start cursor-pointer'>
      <Icon icon='material-symbols-light:folder' className='w-5 h-5' />
      <span className='text-slate-700 select-none text'>{name}</span>
    </div>
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

Select.displayName = 'Select'
export default Select
