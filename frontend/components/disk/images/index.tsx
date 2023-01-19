import Description from './description'
import { ImageArrow } from 'public/icon/disk'

import { useState } from 'react'
import clsx from 'clsx'
import { DiskData } from 'hooks/disk/type'

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

interface ImagePlaygroundProps {
  data: DiskData[]
}

export default function ImagePlayground(props: ImagePlaygroundProps) {
  const { data } = props
  const [currentIndex, setCurrentIndex] = useState(4)
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className={`absolute w-full h-screen bg-slate-700/40 backdrop-blur-md ${
        isOpen ? '' : 'hidden'
      }`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setIsOpen(false)
        }
      }}
    >
      <div className='h-[70%] mt-[5%]'>
        <div className='flex h-full'>
          <div className='bg-slate-300 w-3/5 h-full flex items-center overflow-clip'>
            <img className='w-full' src={data[currentIndex].url}></img>
          </div>
          <Description />
        </div>
      </div>
      <div className='h-40 mt-4'>
        <div className='h-4/5 relative imageCarouselContainer mt-12'>
          {data.map((e, index) => (
            <div
              className={clsx(
                'imageCarousel w-[15%] h-4/5 text-white absolute left-[42.5%]',
                'transition-all duration-200 ease-linear border-2 border-gray-300',
                `flex items-center overflow-hidden bg-slate-100`
              )}
              style={{
                '--offset': (currentIndex - index) / 3,
                '--abs-offset': Math.abs(index - currentIndex) / 3,
                '--direction': Math.sign(currentIndex - index),
                opacity: Math.abs(index - currentIndex) >= 3 ? '0' : '1',
                display: Math.abs(index - currentIndex) > 3 ? 'none' : ''
              }}
              key={`index_${index}`}
            >
              <img className='w-full' src={e.url}></img>
            </div>
          ))}
          {currentIndex < data.length - 1 ? (
            <div
              className={`absolute w-16 h-16 top-6 right-[18%] rotate-90 rounded-full hover:bg-slate-100/20 hover:cursor-pointer
            transition-all opacity-100 duration-300 ease-out ${
              currentIndex > data.length - 1 ? 'none' : ''
            }`}
              onClick={() => {
                setCurrentIndex((prev) => prev + 1)
              }}
            >
              <ImageArrow />
            </div>
          ) : (
            <></>
          )}
          {currentIndex > 0 ? (
            <div
              className={`absolute w-16 h-16 top-6 left-[18%] -rotate-90 rounded-full hover:bg-slate-100/20 hover:cursor-pointer
            transition-all opacity-100 duration-300 ease-out`}
              onClick={() => {
                setCurrentIndex((prev) => prev - 1)
              }}
            >
              <ImageArrow />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
