import { useRecoilValue, useResetRecoilState } from 'recoil'
import { SelectedState } from 'store'
import { Icon } from '@iconify/react'
import { useDialog } from 'hooks/disk'
import { Delete } from 'components/utils'

export default function SelectRegion() {
  const selected = useRecoilValue(SelectedState)
  const reset = useResetRecoilState(SelectedState)
  const { open } = useDialog()

  const selectedCount = selected.folders.length + selected.files.length

  const openDelete = () => {
    if (selectedCount === 0) return
    const message = `確定要刪除 ${selectedCount} 個項目嗎？`

    open(<Delete message={message} selected={selected} />)
  }

  return (
    <div className='bg-blue-100/40 w-full px-2 py-[6px] rounded-lg flex gap-x-2 items-center animate-[fadeIn_0.2s_ease-in-out_forwards]'>
      <Icon
        icon='iconoir:cancel'
        className='w-7 h-7 p-1 cursor-pointer hover:bg-slate-300 rounded-full'
        onClick={() => {
          reset()
        }}
      />
      <span className='text-sm pb-[3px] mr-12'>已選取 {selectedCount} 個</span>
      <Icon
        icon='material-symbols-light:drive-file-move-outline-rounded'
        className='w-7 h-7 p-1 cursor-pointer hover:bg-slate-300 rounded-full'
      />
      <Icon
        icon='iconamoon:trash-thin'
        className='w-7 h-7 p-1 cursor-pointer hover:bg-slate-300 rounded-full'
        onClick={() => openDelete()}
      />
    </div>
  )
}
