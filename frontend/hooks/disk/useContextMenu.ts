import { ContextMenuState, SelectedState } from 'store'
import { useRecoilState } from 'recoil'

export default function useContextMenu() {
  const [selected, setSelected] = useRecoilState(SelectedState)
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
    if (!isSelected) {
      setSelected(prev => ({ ...prev, [type]: [...prev[type], id] }))
    }
  }

  return { menu, close, open, select }
}
