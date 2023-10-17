import { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import { Icon } from '@iconify/react'
import { HintsMap } from 'hooks/disk'
export interface CheckmarkTheme {
  primary?: string
  secondary?: string
}

export type Action = 'success' | 'failed' | 'progressing'

interface IconType {
  name: string
  fill: string
  border: string
}

const statusIconMap: Record<Action, IconType> = {
  success: {
    name: 'ic:baseline-check-circle',
    fill: '#4ADE80',
    border: 'border-green-400',
  },
  failed: {
    name: 'ic:baseline-error-outline',
    fill: '#F87171',
    border: 'border-red-400',
  },
  progressing: {
    name: 'eos-icons:loading',
    fill: '#9CA3AF',
    border: 'border-gray-300',
  },
}

interface HintProps {
  id: string
  message: string
  status: Action
  isPromise?: boolean
  createAt: Date
}

export const Hinter = (props: HintProps) => {
  const { id, message, status, isPromise, createAt } = props
  const [hintState, setHintState] = useState(true)

  const [mouseIn, setMouseIn] = useState(false)
  const [now, setNow] = useState(performance.now())

  useEffect(() => {
    HintsMap.set(
      id,
      isPromise
        ? null
        : setTimeout(() => {
            setHintState(false)
          }, 4000),
    )
  }, [])

  useEffect(() => {
    const timeoutId = HintsMap.get(id)
    if (timeoutId) {
      HintsMap.set(id, null)
      clearTimeout(timeoutId)
    }
  }, [mouseIn])

  return (
    <li
      className={clsx(
        'w-[250px] shadow-xl h-12 flex gap-x-2 p-4 items-center',
        'border-2 rounded-lg order-last bg-white hover:cursor-pointer',
        'transition-all duration-150 ease-in-out',
        statusIconMap[status].border,
      )}
      style={{
        animation: hintState ? 'enterAnimation 0.5s forwards ease-in-out' : 'leaveAnimation 0.5s forwards ease-in-out',
      }}
      onMouseEnter={() => {
        setMouseIn(prev => !prev)
      }}
      onMouseLeave={() => {
        setMouseIn(prev => !prev)
      }}
    >
      <Icon icon={statusIconMap[status].name} color={statusIconMap[status].fill} className='w-5 h-5' />
      <span className='font-bold'>{message}</span>
    </li>
  )
}
