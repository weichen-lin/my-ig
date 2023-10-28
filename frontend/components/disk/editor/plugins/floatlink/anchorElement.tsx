import { useEffect, useRef, useState, ChangeEvent } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@iconify/react'
import { sanitizeUrl } from './util'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $isRangeSelection, $isElementNode, $isRootOrShadowRoot, $getSelection } from 'lexical'
import { getSelectedNode } from './util'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import clsx from 'clsx'

export default function AnchorElement() {
  const [editor] = useLexicalComposerContext()
  const [linkUrl, setLinkUrl] = useState('https://')

  const ref = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const openLink = () => {
    try {
      window?.open(sanitizeUrl(linkUrl))
    } catch {
      window?.open('about:blank')
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkUrl(e?.target?.value || '')
  }

  const domRect = window.getSelection()?.focusNode?.parentElement?.getBoundingClientRect()

  return domRect
    ? createPortal(
        <div
          className={clsx(
            'bg-white z-[999] drop-shadow-lg p-2 px-4 gap-x-2 rounded-md w-[375px]',
            'fixed flex items-center',
          )}
          style={{ top: domRect.top + window.scrollY + 20, left: domRect.left - 10 }}
        >
          {isEditing ? (
            <>
              <input
                className='outline-none focus:outline-none p-1 px-3 flex-1 bg-slate-100 rounded-md'
                ref={ref}
                defaultValue={linkUrl}
                onChange={onChange}
              />
              <Icon
                icon='ri:check-fill'
                className='w-8 h-8 rounded-md hover:bg-slate-300/40 p-1 hover:cursor-pointer'
                color='#929292'
                onClick={() => {
                  const url = sanitizeUrl(linkUrl)
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, url)
                  setLinkUrl(url)
                  setIsEditing(false)
                }}
              />
              <Icon
                icon='iconoir:cancel'
                className='w-8 h-8 rounded-md hover:bg-slate-300/40 p-1 hover:cursor-pointer'
                color='#929292'
                onClick={() => setIsEditing(false)}
              />
            </>
          ) : (
            <>
              <a
                className='text-blue-500 underline hover:cursor-pointer hover:opacity-70 flex-1 p-1'
                onClick={() => openLink()}
              >
                {linkUrl}
              </a>
              <Icon
                icon='ic:outline-mode-edit-outline'
                className='w-8 h-8 rounded-md hover:bg-slate-300/40 p-1 hover:cursor-pointer'
                color='#929292'
                onClick={() => setIsEditing(true)}
              />
              <Icon
                icon='ic:outline-delete'
                className='w-8 h-8 rounded-md hover:bg-slate-300/40 p-1 hover:cursor-pointer'
                color='#929292'
                onClick={() => editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)}
              />
            </>
          )}
        </div>,
        document.body,
      )
    : null
}
