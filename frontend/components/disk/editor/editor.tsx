import {
  History,
  Paragraph,
  ParagraphTypes,
  FontSize,
  FormatButton,
  LockButton,
  FloatingLinkEditorPlugin,
} from './plugins'
import { useState, useCallback, useEffect } from 'react'
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
  EditorState,
} from 'lexical'
import { $getSelectionStyleValueForProperty } from '@lexical/selection'
import { $isHeadingNode } from '@lexical/rich-text'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $isListNode, ListNode } from '@lexical/list'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'

import { $findMatchingParent, $getNearestNodeOfType, mergeRegister } from '@lexical/utils'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { getSelectedNode, sanitizeUrl } from './util'
import { debounce } from 'hooks/utils/useCheckDoubleClick'

import { updateFileDescription, useFetch } from 'api'

export default function Editor(props: { id: string }) {
  const { id } = props
  const { run } = useFetch<{ id: string; description: string }, { id: string }>(updateFileDescription)
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)

  const [blockType, setBlockType] = useState<string>('paragraph')
  const [fontSize, setFontSize] = useState<string>('15px')
  const [isBold, setIsBold] = useState<boolean>(false)
  const [isItalic, setIsItalic] = useState<boolean>(false)
  const [isUnderline, setIsUnderline] = useState<boolean>(false)
  const [isCodeBlock, setIsCodeBlock] = useState<boolean>(false)
  const [isLink, setIsLink] = useState<boolean>(false)
  const [isLock, setIsLock] = useState<boolean>(!editor.isEditable())

  const handleIsLink = (isLink: boolean) => {
    setIsLink(isLink)
  }

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
      const elementDOM = activeEditor.getElementByKey(elementKey)

      // Update text format
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      setIsCodeBlock(selection.hasFormat('code'))

      // Update links
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      setIsLink($isLinkNode(parent) || $isLinkNode(node))

      if (elementDOM !== null) {
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
    }
  }, [activeEditor])

  const onChange = useCallback(
    debounce((editorState: EditorState) => {
      const updateString = JSON.stringify(editorState)
      run({ id, description: updateString })
    }, 3000),
    [activeEditor],
  )

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          $updateToolbar()
          setActiveEditor(newEditor)
          return false
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerEditableListener(editable => {
        setIsLock(!editable)
      }),
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
      <div className='flex flex-1 justify-between'>
        <div className='flex items-center gap-x-1'>
          <FormatButton
            icon='healthicons:b'
            onClick={() => {
              handleTextFormat('bold')
              setIsBold(prev => !prev)
            }}
            isactive={isBold}
          />
          <FormatButton
            icon='ri:italic'
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
            }}
            isactive={isLink}
          />
        </div>
        <LockButton
          isLock={isLock}
          onClick={() => {
            editor.setEditable(!editor.isEditable())
          }}
        />
      </div>
      <FloatingLinkEditorPlugin isLinkEditor={isLink} handleIsLinkEditor={handleIsLink} />
      <OnChangePlugin onChange={onChange} />
    </div>
  )
}

const Divider = () => {
  return <div className='w-[1px] h-6 bg-gray-200 mx-1'></div>
}
