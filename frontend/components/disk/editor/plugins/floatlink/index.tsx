import { $isAutoLinkNode, $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $findMatchingParent, mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  GridSelection,
  KEY_ESCAPE_COMMAND,
  LexicalEditor,
  NodeSelection,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { Dispatch, useCallback, useEffect, useRef, useState } from 'react'
import { getSelectedNode } from './util'
import { setFloatingElemPositionForLinkEditor } from './util'

import AnchorElement from './anchorElement'

interface FloatingLinkEditorPluginProps {
  isLinkEditor: boolean
  handleIsLinkEditor: (isLink: boolean) => void
}

export default function FloatingLinkEditorPlugin({
  isLinkEditor,
  handleIsLinkEditor,
}: FloatingLinkEditorPluginProps): JSX.Element | null {
  const [editor] = useLexicalComposerContext()
  const [needEditLink, setNeedEditLink] = useState(false)
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)

  useEffect(() => {
    function updateToolbar() {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const node = getSelectedNode(selection)
        const linkParent = $findMatchingParent(node, $isLinkNode)
        const autoLinkParent = $findMatchingParent(node, $isAutoLinkNode)
        // We don't want this menu to open for auto links.
        const haveContent = node.__size !== 0
        handleIsLinkEditor(linkParent !== null && autoLinkParent === null && haveContent)
        if (haveContent) {
          const domRect = window.getSelection()?.focusNode?.parentElement?.getBoundingClientRect()
          setPosition(domRect ? { top: domRect.top, left: domRect.left } : null)
          setNeedEditLink(linkParent !== null && autoLinkParent === null)
        }
      }
    }
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        _payload => {
          updateToolbar()
          return false
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand(
        CLICK_COMMAND,
        payload => {
          const selection = $getSelection()
          if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection)
            const linkNode = $findMatchingParent(node, $isLinkNode)
            if ($isLinkNode(linkNode) && (payload.metaKey || payload.ctrlKey) && editor.isEditable()) {
              window.open(linkNode.getURL(), '_blank')
              return true
            }
          }
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
    )
  }, [editor])

  return needEditLink ? <AnchorElement position={position} /> : null
}
