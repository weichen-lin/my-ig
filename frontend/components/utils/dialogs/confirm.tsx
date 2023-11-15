import { Icon } from '@iconify/react'

interface ConfirmDialogProps {
  submit: string
  disabled: boolean
  message: string
  onClick: () => void
  error: string | undefined
  close: () => void
}

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { submit, disabled, message, onClick, error, close } = props

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
      <div>{message}</div>
      <div className='flex justify-end gap-x-2'>
        <button className='px-4 py-1 hover:bg-gray-100 rounded-lg' onClick={close} disabled={disabled}>
          取消
        </button>
        <button className='px-4 py-1 hover:bg-gray-100 rounded-lg' disabled={disabled} onClick={() => onClick()}>
          {disabled ? <Icon icon='mdi-light:loading' className='animate-spin w-5 h-5 mx-1' /> : submit}
        </button>
      </div>
      {error && <Error message={error} />}
    </div>
  )
}

ConfirmDialog.displayName = 'ConfirmDialog'
