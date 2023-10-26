import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from '@lexical/code'

import { History, Paragraph, ParagraphTypes, FontSize, FormatButton, LockButton } from './plugins'
import { useState, useCallback, useEffect } from 'react'
import {
  $getSelection,
  DEPRECATED_$isGridSelection,
  $isRangeSelection,
  $createParagraphNode,
  $isRootOrShadowRoot,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  NodeKey,
  ElementFormatType,
  $isElementNode,
  TextFormatType,
} from 'lexical'
import { $setBlocksType, $patchStyleText, $getSelectionStyleValueForProperty } from '@lexical/selection'
import { $createHeadingNode, HeadingTagType, $createQuoteNode, $isHeadingNode, $isQuoteNode } from '@lexical/rich-text'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
  ListType,
} from '@lexical/list'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'

import {
  $findMatchingParent,
  $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils'

import { $isTableNode } from '@lexical/table'

import { getSelectedNode, sanitizeUrl } from './util'

export default function Editor() {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)

  const [blockType, setBlockType] = useState<string>('paragraph')
  const [fontSize, setFontSize] = useState<string>('15px')
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null)
  const [elementFormat, setElementFormat] = useState<ElementFormatType>('left')
  const [isBold, setIsBold] = useState<boolean>(false)
  const [isItalic, setIsItalic] = useState<boolean>(false)
  const [isUnderline, setIsUnderline] = useState<boolean>(false)
  const [isStrikethrough, setIsStrikethrough] = useState<boolean>(false)
  const [isCodeBlock, setIsCodeBlock] = useState<boolean>(false)
  const [isLink, setIsLink] = useState<boolean>(false)

  const handleFontSize = (option: string) => {
    setFontSize(option)
  }

  const handleTextFormat = (option: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, option)
  }

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'))
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, e => {
              const parent = e.getParent()
              return parent !== null && $isRootOrShadowRoot(parent)
            })

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow()
      }

      const elementKey = element.getKey()
      // console.log(elementKey)
      const elementDOM = activeEditor.getElementByKey(elementKey)
      // console.log(elementDOM)
      // Update text format
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      // setIsStrikethrough(selection.hasFormat('strikethrough'))
      // setIsSubscript(selection.hasFormat('subscript'))
      // setIsSuperscript(selection.hasFormat('superscript'))
      setIsCodeBlock(selection.hasFormat('code'))
      // setIsRTL($isParentElementRTL(selection))

      // Update links
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        // console.log('is link')
      } else {
        // console.log('is not link')
      }

      const tableNode = $findMatchingParent(node, $isTableNode)
      if ($isTableNode(tableNode)) {
        // console.log('table')
      } else {
        // console.log('not ta。ble')
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey)
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)
          const type = parentList ? parentList.getListType() : element.getListType()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType()
          if (ParagraphTypes.includes(type)) {
            setBlockType(type)
          }
        }
      }

      // Handle buttons
      setFontSize($getSelectionStyleValueForProperty(selection, 'font-size', '15px'))
      // setFontColor($getSelectionStyleValueForProperty(selection, 'color', '#000'))
      // setBgColor($getSelectionStyleValueForProperty(selection, 'background-color', '#fff'))
      // setFontFamily($getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'))
      setElementFormat(($isElementNode(node) ? node.getFormatType() : parent?.getFormatType()) || 'left')
    }
  }, [activeEditor])

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar()
        setActiveEditor(newEditor)
        return false
      },
      COMMAND_PRIORITY_CRITICAL,
    )
  }, [editor, $updateToolbar])

  return (
    <div className='w-full border-b-[1px] flex h-12 rounded-t-xl items-center'>
      <History />
      <Divider />
      <Paragraph type={blockType} />
      <Divider />
      <FontSize size={fontSize} onChange={handleFontSize} />
      <Divider />
      <div className='flex flex-1 gap-x-2'>
        <FormatButton
          icon='healthicons:b'
          onClick={() => {
            handleTextFormat('bold')
            setIsBold(prev => !prev)
          }}
          isactive={isBold}
        />
        <FormatButton
          icon='majesticons:italic-line'
          onClick={() => {
            handleTextFormat('italic')
            setIsItalic(prev => !prev)
          }}
          isactive={isItalic}
        />
        <FormatButton
          icon='iconoir:underline'
          onClick={() => {
            handleTextFormat('underline')
            setIsUnderline(prev => !prev)
          }}
          isactive={isUnderline}
        />
        <FormatButton
          icon='material-symbols:code'
          onClick={() => {
            handleTextFormat('code')
            setIsCodeBlock(prev => !prev)
          }}
          isactive={isCodeBlock}
        />
        <FormatButton
          icon='material-symbols:link'
          onClick={() => {
            insertLink()
            setIsLink(true)
          }}
          isactive={isLink}
        />
        <LockButton isLock={true} onClick={() => {}} />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className='w-[1px] h-6 bg-gray-200 mx-2'></div>
}
