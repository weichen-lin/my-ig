import DropDownList from './dropdown'
import { useState, useCallback, useEffect } from 'react'
import {
  $getSelection,
  DEPRECATED_$isGridSelection,
  $isRangeSelection,
  $createParagraphNode,
  $isRootOrShadowRoot,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from 'lexical'
import { $setBlocksType } from '@lexical/selection'
import { $createHeadingNode, HeadingTagType, $createQuoteNode, $isHeadingNode, $isQuoteNode } from '@lexical/rich-text'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from '@lexical/code'

import {
  $findMatchingParent,
  $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils'

import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
  ListType,
} from '@lexical/list'

export enum ParagraphType {
  Paragraph = 'paragraph',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  BULLET_LIST = 'bullet',
  NUMBERED_LIST = 'number',
  CHECK_LIST = 'check',
  QUOTE = 'quote',
}

export const ParagraphTypes = ['paragraph', 'h1', 'h2', 'h3', 'bullet', 'number', 'check', 'quote']

const ParagraphOptions = [
  { icon: 'subway:paragraph', name: 'Normal', value: ParagraphType.Paragraph },
  { icon: 'material-symbols:format-h1-rounded', name: 'Heading 1', value: ParagraphType.H1 },
  { icon: 'material-symbols:format-h2-rounded', name: 'Heading 2', value: ParagraphType.H2 },
  { icon: 'material-symbols:format-h3-rounded', name: 'Heading 3', value: ParagraphType.H3 },
  { icon: 'material-symbols:list', name: 'Bullet List', value: ParagraphType.BULLET_LIST },
  { icon: 'material-symbols:format-list-numbered', name: 'Numbered List', value: ParagraphType.NUMBERED_LIST },
  { icon: 'material-symbols:check-box-outline-rounded', name: 'Check List', value: ParagraphType.CHECK_LIST },
  { icon: 'ri:chat-quote-line', name: 'Quote', value: ParagraphType.QUOTE },
]

interface ParagraphProps {
  type: string
}

export default function Paragraph(props: ParagraphProps) {
  const { type } = props

  const [editor] = useLexicalComposerContext()

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode())
      }
    })
  }

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize))
      }
    })
  }

  const formatBulletList = () => {
    if (type !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatCheckList = () => {
    if (type !== 'check') {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatNumberedList = () => {
    if (type !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatQuote = () => {
    if (type !== 'quote') {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode())
        }
      })
    }
  }

  const handleSelect = (option: string | undefined) => {
    const index = ParagraphOptions.findIndex(item => item.name === option)
    const formatType = ParagraphOptions[index].value
    switch (formatType) {
      case ParagraphType.Paragraph:
        formatParagraph()
        break
      case ParagraphType.H1:
      case ParagraphType.H2:
      case ParagraphType.H3:
        formatHeading(formatType)
        break
      case ParagraphType.BULLET_LIST:
        formatBulletList()
        break
      case ParagraphType.NUMBERED_LIST:
        formatNumberedList()
        break
      case ParagraphType.CHECK_LIST:
        formatCheckList()
        break
      case ParagraphType.QUOTE:
        formatQuote()
        break
      default:
        formatParagraph()
        break
    }
  }

  const current = ParagraphOptions.find(item => item.value === type) as { icon: string; name: string; value: string }

  return <DropDownList icon={current?.icon} name={current.name} onSelect={handleSelect} options={ParagraphOptions} />
}
