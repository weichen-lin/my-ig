import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from '@lexical/code'

import { History, Paragraph, ParagraphTypes, FontSize } from './plugins'
import { useState, useCallback, useEffect } from 'react'
import {
  $getSelection,
  DEPRECATED_$isGridSelection,
  $isRangeSelection,
  $createParagraphNode,
  $isRootOrShadowRoot,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  NodeKey,
  ElementFormatType,
  $isElementNode,
} from 'lexical'
import { $setBlocksType } from '@lexical/selection'
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

import { getSelectedNode } from './util'

export default function Editor() {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)

  const [blockType, setBlockType] = useState<string>('paragraph')
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null)
  const [codeLanguage, setCodeLanguage] = useState<string>('')
  const [elementFormat, setElementFormat] = useState<ElementFormatType>('left')

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
      console.log(elementKey)
      const elementDOM = activeEditor.getElementByKey(elementKey)
      console.log(elementDOM)
      // Update text format
      // setIsBold(selection.hasFormat('bold'))
      // setIsItalic(selection.hasFormat('italic'))
      // setIsUnderline(selection.hasFormat('underline'))
      // setIsStrikethrough(selection.hasFormat('strikethrough'))
      // setIsSubscript(selection.hasFormat('subscript'))
      // setIsSuperscript(selection.hasFormat('superscript'))
      // setIsCode(selection.hasFormat('code'))
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
          console.log({ type, isIn: type in ParagraphTypes })
          if (ParagraphTypes.includes(type)) {
            setBlockType(type)
          }
          if ($isCodeNode(element)) {
            const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP
            setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : '')
            return
          }
        }
      }
      // Handle buttons
      // setFontSize($getSelectionStyleValueForProperty(selection, 'font-size', '15px'))
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
      <Paragraph type={blockType} />
      <FontSize />
    </div>
  )
}
