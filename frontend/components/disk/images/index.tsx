import Description from 'components/disk/editor'
import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { useRecoilValue, useRecoilState } from 'recoil'
import { fileState, OpenImageState } from 'store'
import { Loading } from 'components/utils'
import { Icon } from '@iconify/react'

import { useFetch, getFileDescription } from 'api'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

export default function ImagePlayground() {
  const [openState, setOpenState] = useRecoilState(OpenImageState)
  const [currentIndex, setCurrentIndex] = useState(openState.index)

  const { data, run, isLoading } = useFetch<string, { description: string }>(getFileDescription, {
    onSuccess: data => {
      setEditState(data.description)
    },
  })

  const [editState, setEditState] = useState<string | null>(data?.description ?? null)

  const files = useRecoilValue(fileState)
  const ref = useRef<HTMLDivElement>(null)

  const handleInfo = (add: boolean) => {
    if (isLoading) return
    setCurrentIndex((prev: number) => {
      if (prev === 0 && !add) return files.length - 1
      else if (prev === files.length - 1 && add) return 0
      else return add ? prev + 1 : prev - 1
    })
  }

  const keyEvents = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        handleInfo(false)
        break
      case 'ArrowRight':
        handleInfo(true)
        break
      case 'ArrowUp':
        handleInfo(false)
        break
      case 'ArrowDown':
        handleInfo(true)
        break
      case 'Escape':
        setOpenState(prev => ({ ...prev, isOpen: false }))
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (ref?.current) {
      ref?.current.focus()
      ref?.current.addEventListener('keydown', keyEvents)
    }
    return () => {
      ref?.current?.removeEventListener('keydown', keyEvents)
    }
  }, [])

  useEffect(() => {
    run(files[currentIndex].id)
  }, [currentIndex])

  return (
    <div
      className={clsx(
        'absolute w-screen lg:w-full h-screen bg-slate-900/40 backdrop-blur-md top-0 left-0 z-50 origin-center',
        'transition-all duration-200 ease-out',
        'lg:flex lg:flex-col justify-around gap-y-[2.5%]',
        `${true ? '' : 'w-0 h-0 hidden'}`,
      )}
      tabIndex={0}
      style={{
        animationName: 'popup',
        animationDuration: '0.2s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-out',
      }}
      ref={ref}
    >
      <div className='flex h-full lg:h-[70%] flex-col lg:flex-row w-full lg:w-[90%] xl:w-[85%] 2xl:w-[70%] mx-auto lg:mt-[1.25%] bg-white'>
        <div className='flex lg:w-1/2 items-center justify-center overflow-clip lg:rounded-l-lg w-full h-full'>
          <img
            className='m-auto h-5/6 lg:h-auto'
            src={`${baseUrl}/file/${files[currentIndex].id}`}
            alt={files[currentIndex].name}
          ></img>
        </div>
        <div className='w-full lg:w-1/2 border-l-[1px] h-full p-4 bg-[#eeeeee] relative overflow-y-auto'>
          {isLoading ? <Loading /> : <Description content={editState} id={files[currentIndex].id} />}
        </div>
      </div>
      <div className='hidden lg:h-1/5 lg:block w-full'>
        <div className='h-full imageCarouselContainer'>
          {files.map((e, index) => (
            <div
              className={clsx(
                'imageCarousel w-[15%] h-4/5 text-white absolute left-[42.5%]',
                'transition-all duration-200 ease-linear',
                `flex items-center overflow-hidden bg-slate-100`,
              )}
              style={{
                '--offset': (currentIndex - index) / 3,
                '--abs-offset': Math.abs(index - currentIndex) / 3,
                '--direction': Math.sign(currentIndex - index),
                opacity: Math.abs(index - currentIndex) >= 3 ? '0' : '1',
                display: Math.abs(index - currentIndex) > 3 ? 'none' : '',
              }}
              key={`index_${index}`}
            >
              <img
                src={`${baseUrl}/file/${e.id}`}
                draggable={false}
                className='h-full mx-auto'
                alt={files[currentIndex].name}
              ></img>
            </div>
          ))}
          {currentIndex < files.length - 1 && (
            <button
              className={clsx(
                'absolute w-16 h-16 top-6 right-[18%]',
                `rotate-90 rounded-full hover:bg-slate-100/20 hover:cursor-pointer`,
                'transition-all opacity-100 duration-300 ease-out',
                'disabled:cursor-not-allowed disabled:opacity-50',
              )}
              onClick={() => {
                handleInfo(true)
              }}
              disabled={isLoading}
            >
              <Icon icon='ep:arrow-up' className='w-12 h-12 mx-2 mb-2'></Icon>
            </button>
          )}
          {currentIndex > 0 && (
            <button
              className={clsx(
                'absolute w-16 h-16 top-6 left-[18%]',
                `-rotate-90 rounded-full hover:bg-slate-100/20 hover:cursor-pointer`,
                'transition-all opacity-100 duration-300 ease-out',
                'disabled:cursor-not-allowed disabled:opacity-50',
              )}
              onClick={() => {
                handleInfo(false)
              }}
              disabled={isLoading}
            >
              <Icon icon='ep:arrow-up' className='w-12 h-12 mx-2 mb-2'></Icon>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
