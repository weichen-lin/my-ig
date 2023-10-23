import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { $getRoot, $getSelection } from 'lexical'
import { useEffect } from 'react'

import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { History } from './plugins/history'

export default function Description() {
  const CustomContent = () => {
    return (
      <div className='flex flex-col h-full bg-white rounded-xl p-1'>
        <div className='w-full border-b-[1px] flex h-12 rounded-t-xl '>TEST</div>
        <ContentEditable className='z-10 w-full h-full focus:outline-none py-4 px-2 overflow-auto ' />
      </div>
    )
  }

  const CustomPlaceholder = () => {
    return <div className='absolute top-20 left-[30px] text-gray-300'>Enter some text...</div>
  }

  const lexicalConfig: InitialConfigType = {
    namespace: 'My Rich Text Editor',
    onError: e => {
      console.log('ERROR:', e)
    },
  }

  return (
    <LexicalComposer initialConfig={lexicalConfig}>
      <PlainTextPlugin
        contentEditable={<CustomContent />}
        placeholder={CustomPlaceholder}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <div style={{ margin: '20px 0px' }}>
        <History />
      </div>
    </LexicalComposer>
  )
}
