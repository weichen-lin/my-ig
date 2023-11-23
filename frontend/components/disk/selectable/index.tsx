import { useEffect, useMemo, useRef } from 'react'
import { useDrag } from 'hooks/disk'
import Selectable, { DragStatus } from 'gdrive-select-and-drag'

export default function SelectArea(props: { children: JSX.Element }) {
  const { children } = props
  const { startDrag, endDrag, selectDisk } = useDrag()
  const ref = useRef<HTMLDivElement>(null)

  const selectable = useMemo(() => {
    return new Selectable({
      canStartSelect: true,
      selectAreaClassName: 'selection-area',
      selectablePrefix: 'selectable',
      select_cb: selected => {
        selectDisk(selected)
      },
    })
  }, [])

  const selectRef = useRef(selectable).current

  useEffect(() => {
    if (ref?.current && selectable.selectBoundary !== ref?.current) {
      selectRef.init(ref?.current)
    }

    selectable.drag_cb = (stored, status, dragOnEle) => {
      if (status === DragStatus.Start) {
        startDrag()
      }

      if (status === DragStatus.End) {
        endDrag({ stored, dragOnEle })
      }
    }
  }, [startDrag, endDrag, ref?.current])

  return <div ref={ref}>{children}</div>
}
