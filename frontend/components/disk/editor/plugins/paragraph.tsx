import DropDownList from './dropdown'
import { useState } from 'react'
import { $getSelection, DEPRECATED_$isGridSelection, $isRangeSelection, $createParagraphNode } from 'lexical'
import { $setBlocksType } from '@lexical/selection'
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'

enum ParagraphType {
  NORMAL = 'normal',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  BULLET_LIST = 'bulletList',
  NUMBERED_LIST = 'numberedList',
  CHECK_LIST = 'checkList',
  QUOTE = 'quote',
  CODE_BLOCK = 'codeBlock',
}

const ParagraphOptions = [
  { icon: 'subway:paragraph', title: 'Normal', value: ParagraphType.NORMAL },
  { icon: 'material-symbols:format-h1-rounded', title: 'Heading 1', value: ParagraphType.H1 },
  { icon: 'material-symbols:format-h2-rounded', title: 'Heading 2', value: ParagraphType.H2 },
  { icon: 'material-symbols:format-h3-rounded', title: 'Heading 3', value: ParagraphType.H3 },
  { icon: 'material-symbols:list', title: 'Bullet List', value: ParagraphType.BULLET_LIST },
  { icon: 'material-symbols:format-list-numbered', title: 'Numbered List', value: ParagraphType.NUMBERED_LIST },
  { icon: 'material-symbols:check-box-outline-rounded', title: 'Check List', value: ParagraphType.CHECK_LIST },
  { icon: 'ri:chat-quote-line', title: 'Quote', value: ParagraphType.QUOTE },
  { icon: 'ph:code-block', title: 'Code Block', value: ParagraphType.CODE_BLOCK },
]

export default function Paragraph() {
  const [editor] = useLexicalComposerContext()
  const [blockType, setBlockType] = useState<ParagraphType>(ParagraphType.NORMAL)
  const [currentOption, setCurrentOption] = useState(ParagraphOptions[0])

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
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const handleSelect = (option: string) => {
    const index = ParagraphOptions.findIndex(item => item.title === option)
    setCurrentOption(ParagraphOptions[index])
    const formatType = ParagraphOptions[index].value
    switch (formatType) {
      case ParagraphType.NORMAL:
        formatParagraph()
        break
      case ParagraphType.H1:
      case ParagraphType.H2:
      case ParagraphType.H3:
        formatHeading(formatType)
        break
      default:
        formatParagraph()
        break
    }
  }

  return (
    <DropDownList
      icon={currentOption.icon}
      title={currentOption.title}
      onSelect={handleSelect}
      options={ParagraphOptions}
    />
  )
}
