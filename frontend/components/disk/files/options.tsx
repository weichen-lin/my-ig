import clsx from 'clsx'
import { Icon } from '@iconify/react'
import { useClickOutside } from 'hooks/utils'
import { useRef } from 'react'
import { useContextMenu } from 'hooks/disk'
import { useRecoilValue } from 'recoil'
import { SelectedState, fileState, folderState } from 'store'
import { Rename } from 'components/utils'
import { useDialog } from 'hooks/disk'

interface OptionProps {
  icon: string
  text: string
  disabled: boolean
  onClick: () => void
  close: () => void
}

const Option = (props: OptionProps) => {
  const { icon, text, disabled, onClick, close } = props
  return (
    <button
      className={clsx(
        'flex items-center gap-x-4 w-full hover:bg-slate-300/40 cursor-pointer py-1 px-2',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent',
      )}
      onClick={() => {
        if (disabled) return
        onClick()
        close()
      }}
      disabled={disabled}
    >
      <Icon icon={icon} className='w-6 h-6' />
      <span className='text-sm'>{text}</span>
    </button>
  )
}

export function Options() {
  const selected = useRecoilValue(SelectedState)
  const { open } = useDialog()
  const { menu, close } = useContextMenu()
  const { x, y } = menu
  const ref = useRef<HTMLDivElement>(null)

  const files = useRecoilValue(fileState)
  const folders = useRecoilValue(folderState)

  useClickOutside(ref, close)

  const bottomReached = y > window.innerHeight - 175

  const selectCount = selected.files.length + selected.folders.length

  const openRename = () => {
    if (selectCount !== 1) return
    const current =
      selected.files.length > 0
        ? files?.find(e => e.id === selected.files[0])
        : folders?.find(e => e.id === selected.folders[0])

    open(<Rename name={current?.name} />)
  }

  return (
    <div
      className={clsx(
        'absolute w-[200px] h-[150px]',
        'rounded-sm border-[1px] border-slate-300/30 shadow-md',
        'py-2 bg-white z-50 flex flex-col justify-between',
        bottomReached ? 'origin-bottom' : 'origin-top',
      )}
      style={{
        animation: 'dropdownmenu 0.2s ease-in-out',
        top: `${bottomReached ? y - 150 : y}px`,
        left: `${x}px`,
      }}
      ref={ref}
    >
      <Option icon='material-symbols-light:download' text='下載' onClick={() => {}} close={close} disabled={false} />
      <Option
        icon='material-symbols-light:drive-file-move-outline-rounded'
        text='移動至'
        onClick={openRename}
        close={close}
        disabled={false}
      />
      <Option
        icon='material-symbols-light:edit'
        text='重新命名'
        onClick={openRename}
        close={close}
        disabled={selectCount !== 1}
      />
      <Option icon='iconamoon:trash-thin' text='刪除' onClick={() => {}} close={close} disabled={false} />
    </div>
  )
}