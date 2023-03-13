import { ChangeEvent } from 'react'
import { ImageDisplayProps } from 'hooks/disk'

export default function TagArea(props: Pick<ImageDisplayProps, 'tagProps'>) {
  const { tag, isAddTag, handleAddTag, onEditTag } = props.tagProps

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onEditTag(e.target.value)
  }

  return (
    <>
      {isAddTag ? (
        <input
          className='w-[230px] py-1 px-2 border-b-2 rounded-lg mt-1 border-gray-200 bg-white/40 h-full focus:outline-none mr-2'
          value={tag}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTag()
            }
          }}
          autoFocus={true}
          maxLength={20}
        />
      ) : (
        <></>
      )}
    </>
  )
}
