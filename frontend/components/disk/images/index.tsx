import Description from './description'
import { ImageArrow } from 'public/icon/disk'

import clsx from 'clsx'
import { Cancel } from 'public/icon/disk'
import { Dispatch, SetStateAction } from 'react'
import { FileData } from 'context/type'

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

interface ImagePlaygroundProps {
  data: FileData[]
  isOpen: boolean
  currentIndex: number
  handleEscape: () => void
  setCurrentIndex: Dispatch<SetStateAction<number>>
}

export default function ImagePlayground(props: ImagePlaygroundProps) {
  const { isOpen, currentIndex, handleEscape, setCurrentIndex, data } = props
  return (
    <div
      className={clsx(
        'absolute w-screen lg:w-full h-screen bg-slate-300/40 backdrop-blur-md',
        'transition-all duration-200 ease-out',
        `${isOpen ? '' : 'w-0 h-0 hidden'}`
      )}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          handleEscape()
        }
      }}
    >
      <div
        className={clsx(
          `${isOpen ? 'h-full' : 'hidden'}`,
          'lg:flex lg:flex-col justify-around'
        )}
      >
        <div className='h-full lg:h-[70%]'>
          <div className='flex h-full flex-col lg:flex-row'>
            <div className='bg-white w-full h-full flex items-center overflow-clip'>
              <img className='w-full' src={data[currentIndex]?.url}></img>
              <span
                className='absolute top-2 right-2 opacity-60 lg:hidden'
                onClick={() => handleEscape}
              >
                <Cancel className='w-8 h-8' />
              </span>
            </div>
            <Description />
          </div>
        </div>
        <div className='hidden lg:h-1/5 lg:block lg:mt-[5%] w-full'>
          <div className='h-4/5 imageCarouselContainer'>
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
                <img className='w-full' src={e.url} draggable={false}></img>
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
    </div>
  )
}
