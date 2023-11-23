import { useRef } from 'react'
import { useDrag } from 'hooks/disk'
// import Selectable, { DragStatus } from 'selection'

export default function SelectArea() {
  const { startDrag, endDrag } = useDrag()
  const ref = useRef<HTMLDivElement>(null)
  //   const selectRef = useRef(
  //     new Selectable({
  //       canStartSelect: true,
  //       boundary: ref?.current as HTMLDivElement,
  //       selectAreaClassName: 'selection-area',
  //       selectablePrefix: 'selectable',
  //       select_cb: () => {},
  //       drag_cb: (stored, status, dragOnEle) => {
  //         if (status === DragStatus.Start) {
  //           startDrag()
  //         }

  //         if (status === DragStatus.End) {
  //           endDrag({ stored, dragOnEle })
  //         }
  //       },
  //     }),
  //   ).current

  return <div ref={ref}></div>
}
