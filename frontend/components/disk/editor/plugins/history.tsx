import { UNDO_COMMAND, REDO_COMMAND } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Icon } from '@iconify/react'

export const History = () => {
  const [editor] = useLexicalComposerContext()
  return (
    <div className='flex gap-x-1 px-1 items-center'>
      <Icon
        className='w-8 h-8 my-1 cursor-pointer hover:bg-slate-300/40 rounded-xl'
        color='#929292'
        icon='ei:undo'
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      />
      <Icon
        className='w-8 h-8 my-1 cursor-pointer hover:bg-slate-300/40 rounded-xl'
        color='#929292'
        icon='ei:redo'
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      />
    </div>
  )
}
