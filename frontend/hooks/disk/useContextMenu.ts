import { ContextMenuState, SelectedState } from 'store'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

export default function useContextMenu() {
  const selected = useRecoilValue(SelectedState)
  const setSelected = useSetRecoilState(SelectedState)

  const [menu, setMenu] = useRecoilState(ContextMenuState)

  const close = (cb?: (...args: any) => any) => {
    setMenu(prev => ({ ...prev, isOpen: false, x: 0, y: 0 }))
    cb && cb()
  }

  const open = (x: number, y: number, cb?: (...args: any) => any) => {
    setMenu(prev => ({ ...prev, isOpen: true, x, y }))
    cb && cb()
  }

  const select = (type: 'folders' | 'files', id: string) => {
    const isSelected = selected[type].includes(id)
    if (isSelected) {
      const index = selected[type].indexOf(id)
      setSelected(prev => ({
        ...prev,
        [type]: [...prev[type].slice(0, index), ...prev[type].slice(index + 1)],
      }))
    } else {
      setSelected(prev => ({ ...prev, [type]: [...prev[type], id] }))
    }
  }

  return { menu, close, open, select }
}
