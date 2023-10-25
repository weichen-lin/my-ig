import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { $getRoot, $getSelection, EditorState } from 'lexical'
import { useEffect, useState } from 'react'

import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import Nodes from './node'
import MyTheme from './theme'
import Editor from './editor'

interface OnChangePluginProps {
  onChange: (editSatate: EditorState) => void
}

function OnChangePlugin({ onChange }: OnChangePluginProps) {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState)
    })
  }, [editor, onChange])
  return null
}

export default function Description() {
  const [editorState, setEditorState] = useState('')

  function onChange(editorState: EditorState) {
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON()
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON))
  }

  const CustomContent = () => {
    return (
      <div className='flex flex-col h-full bg-white rounded-xl p-1'>
        <Editor />
        <ContentEditable className='z-10 w-full h-full focus:outline-none py-4 px-2 overflow-auto ' />
      </div>
    )
  }

  const CustomPlaceholder = () => {
    return <div className='absolute top-20 left-[30px] text-gray-300'>Enter some text...</div>
  }

  const lexicalConfig: InitialConfigType = {
    namespace: 'My Rich Text Editor',
    nodes: Nodes,
    onError: e => {
      console.log('ERROR:', e)
    },
    theme: MyTheme,
  }

  return (
    <LexicalComposer initialConfig={lexicalConfig}>
      <RichTextPlugin
        contentEditable={<CustomContent />}
        placeholder={CustomPlaceholder}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  )
}
