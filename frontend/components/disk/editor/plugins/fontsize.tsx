import DropDownList from './dropdown'
import { useState, useCallback } from 'react'

import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $setBlocksType,
} from '@lexical/selection'

import {
  $getSelection,
  DEPRECATED_$isGridSelection,
  $isRangeSelection,
  $createParagraphNode,
  $isRootOrShadowRoot,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from 'lexical'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

const FontSizeOptions = [
  { name: '10px' },
  { name: '11px' },
  { name: '12px' },
  { name: '13px' },
  { name: '14px' },
  { name: '15px' },
  { name: '16px' },
  { name: '17px' },
  { name: '18px' },
  { name: '19px' },
  { name: '20px' },
]

interface FontSizeProps {
  size: string
  onChange: (size: string) => void
}

export default function FontSize(props: FontSizeProps) {
  const { size, onChange } = props
  const [editor] = useLexicalComposerContext()

  const handleSelect = (option: string) => {
    onChange(option)
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {
          'font-size': option,
        })
      }
    })
  }

  const current = FontSizeOptions.find(item => item.name === size) as { name: string }

  return <DropDownList name={current.name} onSelect={handleSelect} options={FontSizeOptions} />
}
