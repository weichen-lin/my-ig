import { useRef, DetailedHTMLProps, HTMLAttributes, MouseEventHandler } from 'react'

interface DialogProps {
  children: JSX.Element | null
  close: (...params: any) => void
}

interface ValidRefTarget {
  contains(target: EventTarget | null): any
}

type HTMLElementEvent<T extends HTMLDivElement> = Event & {
  target: T
}

const Dialog = ({ children, close }: DialogProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleClick = (e: any) => {
    if (ref?.current && !ref.current?.contains(e.target)) {
      close()
    }
  }

  return (
    <div
      className='z-20 bg-slate-700/30 w-screen h-screen absolute top-0 left-0 flex items-center'
      onClick={handleClick}
    >
      <div className='relative w-[300px] sm:w-[350px] opacity-100 m-auto '>
        <div className='popupItem' ref={ref}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Dialog
