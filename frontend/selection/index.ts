import addCss from './utils/addCss'
import intersects from './utils/intersects'
import checkClickStatus from './utils/clickStatus'
import makeNum from './utils/makeNum'

import {
  selectionStore,
  selectionParams,
  selectedElement,
  StoreAction,
  TransformMethod
} from './utils/types'

export default class Selectable {
  private readonly _selectContainer!: HTMLElement
  private readonly _selectArea!: HTMLElement
  private readonly _document = window?.document
  private readonly _selectBoundary!: HTMLElement
  private readonly _dragContainer!: HTMLElement
  private readonly _canStartSelect!: boolean
  private readonly _dragEndCallback!: ((...args: any[]) => boolean) | undefined
  private _isMouseDownAtSelectBoundary: boolean = false
  private _needClearStored: boolean = false
  private _gonnaStartDrag: boolean = false
  private _cacheLastElement: string = ''
  private _isDragging: boolean = false
  private readonly _initMouseDown = new DOMRect()
  private readonly select_cb!: (...args: any[]) => any
  private readonly drag_cb!: (...args: any[]) => any
  private readonly transformFunc!: TransformMethod

  private _selectionStore: selectionStore = {
    stored: [],
    dragStored: [],
    canSelected: new Map<string, selectedElement>(),
    changed: {
      added: [], // Added elements since last selection
      removed: [] // Removed elements since last selection
    }
  }

  constructor(params: selectionParams) {
    if (!params.boundary) {
      console.log('do not have boundary yet')
      return
    }

    for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (typeof (this as any)[key] === 'function') {
        ;(this as any)[key] = (this as any)[key].bind(this)
      }
    }

    this._selectContainer = this._document.createElement('div')
    this._selectArea = this._document.createElement('div')
    this._selectArea.classList.add(params.selectAreaClassName)
    this._selectContainer.appendChild(this._selectArea)
    this._selectBoundary = params.boundary
    this._canStartSelect = params.canStartSelect
    this._dragContainer = this._document.createElement('div')
    this._dragContainer.id = 'dragContainer'
    this.select_cb = params.select_cb
    this.drag_cb = params.drag_cb
    this.transformFunc = params.transformFunc
    this._dragEndCallback = params.dragEndCallback

    // stying area
    addCss(this._selectContainer, {
      overflow: 'hidden',
      position: 'fixed',
      transform: 'translate3d(0, 0, 0)', // https://stackoverflow.com/a/38268846
      pointerEvents: 'none',
      zIndex: '1',
      padding: 0,
      margin: 0
    })

    addCss(this._selectArea, {
      willChange: 'top, left, bottom, right, width, height',
      top: 0,
      left: 0,
      position: 'absolute',
      width: 0,
      height: 0,
      display: 'none'
    })

    addCss(this._dragContainer, {
      position: 'fixed',
      transform: 'translate3d(0, 0, 0)', // https://stackoverflow.com/a/38268846
      pointerEvents: 'none',
      zIndex: '10',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0
    })

    this._document.body.appendChild(this._selectContainer)
    this._document.body.appendChild(this._dragContainer)

    this._document.addEventListener('mousedown', this.onMouseDown)
  }

  onMouseDown = (evt: MouseEvent) => {
    if (!this._canStartSelect) {
      console.log('can"t start select now')
      return
    }
    this._document.addEventListener('mouseup', this.onMouseUp)
    const { clientX, clientY } = evt
    const { scrollTop, scrollLeft } = this._selectBoundary

    this._initMouseDown.x = clientX + scrollLeft
    this._initMouseDown.y = clientY + scrollTop

    this._document.querySelectorAll('.selectable').forEach((e) => {
      const { x, y } = e.getBoundingClientRect()

      const key = e.getAttribute('data-key')
      if (!key) return
      this._selectionStore.canSelected.set(key, {
        element: e,
        memorizePosition: { x, y }
      })
    })

    const { isCtrlKey, isClickOnSelectable, onClickElement } = checkClickStatus(
      evt,
      this._selectionStore.canSelected
    )

    if (!onClickElement) {
      this._needClearStored = true
      const { x, y, right, bottom } =
        this._selectBoundary.getBoundingClientRect()
      if (clientX - x > 0 && clientY - y > 0) {
        this._isMouseDownAtSelectBoundary = true
        addCss(this._selectContainer, {
          top: y,
          left: x,
          width: right - x,
          height: bottom - y
        })
      }
      this._document.addEventListener('mousemove', this.onMouseMove)
      return
    }

    if (isCtrlKey && isClickOnSelectable) {
      this.storeManipulate(onClickElement, (e: string) => {
        return this._selectionStore.stored.includes(e)
          ? StoreAction.Delete
          : StoreAction.Add
      })
    } else if (!isCtrlKey && isClickOnSelectable) {
      const isStoredAlready =
        this._selectionStore.stored.includes(onClickElement)

      if (!isStoredAlready) {
        const currentElement = Array.from(this._selectionStore.stored)

        this.storeManipulate(currentElement, (e: string) => {
          return this._selectionStore.stored.includes(e)
            ? StoreAction.Delete
            : StoreAction.Add
        })
        this.storeManipulate(onClickElement, (e: string) => {
          return this._selectionStore.stored.includes(e)
            ? StoreAction.Delete
            : StoreAction.Add
        })
        return
      }

      this._cacheLastElement = onClickElement
      this._gonnaStartDrag = true
      this._selectionStore.stored.forEach((key) => {
        const ele = this._selectionStore.canSelected.get(key)
        if (!ele) return
        const { x, y, right, bottom } = ele.element.getBoundingClientRect()

        const cloned = this.transformFunc.transform.func(
          ele.element.cloneNode(true) as HTMLElement
        )

        addCss(cloned as HTMLElement, {
          position: 'absolute',
          top: y - this._initMouseDown.y,
          left: x - this._initMouseDown.x,
          margin: 0,
          opacity: '0%',
          willChange: 'top left width height'
        })
        addCss(this._dragContainer as HTMLElement, {
          position: 'fixed',
          top: this._initMouseDown.y,
          left: this._initMouseDown.x,
          width: right - x,
          height: bottom - y,
          margin: 0,
          opacity: '100%',
          willChange: 'top left width height'
        })

        this._dragContainer.appendChild(cloned)
      })
      this._document.addEventListener('mousemove', this.onDelayMove)
    }
  }

  onMouseUp = () => {
    addCss(this._selectArea, {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      display: 'none'
    })

    if (this._needClearStored) {
      this._selectionStore.stored.length = 0
      this.select_cb(this._selectionStore)
    }

    if (this._cacheLastElement !== '') {
      this.storeManipulate(this._cacheLastElement, () => StoreAction.Delete)
    }

    this.drag_cb({
      stored: [],
      changed: { added: [], removed: [] }
    })

    this._needClearStored = false
    this._cacheLastElement = ''

    this._gonnaStartDrag = false

    if (this._isDragging) {
      if (typeof this._dragEndCallback === 'function') {
        this._dragEndCallback()
      }

      const dragCallbackChecker = this._dragEndCallback ? true : true

      this.OnDragEnd(dragCallbackChecker)
    }

    setTimeout(
      () => {
        this._dragContainer.replaceChildren()
      },
      this._isDragging ? 0 : 0
    )

    this._isMouseDownAtSelectBoundary = false
    this._isDragging = false
    this._gonnaStartDrag = false
    this._selectionStore.canSelected.clear()
    this._document.removeEventListener('mousemove', this.onDragMovetoCursor)
    this._document.removeEventListener('mousemove', this.onDelayMove)
    this._document.removeEventListener('mousemove', this.onMouseMove)
    this._document.removeEventListener('mouseup', this.onMouseUp)
  }

  onMouseMove = (evt: MouseEvent) => {
    this._needClearStored = false

    if (this._isMouseDownAtSelectBoundary) {
      const { clientX, clientY } = evt

      // x, y 已經是加上 scroll的長度了
      const { x, y } = this._initMouseDown

      const { x: boundary_x, y: boundary_y } =
        this._selectBoundary.getBoundingClientRect()

      const { scrollLeft, scrollTop } = this._selectBoundary
      const currentX = clientX + scrollLeft
      const currentY = clientY + scrollTop

      addCss(this._selectArea, {
        width: currentX >= x ? currentX - x : x - currentX,
        height: currentY >= y ? currentY - y : y - currentY,
        top: currentY >= y ? y - boundary_y - scrollTop : clientY - boundary_y,
        left:
          currentX >= x ? x - boundary_x - scrollLeft : clientX - boundary_x,
        display: 'block'
      })

      const elements = Array.from(this._selectionStore.canSelected.keys())

      this.storeManipulate(elements, (e: string) => {
        const ele = this._selectionStore.canSelected.get(e)?.element
        if (!ele) return StoreAction.Pass
        if (intersects(this._selectArea, ele)) {
          if (this._selectionStore.stored.includes(e)) {
            return StoreAction.Pass
          } else {
            return StoreAction.Add
          }
        } else {
          if (this._selectionStore.stored.includes(e)) {
            return StoreAction.Delete
          } else {
            return StoreAction.Pass
          }
        }
      })
    }

    if (this._gonnaStartDrag) {
      this._document.removeEventListener('mousemove', this.onMouseMove)
      this._document.addEventListener('mousemove', this.onDelayMove)
    }
  }

  onDelayMove = () => {
    this._cacheLastElement = ''
    this.drag_cb(this._selectionStore)

    const targets = this._document.querySelector('#dragContainer')?.children
    if (targets?.length) {
      Array.from(targets).forEach((ele, index) => {
        if (ele.id !== 'nums_of_element') {
          addCss(ele as HTMLElement, {
            ...this.transformFunc.transform.css,
            top: 0,
            left: 0,
            opacity: '100%',
            zIndex: 9 - index,
            transitionDuration: '0.3s',
            transitionProperty: 'width height opacity top left',
            transform: `translate(${index}px, ${index}px)`
          })
        }
      })
    }

    if (this._gonnaStartDrag) {
      const numElement = makeNum(
        this._selectionStore.stored.length.toString(),
        {
          x: this.transformFunc.iconPositionX - 12,
          y: -12
        }
      )

      setTimeout(() => {
        addCss(numElement, { opacity: '100%' })
      }, 300)

      this._dragContainer.appendChild(numElement)
    }
    this._isDragging = true
    this._document.removeEventListener('mousemove', this.onDelayMove)
    this._document.addEventListener('mousemove', this.onDragMovetoCursor)
  }

  onDragMovetoCursor = (evt: MouseEvent) => {
    const { pageX, pageY } = evt

    addCss(this._dragContainer as HTMLElement, {
      top: pageY,
      left: pageX,
      margin: 0,
      transitionDuration: '0s'
    })
  }

  OnDragEnd = (revert: boolean) => {
    if (!revert) {
      const { x, y } = this._dragContainer.getBoundingClientRect()

      const targets = this._document.querySelector('#dragContainer')?.children

      if (targets?.length) {
        Array.from(targets).forEach((ele) => {
          if (ele.id !== 'nums_of_element') {
            const key = ele.getAttribute('data-key')
            if (!key) return
            const memory =
              this._selectionStore.canSelected.get(key)?.memorizePosition

            addCss(this.transformFunc.revert.func(ele) as HTMLElement, {
              ...this.transformFunc.revert.css,
              position: 'absolute',
              top: (memory?.y ?? 0) - y,
              left: (memory?.x ?? 0) - x,
              opacity: '90%',
              margin: 0,
              transitionDuration: '0.3s',
              transitionProperty: 'width height opacity top left'
            })
          } else {
            ele.remove()
          }
        })
      }
    } else {
      return
    }
  }

  storeManipulate = (
    e: string | string[],
    checkerFunc: (e: string) => number
  ) => {
    const elements = Array.isArray(e) ? e : [e]
    for (const e of elements) {
      const checker = checkerFunc(e)

      switch (checker) {
        case StoreAction.Pass:
          break
        case StoreAction.Add:
          this._selectionStore.changed.added.push(e)
          this._selectionStore.stored.push(e)
          break
        case StoreAction.Delete:
          const currentIndex = this._selectionStore.stored.indexOf(e)
          this._selectionStore.stored.splice(currentIndex, 1)
          this._selectionStore.changed.removed.push(e)
          break
        default:
          break
      }
    }

    this.select_cb(this._selectionStore)

    this._selectionStore.changed.added.length = 0
    this._selectionStore.changed.removed.length = 0
  }

  destroy = () => {
    this._document.removeEventListener('mousedown', this.onMouseDown)
    this._document.removeEventListener('mousemove', this.onDelayMove)
    this._document.removeEventListener('mousemove', this.onMouseMove)
    this._document.removeEventListener('mousemove', this.onDragMovetoCursor)
    this._document.removeEventListener('mouseup', this.onMouseUp)
    this._selectContainer.remove()
    this._dragContainer.remove()
  }
}
