import { BlockNoteEditor, Block } from '@blocknote/core'
import '@blocknote/core/style.css'
import { BlockNoteView, useBlockNote } from '@blocknote/react'
import { debounce } from 'hooks/utils/useCheckDoubleClick'
import { updateFileDescription, useFetch } from 'api'

export default function BlockNote(props: { id: string; block: Block[] }) {
  const { id, block } = props
  const { run, isLoading } = useFetch<{ id: string; description: string }, { id: string }>(updateFileDescription)

  const editor: BlockNoteEditor = useBlockNote({
    initialContent: block,
    onEditorContentChange: debounce(() => {
      const content = editor.topLevelBlocks
      run({ id: id, description: JSON.stringify(content) })
    }, 1000),
  })

  return <BlockNoteView editor={editor} theme='light' />
}
