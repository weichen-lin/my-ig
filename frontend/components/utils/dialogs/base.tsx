import { forwardRef, useState, ChangeEvent } from 'react'
import { Icon } from '@iconify/react'
import clsx from 'clsx'

interface BaseDialogProps {
  title: string
  submit: string
  initValue: string
  disabled: boolean
  onClick: (inputValue: string) => void
  error: string | undefined
  close: () => void
}

export const BaseDialog = forwardRef<HTMLInputElement, BaseDialogProps>((props, ref) => {
  const { title, submit, initValue, disabled, onClick, error, close } = props

  const [inputValue, setInputValue] = useState(initValue)

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const Error = ({ message }: { message: string }) => {
    return (
      <div className='rounded-md text-red-500 w-full text-right pr-4 flex justify-end items-center gap-x-2'>
        <Icon icon='material-symbols-light:error-outline' className='w-6 h-6' />
        {message}
      </div>
    )
  }

  return (
    <div className='rounded-lg bg-white drop-shadow-lg flex flex-col p-4 gap-y-4 w-full'>
      <p className='text-lg text-gray-500 select-none'>{title}</p>
      <input
        className={clsx(
          'p-2 border-2 focus:border-blue-300 outline-none',
          'rounded-md text-black text-base select-all',
        )}
        ref={ref}
        disabled={disabled}
        value={inputValue}
        onChange={handleInputValue}
      />
      <div className='flex justify-end gap-x-2'>
        <button className='px-4 py-1 hover:bg-gray-100 rounded-lg' onClick={close} disabled={disabled}>
          取消
        </button>
        <button
          className='px-4 py-1 hover:bg-gray-100 rounded-lg'
          disabled={disabled}
          onClick={() => {
            onClick(inputValue)
          }}
        >
          {disabled ? <Icon icon='mdi-light:loading' className='animate-spin w-5 h-5 mx-1' /> : submit}
        </button>
      </div>
      {error && <Error message={error} />}
    </div>
  )
})

BaseDialog.displayName = 'BaseDialog'
