import Description from './description'
import { ImageArrow } from 'public/icon/disk'
import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { fileState, OpenImageState } from 'store'

const _files = [
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
  { id: 'asdasd', name: 'testName', lastModifiedAt: '2021-10-10T00:00:00.000Z' },
]

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

export default function ImagePlayground() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const files = useRecoilValue(fileState)
  const ref = useRef<HTMLDivElement>(null)
  const setIsOpen = useSetRecoilState(OpenImageState)

  const handleInfo = (add: boolean) => {
    setCurrentIndex((prev: number) => (add ? prev + 1 : prev - 1) % _files.length)
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          setIsOpen(prev => !prev)
        }
      })
    }
  }, [])

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
      <div className='flex h-full lg:h-[70%] flex-col lg:flex-row w-full lg:w-[70%] mx-auto lg:mt-[1.25%]'>
        <div className='bg-white w-full h-full flex items-center justify-center overflow-clip lg:rounded-l-lg'>
          <img
            src={
              'https://media.istockphoto.com/id/481229372/zh/%E7%85%A7%E7%89%87/spiral-galaxy-illustration-of-milky-way.jpg?s=2048x2048&w=is&k=20&c=Sf4TzRnYFDxvhgr3Xqu5tOTs4lTBjk9RU7t8nW4lQPE='
            }
          ></img>
        </div>
        <Description
          // info={data[currentIndex] ?? { description: '', tags: [] }}
          isEdit={true}
          handleEdit={() => console.log('edit')}
          onEdit={(e: string) => console.log('edit')}
          text={'asdasd'}
        />
      </div>
      <div className='hidden lg:h-1/5 lg:block w-full'>
        <div className='h-full imageCarouselContainer'>
          {_files.map((e, index) => (
            <div
              className={clsx(
                'imageCarousel w-[15%] h-4/5 text-white absolute left-[42.5%]',
                'transition-all duration-200 ease-linear border-2 border-gray-300',
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
                className='w-full'
                src={
                  'https://png.pngtree.com/png-vector/20221222/ourmid/pngtree-super-cute-cartoon-vector-bear-png-image_6504049.png'
                }
                draggable={false}
              ></img>
            </div>
          ))}
          {currentIndex < _files.length - 1 ? (
            <div
              className={`absolute w-16 h-16 top-6 right-[18%] rotate-90 rounded-full hover:bg-slate-100/20 hover:cursor-pointer
            transition-all opacity-100 duration-300 ease-out ${currentIndex > _files.length - 1 ? 'none' : ''}`}
              onClick={() => {
                handleInfo(true)
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
                handleInfo(false)
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
