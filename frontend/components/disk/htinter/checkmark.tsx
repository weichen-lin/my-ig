import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import type { Hint } from 'hooks/disk'
export interface CheckmarkTheme {
  primary?: string
  secondary?: string
}

export const CheckMark = (props: Hint) => {
  const { message } = props
  const [hintState, setHintState] = useState(true)

  useEffect(() => {
    const animateId = setTimeout(() => {
      setHintState(false)
    }, 4000)

    return () => {
      clearTimeout(animateId)
    }
  }, [])

  return (
    <li
      className={clsx(
        'w-[200px] shadow-md h-12 flex gap-x-2 p-4 items-center',
        'border-2 rounded-lg border-slate-300 bg-white z-10 order-last',
        'transition-all duration-150 ease-in-out'
      )}
      style={{
        animation: hintState
          ? 'enterAnimation 0.5s forwards ease-in-out'
          : 'leaveAnimation 0.5s forwards ease-in-out',
      }}
    >
      <IoIosCheckmarkCircleOutline fill='green' className='w-6 h-6' />
      <span className='font-bold'>Success {message}</span>
    </li>
  )
}
