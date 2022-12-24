import clsx from 'clsx'
import { Plus } from 'public/icon/disk'
import { useState } from 'react'
import Option from 'components/disk/operator/option'
import { AddFile, AddFolder } from 'public/icon/disk'
export default function Operator() {
  const [isOpen, setIsopen] = useState(false)
  const handleClick = () => {
    console.log('test')
    window
      .showOpenFilePicker({ multiple: true })
      .then(async ([e]) => {
        console.log(e)
        const a = await e.getFile()
        console.log(a)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <div
      className={clsx(
        'fixed bottom-0 right-[5%] w-[300px] h-[300px]',
        'lg:w-[400px] lg:h-[400px]',
        '3xl:right-[5%]'
      )}
    >
      <div
        className={clsx(
          'absolute bottom-[15%] right-[5%] w-[25%] h-[25%] cursor-pointer bg-white/40',
          'lg:right-[10%]',
          'rounded-full hover:bg-gray-300',
          'border-[1px] hover:border-gray-100',
          'transition-all duration-700 ease-in-out',
          'md:right-[10%]',
          'hover:shadow-lg hover:shadow-gray-300 hover:border-none',
          `${isOpen ? 'rotate-[360deg]' : ''}`
        )}
        onClick={() => {
          setIsopen((prev) => !prev)
        }}
      >
        <Plus className='w-1/2 h-1/2 m-[25%] opacity-70' />
      </div>
      <ul
        className={clsx(
          'absolute bottom-[19.5%] right-[35%] w-[16%] h-[16%]',
          'md:right-[40%]',
          'transition-all duration-300 ease-out',
          'opacity-0',
          `${isOpen ? 'opacity-100' : ''}`
        )}
      >
        <Option
          isOpen={isOpen}
          angle={'rotate-[15deg]'}
          icon={<AddFile className='w-1/2 h-1/2 m-[25%] -rotate-[15deg]' />}
          onClick={handleClick}
        />
        <Option
          isOpen={isOpen}
          angle={'rotate-[75deg]'}
          icon={<AddFolder className='w-1/2 h-1/2 m-[25%] -rotate-[75deg]' />}
          onClick={handleClick}
        />
      </ul>
    </div>
  )
}
