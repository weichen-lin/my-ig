import { useRecoilState } from 'recoil'
import { DialogState } from 'store'
import { useCallback } from 'react'

export default function useDialog() {
  const [dialogState, setDialogState] = useRecoilState(DialogState)

  const close = useCallback(() => {
    setDialogState({ ...dialogState, isOpen: false })
  }, [dialogState])

  const open = (component: JSX.Element) => {
    setDialogState(prev => ({ ...prev, isOpen: true, component }))
  }

  return { dialogState, close, open }
}
