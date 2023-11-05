import { UNDO_COMMAND, REDO_COMMAND, CAN_REDO_COMMAND, COMMAND_PRIORITY_CRITICAL, CAN_UNDO_COMMAND } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Icon } from '@iconify/react'

import { useEffect, useState } from 'react'

const History = () => {
  const [editor] = useLexicalComposerContext()
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  useEffect(() => {
    editor.registerCommand(
      CAN_REDO_COMMAND,
      payload => {
        setCanRedo(payload)
        return payload
      },
      COMMAND_PRIORITY_CRITICAL,
    )
    editor.registerCommand(
      CAN_UNDO_COMMAND,
      payload => {
        setCanUndo(payload)
        return payload
      },
      COMMAND_PRIORITY_CRITICAL,
    )
  }, [editor])

  return (
    <div className='flex gap-x-1 px-1 items-center'>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
        className='disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer hover:bg-slate-300/40 rounded-md'
      >
        <Icon className='w-8 h-8' color='#929292' icon='ei:undo' />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined)
        }}
        className='disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer hover:bg-slate-300/40 rounded-md'
      >
        <Icon className='w-8 h-8' color='#929292' icon='ei:redo' />
      </button>
    </div>
  )
}

export default History
