import { Cancel, AddLabel, Edit } from 'public/icon/disk'
import { useState } from 'react'
import clsx from 'clsx'
import TextArea from 'components/disk/images/textArea'
import TagArea from 'components/disk/images/tagArea'
import { FileData } from 'context/type'
import { ImageDisplayProps } from 'hooks/disk'

const color_table = [
  'bg-red-100',
  'bg-yellow-100',
  'bg-green-100',
  'bg-blue-100',
  'bg-indigo-100',
  'bg-fuchsia-200',
  'bg-pink-50'
]

const Label = ({ label, color }: { label: string; color: number }) => {
  const [isHover, setIshover] = useState(false)

  return (
    <li
      className={`py-1 px-2 relative rounded-lg ${
        color_table[color % 7]
      } text-sm xs:text-base`}
      onMouseEnter={() => {
        setIshover(true)
      }}
      onMouseLeave={() => {
        setIshover(false)
      }}
    >
      <div className='select-none'>{label}</div>
      <span
        className={clsx(
          'absolute opacity-0 -right-3 -top-3 transition-opacity duration-300 ease-linear peer-hover:opacity-100',
          `${isHover ? 'opacity-75' : ''}`
        )}
      >
        <Cancel className='w-6 h-6 bg-gray-300/70 rounded-full hover:cursor-pointer' />
      </span>
    </li>
  )
}

interface DescriptionProps extends Pick<ImageDisplayProps, 'tagProps'> {
  info: FileData
  isEdit: boolean
  handleEdit: () => void
  onEdit: (e: string) => void
  text: string
}

export default function Description(props: DescriptionProps) {
  const { tags } = props.info
  const { isEdit, handleEdit, onEdit, text, tagProps } = props
  return (
    <div
      className={clsx('bg-gray-100 w-full h-full p-3 overflow-y-auto flex-col')}
    >
      <ul className='flex p-3 flex-wrap gap-x-1 gap-y-2'>
        {Array.from(tags || []).map((e, index) => (
          <Label label={e} color={index % 7} key={`label_${index}`} />
        ))}
      </ul>
      <div className='flex w-full items-center'>
        <TagArea tagProps={tagProps} />
        <button
          className={clsx(
            'relative w-28 mt-1 h-8 flex rounded-lg border-2 border-gray-200 hover:bg-slate-300 active:top-[2px]',
            `${tags?.length >= 5 ? 'hidden' : ''}`
          )}
          onClick={tagProps.handleIsAddTag}
        >
          <AddLabel className='w-6 h-6 my-[2px]' />
          <span className='mt-[2px] pr-2 pl-1'>增加標籤</span>
        </button>
      </div>
      <div className='flex-1 overflow-y-auto'>
        <TextArea
          isEdit={isEdit}
          handleEdit={handleEdit}
          text={text}
          onEdit={onEdit}
        />
      </div>
      <div className='h-10 mt-2'>
        <Edit
          className='relative h-7 m-[6px] hover:cursor-pointer active:top-[2px]'
          onClick={handleEdit}
        />
      </div>
    </div>
  )
}
