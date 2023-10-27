import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'

import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { useEffect, useState } from 'react'

import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import Nodes from './node'
import MyTheme from './theme'
import Editor from './editor'
import { validateUrl } from './util'
export default function Description() {
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
    namespace: 'Editor',
    nodes: [...Nodes],
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
      <ListPlugin />
      <CheckListPlugin />
      <HistoryPlugin />
      <LinkPlugin />
    </LexicalComposer>
  )
}
