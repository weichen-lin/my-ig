import { useState, useRef, useEffect } from 'react'
import { useClickOutside } from 'hooks/utils'
import clsx from 'clsx'
import { Icon } from '@iconify/react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

interface Option {
  icon?: string
  name: string
}

interface DropDownListProps extends Option {
  onSelect: (option: string) => void
}

export default function DropDownList(props: DropDownListProps & { options: Option[] }) {
  const { icon, name, options, onSelect } = props

  const [editor] = useLexicalComposerContext()

  const ref = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  const handelClose = () => {
    setOpen(false)
  }

  useClickOutside(ref, handelClose)

  return (
    <button
      className={clsx(
        'relative flex items-center h-8',
        'disabled:cursor-not-allowed disabled:opacity-30 gap-x-1',
        'cursor-pointer hover:bg-slate-300/40 rounded-md px-1',
      )}
      ref={ref}
      onClick={() => setOpen(prev => !prev)}
      disabled={!editor.isEditable()}
    >
      {icon && <Icon className='w-5 h-5 mx-1' color='#929292' icon={icon} />}
      {name && <span className={clsx('text-sm', !icon && 'ml-1')}>{name}</span>}
      <Icon
        className={clsx('w-5 h-5 mx-1', 'transition-transform duration-200 ease-out', open && 'rotate-180')}
        color='#929292'
        icon='akar-icons:chevron-up'
      />
      {open && (
        <div
          className='absolute flex flex-col top-[110%] left-0 z-[999] bg-white drop-shadow-md rounded-md origin-top'
          style={{
            animation: 'dropdownmenu',
            animationDuration: '0.2s',
            animationFillMode: 'forwards',
            animationTimingFunction: 'ease-out',
          }}
        >
          {options?.map((item, index) => (
            <DropDownElement key={index} {...item} onSelect={onSelect} active={item.name === name} />
          ))}
        </div>
      )}
    </button>
  )
}

const DropDownElement = (props: DropDownListProps & { active?: boolean }) => {
  const { icon, name, active, onSelect } = props

  return (
    <div
      className={clsx(
        'hover:bg-gray-100 flex items-center',
        'h-8 px-2 cursor-pointer z-20 gap-x-1',
        active && 'bg-[#f5f8fd]',
        icon ? 'min-w-[160px]' : 'pr-8',
      )}
      onClick={() => onSelect && onSelect(name)}
    >
      {icon && <Icon className='w-5 h-5 mx-1' color='#929292' icon={icon} />}
      {name && <span className='text-sm'>{name}</span>}
    </div>
  )
}
