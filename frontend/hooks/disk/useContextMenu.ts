import { ContextMenuState } from 'store'
import { useRecoilState } from 'recoil'

export default function useContextMenu() {
  const [menu, setMenu] = useRecoilState(ContextMenuState)
  const close = (cb?: (...args: any) => any) => {
    setMenu(prev => ({ ...prev, isOpen: false, x: 0, y: 0 }))
    cb && cb()
  }

  const open = (x: number, y: number, cb?: (...args: any) => any) => {
    setMenu(prev => ({ ...prev, isOpen: true, x, y }))
    cb && cb()
  }

  return { menu, close, open }
}
