import { useRef, MouseEvent } from 'react'

interface DialogProps {
  component: JSX.Element | null
  close: (...params: any) => void
}

const Dialog = ({ component, close }: DialogProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (e?.target instanceof HTMLElement && ref?.current && !ref.current?.contains(e.target)) {
      close()
    }
  }

  return (
    <div
      className='z-20 bg-slate-700/30 w-screen h-screen absolute top-0 left-0 flex items-center'
      onClick={handleClick}
    >
      <div className='relative w-[300px] xss:w-[280px] sm:w-[350px] opacity-100 m-auto '>
        <div className='popupItem' ref={ref}>
          {component}
        </div>
      </div>
    </div>
  )
}

export default Dialog
