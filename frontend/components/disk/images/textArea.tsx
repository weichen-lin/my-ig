import { ChangeEvent } from 'react'

interface TextAreaProps {
  isEdit: boolean
  handleEdit: () => void
  text: string
  onEdit: (e: string) => void
}

export default function TextArea(props: TextAreaProps) {
  const { isEdit, text, onEdit, handleEdit } = props

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    onEdit(e.target.value)

  return (
    <>
      {isEdit ? (
        <textarea
          className='w-full p-2 border-2 border-gray-200 mt-4 overflow-y-auto min-h-[64px]'
          value={text}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleEdit()
            }
          }}
        />
      ) : (
        <div className='p-2 mt-4 rounded-lg flex-1'>{text}</div>
      )}
    </>
  )
}
