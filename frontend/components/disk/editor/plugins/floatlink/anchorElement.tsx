import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@iconify/react'
import { sanitizeUrl } from './util'

export default function AnchorElement() {
  const link = 'https://google.com'
  const ref = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const openLink = () => {
    window.open(sanitizeUrl(link))
  }

  return createPortal(
    <div className='fixed flex top-12 left-[800px] bg-white z-[999] drop-shadow-lg p-2 px-4 items-center gap-x-2 rounded-md w-[375px]'>
      {isEditing ? (
        <input className='outline-none focus:outline-none p-2 flex-1' ref={ref} defaultValue={link} />
      ) : (
        <a className='text-blue-500 underline hover:cursor-pointer hover:opacity-70 flex-1' onClick={() => openLink()}>
          {link}
        </a>
      )}
      <Icon
        icon='ic:outline-mode-edit-outline'
        className='w-8 h-8 rounded-md hover:bg-slate-300/40 p-1 hover:cursor-pointer'
        color='#929292'
      />
      <Icon
        icon='ic:outline-delete'
        className='w-8 h-8 rounded-md hover:bg-slate-300/40 p-1 hover:cursor-pointer'
        color='#929292'
      />
    </div>,
    document.body,
  )
}
