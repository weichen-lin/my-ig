import clsx from 'clsx'
import { Icon } from '@iconify/react'
import { useClickOutside } from 'hooks/utils'
import { useRef } from 'react'
import { useContextMenu } from 'hooks/disk'

interface OptionProps {
  icon: string
  text: string
}

const Option = (props: OptionProps) => {
  const { icon, text } = props
  return (
    <div className='flex items-center gap-x-4 w-full hover:bg-slate-300/40 cursor-pointer py-1 px-2'>
      <Icon icon={icon} className='w-6 h-6' />
      <span className='text-sm'>{text}</span>
    </div>
  )
}

export function Options() {
  const { menu, close } = useContextMenu()
  const { x, y } = menu
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(ref, close)

  return (
    <div
      className={clsx(
        'absolute w-[200px] h-[150px]',
        'rounded-sm border-[1px] border-slate-300/30 shadow-md',
        'py-2 bg-white z-50 flex flex-col justify-between origin-top',
      )}
      style={{
        animation: 'dropdownmenu 0.2s ease-in-out',
        top: `${y}px`,
        left: `${x}px`,
      }}
      ref={ref}
    >
      <Option icon='material-symbols-light:download' text='下載' />
      <Option icon='material-symbols-light:drive-file-move-outline-rounded' text='移動至' />
      <Option icon='material-symbols-light:edit' text='重新命名' />
      <Option icon='iconamoon:trash-thin' text='刪除' />
    </div>
  )
}
