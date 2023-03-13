import { ChangeEvent } from 'react'

interface TextAreaProps {
  isEdit: boolean
  handleEdit: () => void
  text: string
  onEdit: (e: string) => void
}

export default function TextArea(props: TextAreaProps) {
  const { isEdit, text, onEdit, handleEdit } = props

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onEdit(e.target.value)
  }

  return (
    <>
      {isEdit ? (
        <textarea
          className='w-full p-2 border-2 border-gray-200 mt-4 overflow-y-auto h-[90%]'
          value={text}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              onEdit(text)
            }
            if (e.key === 'Enter' && !e.shiftKey) {
              handleEdit()
            }
          }}
        />
      ) : (
        <div className='p-2 mt-4 rounded-lg whitespace-pre-line overflow-y-auto h-[90%]'>
          {text}
        </div>
      )}
    </>
  )
}
